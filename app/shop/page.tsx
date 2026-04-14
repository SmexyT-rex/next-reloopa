import Link from "next/link";
import {
  ArrowRight,
  Grid2x2,
  PaintRoller,
  Palette,
  TreePine,
  Diamond,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  formatPrice,
  getAllProductCategories,
  getProducts,
} from "@/lib/woocommerce";

export const metadata = {
  title: "Shop the Collection | Reloopa",
  description:
    "A curated selection of artisanal treasures, where every object tells a story of craftsmanship and intentional living.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategory =
    typeof resolvedParams.category === "string" ? resolvedParams.category : "";
  const pageParam =
    typeof resolvedParams.page === "string" ? resolvedParams.page : "1";
  const parsedPage = Number.parseInt(pageParam, 10);
  const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  const wcCategories = await getAllProductCategories();

  const getCategoryIcon = (slug: string) => {
    switch (slug.toLowerCase()) {
      case "ceramics":
        return <PaintRoller size={16} />;
      case "textiles":
        return <Palette size={16} />;
      case "furniture":
      case "woodwork":
        return <TreePine size={16} />;
      case "jewelry":
        return <Diamond size={16} />;
      default:
        return <Grid2x2 size={16} />;
    }
  };

  const categories = [
    {
      label: "All Items",
      icon: <Grid2x2 size={16} />,
      slug: "",
      id: undefined,
    },
    ...wcCategories.map((cat) => ({
      label: cat.name,
      icon: getCategoryIcon(cat.slug),
      slug: cat.slug,
      id: cat.id,
    })),
  ];

  const activeCategoryObj = categories.find((c) => c.slug === currentCategory);
  const activeCategoryId = activeCategoryObj?.id;

  const productsRes = await getProducts(
    page,
    12,
    activeCategoryId ? { category: activeCategoryId } : undefined,
  );
  const products = productsRes.data;
  const totalPages = productsRes.headers.totalPages;

  const createPaginationUrl = (newPage: number) => {
    const urlParams = new URLSearchParams();
    if (currentCategory) {
      urlParams.set("category", currentCategory);
    }
    if (newPage > 1) {
      urlParams.set("page", String(newPage));
    }
    const query = urlParams.toString();
    return query ? `/shop?${query}` : "/shop";
  };

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] font-[Work_Sans,sans-serif]">
      <main className="mx-auto flex min-h-screen w-full max-w-[1200px]">
        <aside
          className="sticky top-16 hidden h-screen w-64 flex-col gap-y-8 bg-stone-50 px-6 pt-24 lg:flex"
          style={{ backgroundColor: "#f3f3f3" }}
        >
          <div>
            <h3 className="font-manrope text-lg font-bold tracking-tight text-[#316b1c]">
              Collections
            </h3>
            <p className="font-work mt-1 text-xs uppercase tracking-widest text-stone-400">
              Filter by Craft
            </p>
          </div>

          <nav className="flex flex-col gap-y-1">
            {categories.map((cat) => {
              const isActive = currentCategory === cat.slug;
              return (
                <Link
                  key={cat.id ?? "all-items"}
                  href={cat.slug ? `/shop?category=${cat.slug}` : "/shop"}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 font-work text-sm tracking-wide transition-all ${
                    isActive
                      ? "bg-stone-100 font-semibold text-green-800"
                      : "text-stone-500 hover:bg-stone-100"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-6 pt-4">
            <div>
              <label className="mb-3 block font-work text-xs uppercase tracking-widest text-stone-500">
                Price Range
              </label>
              <div className="px-2">
                <input
                  className="h-1 w-full appearance-none rounded-full bg-stone-200 accent-[#316b1c]"
                  type="range"
                />
                <div className="mt-2 flex justify-between font-work text-[10px] text-stone-400">
                  <span>$0</span>
                  <span>$5000+</span>
                </div>
              </div>
            </div>

            <button className="mt-4 w-full rounded-lg bg-[#316b1c] py-3 font-manrope text-sm font-bold text-white shadow-sm shadow-[#316b1c]/20 transition-opacity hover:opacity-90">
              Apply Filters
            </button>
          </div>
        </aside>

        <section className="flex-1 px-8 py-12 lg:px-12">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="mb-3 flex flex-wrap items-center gap-2 font-work text-xs uppercase tracking-widest text-stone-400"
              >
                <Link
                  href="/"
                  className="transition-colors hover:text-[#316b1c]"
                >
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <Link
                  href="/shop"
                  className="transition-colors hover:text-[#316b1c]"
                >
                  Shop
                </Link>
                {activeCategoryObj && activeCategoryObj.slug && (
                  <>
                    <span aria-hidden="true">/</span>
                    <span className="text-stone-500">
                      {activeCategoryObj.label}
                    </span>
                  </>
                )}
              </nav>
              <h1 className="font-manrope mb-2 text-4xl font-extrabold tracking-tighter text-[#1a1c1c]">
                Artisanal Gallery
              </h1>
              <p className="font-work max-w-md text-sm leading-relaxed text-stone-500">
                Discover one-of-a-kind pieces hand-crafted by master artisans
                across the globe.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-work text-xs uppercase tracking-widest text-stone-400">
                Sort by:
              </span>
              <div className="relative">
                <select className="font-work cursor-pointer rounded-lg border border-stone-200 bg-white px-6 py-2.5 text-sm font-semibold text-stone-700 shadow-sm outline-none focus:ring-1 focus:ring-[#316b1c]">
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Curated Selection</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12">
            {products.map((product, idx) => {
              const currentPriceValue =
                product.sale_price ||
                product.price ||
                product.regular_price ||
                "0";
              const regularPriceValue = product.regular_price || "";
              const hasDiscount = Boolean(
                product.on_sale &&
                regularPriceValue &&
                product.sale_price &&
                parseFloat(regularPriceValue) > parseFloat(product.sale_price),
              );

              return (
                <div key={product.slug} className="group flex h-full flex-col">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="relative mb-6 block aspect-4/5 overflow-hidden rounded-xl bg-[#e2e2e2]"
                  >
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-work text-stone-400">
                        No Image
                      </div>
                    )}

                    {idx === 0 && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/40 px-3 py-1 font-work text-[10px] font-bold uppercase tracking-widest text-[#1a1c1c] backdrop-blur-md">
                        One-of-a-kind
                      </span>
                    )}

                    {idx === 1 && (
                      <span className="absolute bottom-4 right-4 rounded-full bg-[#316b1c] px-3 py-1 font-work text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-[#316b1c]/20">
                        Artist Spotlight
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col justify-between gap-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-manrope line-clamp-2 text-lg font-bold leading-tight text-[#1a1c1c]">
                          {product.name}
                        </h3>
                        <p className="font-work mt-1.5 text-xs uppercase tracking-tighter text-stone-400">
                          {product.categories[0]?.name || "Uncategorized"}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-manrope whitespace-nowrap text-lg font-bold text-[#316b1c]">
                          {formatPrice(currentPriceValue)}
                        </span>
                        {hasDiscount && (
                          <span className="font-work text-sm text-stone-400 line-through">
                            {formatPrice(regularPriceValue)}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/shop/${product.slug}`}
                      className="group/btn mt-4 flex w-full items-center justify-between border-b border-stone-200 py-3 text-stone-700 transition-all hover:border-[#316b1c] hover:text-[#316b1c]"
                    >
                      <span className="font-manrope text-sm font-semibold">
                        View Details
                      </span>
                      <ArrowRight
                        size={18}
                        className="translate-x-0 transition-transform group-hover/btn:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-24 flex justify-center">
              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={createPaginationUrl(page - 1)}
                      />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((pageNum) => {
                      return (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        Math.abs(pageNum - page) <= 1
                      );
                    })
                    .map((pageNum, index, array) => {
                      const showEllipsis =
                        index > 0 && pageNum - array[index - 1] > 1;

                      return (
                        <div key={pageNum} className="flex items-center">
                          {showEllipsis && <span className="px-2">...</span>}
                          <PaginationItem>
                            <PaginationLink
                              href={createPaginationUrl(pageNum)}
                              isActive={pageNum === page}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        </div>
                      );
                    })}

                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={createPaginationUrl(page + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
