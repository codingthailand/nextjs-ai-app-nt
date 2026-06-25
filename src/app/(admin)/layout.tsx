import type { Metadata } from "next";
import { Lora, Open_Sans, Source_Code_Pro, Prompt } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import "../globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-heading",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
});

const promptFont = Prompt({
  weight: ["400", "500", "700"],
  subsets: ["thai"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "ระบบจัดการร้านค้า",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        promptFont.className,
        "font-sans",
        lora.variable,
        openSans.variable,
        sourceCodePro.variable
      )}
    >
      <body>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
