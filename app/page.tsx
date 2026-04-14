import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import { PageAnimator } from "@/components/page-animator";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  formatPrice,
  getFeaturedProducts,
  getProducts,
} from "@/lib/woocommerce";

export const metadata = {
  title: "Reloopa | The Digital Curator",
  description:
    "A curated digital gallery of rare finds and artisanal objects. Supporting creators worldwide through intentional commerce.",
};

const SOFT_COLORS = [
  "bg-[#c9d8e8]",
  "bg-[#e8dfc9]",
  "bg-[#d4d0cc]",
  "bg-[#d8e4d8]",
  "bg-[#e8e0c8]",
];

const primaryGradient = "linear-gradient(135deg, #316b1c, #66a34d)";

type PricedItem = {
  sale_price?: string;
  price?: string;
  regular_price?: string;
  on_sale?: boolean;
};

function getPriceInfo(item: PricedItem) {
  const currentPriceValue =
    item.sale_price || item.price || item.regular_price || "0";
  const regularPriceValue = item.regular_price || "";
  const hasDiscount = Boolean(
    item.on_sale &&
    regularPriceValue &&
    item.sale_price &&
    parseFloat(regularPriceValue) > parseFloat(item.sale_price),
  );

  return { currentPriceValue, regularPriceValue, hasDiscount };
}

function GradientButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-work text-sm font-semibold transition-all hover:opacity-90 ${className || ""}`}
      style={{
        background: primaryGradient,
        color: "#ffffff",
      }}
    >
      {children}
    </Link>
  );
}

export default async function Home() {
  const [productsRes, featuredProducts] = await Promise.all([
    getProducts(1, 5),
    getFeaturedProducts(4),
  ]);
  const products = productsRes.data;

  return (
    <div>
      <PageAnimator />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#f3f3f3", minHeight: "80vh" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 z-10">
            <p
              className="hero-text font-work text-xs font-medium uppercase tracking-widest mb-5"
              style={{ color: "#316b1c" }}
            >
              The Digital Curator
            </p>

            <h1
              className="hero-text font-manrope font-bold leading-none mb-6"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                letterSpacing: "-0.03em",
                color: "#1a1c1c",
                lineHeight: 1.05,
              }}
            >
              One-of-a-kind
              <br />
              objects,
              <br />
              <span className="italic font-light" style={{ color: "#316b1c" }}>
                curated
              </span>
            </h1>

            <p
              className="font-work text-sm max-w-xl mb-8"
              style={{ color: "#41493c" }}
            >
              Discover rare pieces chosen for character, craftsmanship, and
              story. Every object is intentionally selected and available in
              limited quantity.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <GradientButton href="/shop" className="px-6 py-3">
                Shop Collection
                <ArrowRight size={15} />
              </GradientButton>

              <Link
                href="/posts"
                className="font-work text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
                style={{ color: "#41493c" }}
              >
                Our Journal
              </Link>
            </div>
          </div>

          <div className="hero-image flex-1 relative hidden md:flex justify-end">
            <div
              className="w-[420px] h-[520px] rounded-2xl overflow-hidden relative"
              style={{ background: "#e2e8dd" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(160deg, #c5d9bc 0%, #e8ede4 100%)",
                }}
              >
                <div className="text-center">
                  <div
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                    style={{ background: "rgba(49,107,28,0.12)" }}
                  />
                  <p
                    className="font-manrope text-xs uppercase tracking-widest"
                    style={{ color: "#316b1c" }}
                  >
                    One-of-a-kind
                  </p>
                </div>
              </div>

              <div
                className="absolute bottom-8 left-8 px-4 py-2 rounded-full backdrop-blur-sm"
                style={{
                  background: "rgba(249,249,249,0.80)",
                  boxShadow: "0 8px 32px rgba(26,28,28,0.06)",
                }}
              >
                <p
                  className="font-work text-xs font-semibold"
                  style={{ color: "#316b1c" }}
                >
                  ✦ New arrivals weekly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Curator's Picks */}
      <section
        className="curator-section py-24"
        style={{ background: "#f9f9f9" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="font-work text-xs font-medium uppercase tracking-widest mb-2"
                style={{ color: "#316b1c" }}
              >
                Handpicked
              </p>
              <h2
                className="font-manrope font-bold"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                  letterSpacing: "-0.025em",
                  color: "#1a1c1c",
                }}
              >
                The Curator's Picks
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-1.5 font-work text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "#41493c" }}
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((pick) => {
              const { currentPriceValue, regularPriceValue, hasDiscount } =
                getPriceInfo(pick);

              return (
                <Link
                  key={pick.slug}
                  href={`/shop/${pick.slug}`}
                  className="curator-pick group flex flex-col items-start text-left"
                >
                  <div className="w-full aspect-4/5 overflow-hidden rounded-xl bg-gray-100 mb-4 relative">
                    {pick.images && pick.images[0] ? (
                      <img
                        src={pick.images[0].src}
                        alt={pick.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>

                  <span
                    className="inline-block px-2.5 py-1 rounded-sm text-[10px] font-work font-bold uppercase tracking-widest mb-2"
                    style={{
                      background: "rgba(49,107,28,0.06)",
                      color: "#316b1c",
                    }}
                  >
                    {pick.categories[0]?.name || "Featured"}
                  </span>

                  <h3
                    className="font-manrope font-semibold text-lg leading-snug line-clamp-2 transition-colors group-hover:text-[#316b1c]"
                    style={{ color: "#1a1c1c", letterSpacing: "-0.01em" }}
                  >
                    {pick.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-manrope text-sm font-bold text-[#316b1c]">
                      {formatPrice(currentPriceValue)}
                    </span>
                    {hasDiscount && (
                      <span className="font-work text-xs text-stone-400 line-through">
                        {formatPrice(regularPriceValue)}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Available Objects */}
      <section
        className="available-section py-24"
        style={{ background: "#eeeeee" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="font-work text-xs font-medium uppercase tracking-widest mb-2"
                style={{ color: "#316b1c" }}
              >
                Limited Edition
              </p>
              <h2
                className="font-manrope font-bold mb-3"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                  letterSpacing: "-0.025em",
                  color: "#1a1c1c",
                }}
              >
                Available Objects
              </h2>
              <p
                className="font-work text-sm max-w-lg"
                style={{ color: "#41493c" }}
              >
                Each piece is hand-selected by our curators for its unique
                character, craftsmanship, and soul. Once sold, they are gone
                forever.
              </p>
            </div>

            <GradientButton
              href="/shop"
              className="hidden md:inline-flex shrink-0 px-6 py-3"
            >
              Browse All
              <ArrowRight size={14} />
            </GradientButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {products.map((product, idx) => {
              const { currentPriceValue, regularPriceValue, hasDiscount } =
                getPriceInfo(product);
              const color = SOFT_COLORS[idx % SOFT_COLORS.length];

              return (
                <Link
                  key={product.slug}
                  href={`/shop/${product.slug}`}
                  className="available-object group relative rounded-xl overflow-hidden transition-transform hover:scale-[1.02] flex flex-col h-full"
                  style={{
                    background: "#ffffff",
                    boxShadow: "0 4px 24px rgba(26,28,28,0.04)",
                  }}
                >
                  <div
                    className={`${color} w-full aspect-square relative flex items-center justify-center overflow-hidden`}
                  >
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span
                        className="font-work text-xs uppercase tracking-widest"
                        style={{ color: "rgba(26,28,28,0.35)" }}
                      >
                        {product.categories[0]?.name || "Uncategorized"}
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <p
                      className="font-manrope font-semibold text-sm mb-1 line-clamp-2"
                      style={{ color: "#1a1c1c", letterSpacing: "-0.01em" }}
                    >
                      {product.name}
                    </p>

                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <span className="font-manrope text-sm font-bold text-[#316b1c]">
                        {formatPrice(currentPriceValue)}
                      </span>
                      {hasDiscount && (
                        <span className="font-work text-xs text-stone-400 line-through">
                          {formatPrice(regularPriceValue)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center md:hidden">
            <GradientButton href="/shop" className="active:scale-[0.98]">
              Browse All Objects
              <ArrowRight size={15} />
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24" style={{ background: "#f9f9f9" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="rounded-2xl px-10 py-16 md:py-20 text-center"
            style={{
              background:
                "linear-gradient(135deg, #316b1c 0%, #4a8a2e 50%, #66a34d 100%)",
            }}
          >
            <p
              className="font-work text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Stay in the loop
            </p>
            <h2
              className="font-manrope font-bold text-white mb-4"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Weekly selections,
              <br />
              zero clutter.
            </h2>
            <p
              className="font-work text-sm mb-10 max-w-md mx-auto"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Our curators surface the rarest objects each week. Unsubscribe
              anytime.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1a1c1c", color: "#c1c9b8" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            <div className="md:col-span-2">
              <p
                className="font-manrope font-bold text-2xl mb-3"
                style={{ color: "#ffffff", letterSpacing: "-0.02em" }}
              >
                Reloopa
              </p>
              <p
                className="font-work text-sm leading-relaxed max-w-xs"
                style={{ color: "#727a6b" }}
              >
                A curated digital gallery of rare finds and artisanal objects.
                Supporting creators worldwide through intentional commerce.
              </p>

              <div className="flex gap-3 mt-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                  aria-label="Instagram"
                >
                  <Instagram size={15} style={{ color: "#c1c9b8" }} />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 font-work text-xs font-bold"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "#c1c9b8",
                  }}
                  aria-label="Pinterest"
                >
                  P
                </a>
              </div>
            </div>

            <div>
              <p
                className="font-manrope font-semibold text-xs uppercase tracking-widest mb-5"
                style={{ color: "#ffffff" }}
              >
                Shop
              </p>
              <ul
                className="space-y-3 font-work text-sm"
                style={{ color: "#727a6b" }}
              >
                {[
                  "All Objects",
                  "Ceramics",
                  "Textiles",
                  "Lighting",
                  "Furniture",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="/shop"
                      className="transition-colors hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                className="font-manrope font-semibold text-xs uppercase tracking-widest mb-5"
                style={{ color: "#ffffff" }}
              >
                Guide
              </p>
              <ul
                className="space-y-3 font-work text-sm"
                style={{ color: "#727a6b" }}
              >
                {[
                  { label: "Our Ethos", href: "/pages" },
                  { label: "Shipping", href: "/pages" },
                  { label: "Authenticity", href: "/pages" },
                  { label: "Contact", href: "/pages" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p
                className="font-work text-xs mt-8 leading-relaxed"
                style={{ color: "#41493c" }}
              >
                124 Gallery St.
                <br />
                Lower East Side, NY 10002
                <br />
                hello@reloopa.se
              </p>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-work text-xs"
            style={{
              borderTop: "1px solid rgba(193,201,184,0.1)",
              color: "#41493c",
            }}
          >
            <p>© 2024 Reloopa. The Digital Curator.</p>
            <div className="flex gap-6">
              <Link
                href="/pages"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/pages"
                className="transition-colors hover:text-white"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
