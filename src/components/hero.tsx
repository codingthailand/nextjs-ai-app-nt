import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-[640px] items-center justify-center px-6 py-24">
      <div className="relative z-10 max-w-3xl text-center">
        <Badge asChild variant="outline" className="border-border mb-2">
          <Link href="#">
            ✨ Welcome to NT
          </Link>
        </Badge>

        <h1 className="font-heading text-[48px] font-bold leading-[1.15] tracking-[0.01em] mx-auto mt-6 max-w-xl">
          Discover handcrafted goods made with purpose
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-[1.6] text-muted-foreground">
          Every piece tells a story — from the maker&apos;s hands to your home.
          Shop unique, artisan-crafted products from independent creators
          around the world.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg">
            Browse Collection <ArrowUpRight className="h-5! w-5!" />
          </Button>
          <Button size="lg" variant="outline">
            <CirclePlay className="h-5! w-5!" /> Meet Our Makers
          </Button>
        </div>
      </div>
    </div>
  );
}
