import {
  Globe,
  Package,
  ShieldCheck,
  Sparkles,
  Award,
  Users,
  Target,
  ShoppingBag,
  CreditCard,
  MapPin,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Copyright } from "./copyright";

const stats = [
  { icon: Users, value: "200,000+", label: "ผู้ใช้งานที่ไว้วางใจ" },
  { icon: Package, value: "50,000+", label: "คำสั่งซื้อที่สำเร็จ" },
  { icon: Globe, value: "30+", label: "ช่องทางชำระเงิน" },
  { icon: Award, value: "99.9%", label: "Uptime การให้บริการ" },
];

const values = [
  {
    icon: ShoppingBag,
    title: "ครบจบในที่เดียว",
    description:
      "ระบบจัดการร้านค้าออนไลน์แบบครบวงจร ตั้งแต่สินค้า ตะกร้า ชำระเงิน จัดส่ง ติดตามสถานะ และรายงานยอดขาย",
  },
  {
    icon: CreditCard,
    title: "ชำระเงินปลอดภัย",
    description:
      "รองรับช่องทางชำระเงินหลากหลาย บัตรเครดิต โอนผ่านธนาคาร พร้อมเพย์ และ e-Wallet ด้วยระบบความปลอดภัยระดับสูง",
  },
  {
    icon: ShieldCheck,
    title: "มั่นใจทุกคำสั่งซื้อ",
    description:
      "ระบบยืนยันตัวตนและติดตามสถานะสินค้าแบบ Real-time รองรับการยกเลิกและคืนสินค้าภายใน 30 วัน",
  },
  {
    icon: Zap,
    title: "ส่งเร็วทั่วไทย",
    description:
      "เชื่อมต่อ API กับผู้ให้บริการจัดส่งชั้นนำ ส่งฟรีเมื่อสั่งซื้อครบ 500 บาท ติดตามพัสดุได้แบบเรียลไทม์",
  },
];

const team = [
  {
    name: "คุณสมชาย วงศ์ใหญ่",
    role: "ผู้ก่อตั้ง & CEO",
    initials: "สช",
    color: "bg-primary/10",
  },
  {
    name: "คุณมาลี แสงทอง",
    role: "ประธานเจ้าหน้าที่ฝ่ายปฏิบัติการ",
    initials: "มล",
    color: "bg-secondary/15",
  },
  {
    name: "คุณธนา ใจดี",
    role: "ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี",
    initials: "ธน",
    color: "bg-tertiary/10",
  },
  {
    name: "คุณนภา พรมณี",
    role: "ประธานเจ้าหน้าที่ฝ่ายการตลาด",
    initials: "นภ",
    color: "bg-primary/10",
  },
];

const milestones = [
  { year: "2020", title: "เริ่มต้นไอเดีย", desc: "กลุ่มเพื่อนนักพัฒนามองเห็นโอกาสในตลาดอีคอมเมิร์ซของไทยที่ยังเข้าถึงยาก" },
  { year: "2021", title: "เปิดตัวเวอร์ชันแรก", desc: "ระบบร้านค้าออนไลน์แบบง่าย รองรับ 50 ร้านค้าแรก พร้อม API เชื่อมต่อ" },
  { year: "2023", title: "เติบโตเท่าตัว", desc: "ผู้ใช้ทะลุ 50,000 ราย เปิดระบบ Marketplace เพิ่มเติม รองรับหลายภาษา" },
  { year: "2024", title: "ระบบชำระเงินครบวงจร", desc: "เชื่อมต่อธนาคารและ e-Wallet ครบทุกช่องทาง ยอดธุรกรรมทะลุ 1,000 ล้านบาท" },
  { year: "2026", title: "วันนี้", desc: "ร้านค้า 5,000+ ราย คำสั่งซื้อ 50,000+ รายการ ผู้ใช้ 200,000+ คน เติบโตต่อเนื่อง" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/60 to-background px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-primary)_0%,transparent_40%)] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--color-secondary)_0%,transparent_40%)] opacity-[0.04]" />
        <div className="mx-auto max-w-4xl text-center">
          <Badge asChild variant="outline" className="border-border mb-6">
            <Link href="#">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              เรื่องราวของเรา (About Us)
            </Link>
          </Badge>
          <h1 className="font-heading text-2xl font-bold leading-[1.15] md:text-5xl lg:text-6xl">
            แพลตฟอร์มอีคอมเมิร์ซ
            <br />
            <span className="text-primary">ที่คุณวางใจได้</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            เราคือระบบร้านค้าออนไลน์ครบวงจรที่ช่วยให้ธุรกิจของคุณเติบโต
            ตั้งแต่การจัดการสินค้า การชำระเงิน จนถึงการจัดส่ง
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="flex flex-col items-center gap-2 p-6 text-center transition-shadow hover:shadow-md"
              >
                <stat.icon className="h-7 w-7 text-primary" />
                <span className="font-heading text-2xl font-bold md:text-3xl">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground md:text-sm">
                  {stat.label}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline Section */}
      <section className="bg-muted/40 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-border mb-4">
              เส้นทางของเรา
            </Badge>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              จากจุดเริ่มต้นเล็กๆ
              <br />
              <span className="text-primary">สู่การเติบโตที่ยิ่งใหญ่</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:left-1/2" />

                  {/* Content card */}
                  <div
                    className={`ml-10 w-full md:ml-0 md:w-1/2 ${
                      i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <Card className="p-5">
                      <span className="font-heading text-lg font-bold text-primary">
                        {m.year}
                      </span>
                      <h3 className="mt-1 font-semibold">{m.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {m.desc}
                      </p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-border mb-4">
              ค่านิยมของเรา
            </Badge>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              เรายืนหยัดเพื่ออะไร
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              ทุกการตัดสินใจของเรามาจากความต้องการให้ธุรกิจออนไลน์เป็นเรื่องง่าย
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {values.map((v) => (
              <Card
                key={v.title}
                className="flex gap-4 p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/40 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="border-border mb-4">
              ทีมของเรา
            </Badge>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              ผู้คนที่อยู่เบื้องหลัง
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              ทีมงานมากประสบการณ์ที่ขับเคลื่อนแพลตฟอร์มเพื่อร้านค้าออนไลน์ทุกระดับ
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {team.map((member) => (
              <Card
                key={member.name}
                className="overflow-hidden p-0 text-center transition-shadow hover:shadow-md"
              >
                <div className={`${member.color} px-6 pt-8 pb-6`}>
                  <div className="mx-auto flex h-[88px] w-[88px] items-center justify-center rounded-full border-2 border-background bg-background text-lg font-bold text-primary shadow-sm">
                    {member.initials}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm">{member.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 md:p-12">
            <Target className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              พร้อมเริ่มต้นร้านค้าออนไลน์ของคุณ?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              สมัครฟรี! ไม่มีค่าใช้จ่ายแอบแฝง เริ่มขายได้ทันที
              พร้อมทีมสนับสนุนที่พร้อมช่วยเหลือคุณ
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/product">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  เริ่มต้นใช้งาน
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  <MapPin className="mr-2 h-5 w-5" />
                  ติดต่อทีมขาย
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Footer note */}
      <p className="px-4 py-8 text-center text-xs text-muted-foreground">
        &copy;{" "}
        <Suspense fallback={null}>
          <Copyright text="ShopHub — แพลตฟอร์มอีคอมเมิร์ซครบวงจร" />
        </Suspense>
      </p>
    </div>
  );
}
