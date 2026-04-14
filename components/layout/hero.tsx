import { MaxContainer, Container } from "@/components/craft";
import heroImage from "@/public/hero.webp";
import Link from "next/link";

export function Hero() {
  return (
    <MaxContainer>
      <div
        className="bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          height: "800px",
        }}
      >
        <div className="text-center">
          <h1 className="text-white mb-5 text-5xl font-bold">Reloopa.</h1>
          <button className=" rounded-md py-1 px-4 bg-green-500 border-primary-foreground text-primary-foreground">
            <Link href="/shop">Handla nu!</Link>
          </button>
        </div>
      </div>
    </MaxContainer>
  );
}
