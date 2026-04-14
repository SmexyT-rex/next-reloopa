"use client";

export function NewsletterForm() {
  return (
    <form
      className="mx-auto flex w-full max-w-md flex-col gap-2 sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        id="newsletter-email"
        placeholder="your@email.com"
        className="min-w-0 w-full flex-1 rounded px-4 py-3 font-work text-sm outline-none"
        style={{
          background: "rgba(255,255,255,0.15)",
          color: "#ffffff",
          border: "none",
        }}
      />
      <button
        type="submit"
        className="w-full rounded px-5 py-3 font-work text-sm font-semibold transition-all hover:opacity-90 sm:w-auto"
        style={{ background: "#ffffff", color: "#316b1c" }}
      >
        Subscribe
      </button>
    </form>
  );
}
