import HeroHeader from "@/components/header/heroHeader";
import NewPayoutForm from "@/components/time-tracker/payout/newPayoutForm";

export default function PayoutPage() {
  return (
    <div>
      <HeroHeader title="Payout" />
      <NewPayoutForm />
    </div>
  );
}