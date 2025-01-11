import { Suspense } from "react";
import { Steps } from "@/components/checkout/steps";
import { CartSummary } from "@/components/checkout/cart-summary";

export default function CheckoutPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-28">
      <div className="lg:col-span-2">
        <Steps />
      </div>

      <Suspense
        fallback={
          <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
        }
      >
        <CartSummary />
      </Suspense>
    </div>
  );
}
