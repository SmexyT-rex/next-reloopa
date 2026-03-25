// Craft Imports
import {
  Section,
  MaxSection,
  Container,
  Prose,
  MaxContainer,
} from "@/components/craft";

// Next.js Imports
import Link from "next/link";

// Icons
import {
  ShoppingBag,
  ShoppingCart,
  Layers,
  Pen,
  User,
  CreditCard,
  Folder,
  Tag,
} from "lucide-react";
import { WordPressIcon } from "@/components/icons/wordpress";
import { NextJsIcon } from "@/components/icons/nextjs";
import { WooCommerceIcon } from "@/components/icons/woocommerce";
import { Hero } from "@/components/layout/hero";
import FeaturedProducts from "@/components/layout/featuredProducts";

export default function Home() {
  return (
    <MaxSection>
      <Container>
        <Hero />
        <aside className=" mb-8">
          <h1 className="text-4xl font-bold">I blickfånget</h1>
        </aside>
        <FeaturedProducts />
        <main className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {/* Shop Links */}
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/shop"
            >
              <ShoppingBag size={32} />
              <span>
                Shop
                <span className="block text-sm text-muted-foreground">
                  Browse all products
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/cart"
            >
              <ShoppingCart size={32} />
              <span>
                Cart
                <span className="block text-sm text-muted-foreground">
                  View your shopping cart
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/checkout"
            >
              <CreditCard size={32} />
              <span>
                Checkout
                <span className="block text-sm text-muted-foreground">
                  Complete your purchase
                </span>
              </span>
            </Link>

            {/* Account Link - WooCommerce */}
            <a
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/my-account`}
            >
              <User size={32} />
              <span>
                My Account
                <span className="block text-sm text-muted-foreground">
                  Login, orders, and settings
                </span>
              </span>
            </a>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/posts/categories"
            >
              <Tag size={32} />
              <span>
                Categories
                <span className="block text-sm text-muted-foreground">
                  Browse by category
                </span>
              </span>
            </Link>

            {/* Blog Links */}
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/posts"
            >
              <Pen size={32} />
              <span>
                Blog
                <span className="block text-sm text-muted-foreground">
                  Read our latest posts
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/pages"
            >
              <Layers size={32} />
              <span>
                Pages
                <span className="block text-sm text-muted-foreground">
                  Static content pages
                </span>
              </span>
            </Link>
            <a
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="https://github.com/9d8dev/next-woo"
            >
              <Folder size={32} />
              <span>
                GitHub
                <span className="block text-sm text-muted-foreground">
                  View source code
                </span>
              </span>
            </a>
            <a
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="https://github.com/9d8dev/next-woo/tree/main/plugin"
            >
              <Folder size={32} />
              <span>
                Plugin
                <span className="block text-sm text-muted-foreground">
                  WordPress revalidation plugin
                </span>
              </span>
            </a>
          </div>
        </main>
      </Container>
    </MaxSection>
  );
}
