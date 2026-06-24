import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

import { contactSchema } from "@/lib/validations/contact"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false as const, error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `ข้อความจาก ${name} (${email})`,
      text: `ชื่อ: ${name}\nอีเมล: ${email}\nข้อความ:\n${message}`,
      html: `<p><strong>ชื่อ:</strong> ${name}</p><p><strong>อีเมล:</strong> ${email}</p><p><strong>ข้อความ:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`,
    })

    return NextResponse.json({ success: true as const, data: null })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false as const, error: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    )
  }
}
