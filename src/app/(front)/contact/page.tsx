import { Mail, Phone, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ContactForm } from "./contact-form"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl font-bold md:text-4xl">ติดต่อเรา</h1>
        <p className="mt-2 text-muted-foreground">
          มีคำถามหรือข้อสงสัย? เราพร้อมช่วยเหลือคุณ
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
        <div>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">อีเมล</p>
                <p className="text-sm text-muted-foreground">
                  hello@example.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">เบอร์โทรศัพท์</p>
                <p className="text-sm text-muted-foreground">
                  +66 12-345-6789
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">เวลาทำการ</p>
                <p className="text-sm text-muted-foreground">
                  จันทร์ - ศุกร์ 09:00 - 18:00 น.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <p className="text-sm text-muted-foreground">
            ทีมงานของเราพร้อมตอบคำถามทุกข้อสงสัยเกี่ยวกับคอร์สเรียน สินค้า
            และบริการต่างๆ เราจะตอบกลับโดยเร็วที่สุดภายในเวลาทำการ
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
