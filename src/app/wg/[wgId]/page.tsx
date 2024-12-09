import HeroHeader from "@/components/heroHeader";

export default function WgPage({params}: {params: {wgId: string}}) {
  return (
    <div>
      <HeroHeader title={"WG mit Id: " + params.wgId} />
    </div>
  );
}