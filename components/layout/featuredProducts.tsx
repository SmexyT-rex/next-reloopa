import { getFeaturedProducts, formatPrice } from "@/lib/woocommerce";
import { ProductGrid } from "@/components/shop/product-grid";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts(4);

  if (!products || products.length === 0) {
    return <p>För tillfället finns det inga produkter i blickfånget.</p>;
  }

  return <ProductGrid products={products} columns={4} />;
}
