import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { CartDrawer } from "@/components/shop";
import { mainMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.svg";

interface NavProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export function Nav({ className, children, id }: NavProps) {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl",
        className,
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="relative mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-18 sm:px-6 lg:px-8"
      >
        <Link
          className="flex items-center gap-3 transition-opacity hover:opacity-75"
          href="/"
        >
          <Image
            src={Logo}
            alt="Logo"
            loading="eager"
            className="dark:invert"
            width={40}
            height={25}
          />
          <h2 className="font-manrope text-sm font-semibold tracking-tight sm:text-base">
            {siteConfig.site_name}
          </h2>
        </Link>
        {children}
        <form className="absolute left-1/2 hidden w-full max-w-sm -translate-x-1/2 items-center px-4 lg:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-10 w-full rounded-full border-0 bg-secondary pl-9 pr-4 text-sm outline-none ring-1 ring-transparent transition focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
        </form>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden xl:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button
                key={href}
                asChild
                variant="ghost"
                size="sm"
                className="font-work text-sm"
              >
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
          <CartDrawer />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
