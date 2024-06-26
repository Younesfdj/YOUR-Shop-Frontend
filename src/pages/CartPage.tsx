import { CartItems } from "../components/cart-items";
import { CartSummary } from "../components/cart-summary";
import RootLayout from "../layout";
export default function CartPage() {
  return (
    <RootLayout>
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Pannier d'achat
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Articles dans le panier
            </h2>
            <CartItems />
          </section>
          <CartSummary />
        </form>
      </main>
    </RootLayout>
  );
}
