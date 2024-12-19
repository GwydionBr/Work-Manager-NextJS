import HeroHeader from "@/components/header/heroHeader";

export default function WgPage({ params }: { params: { wgId: string } }) {
  return (
    <div>
      <HeroHeader title={"WG mit Id: " + params.wgId} />
    </div>
  );
}
