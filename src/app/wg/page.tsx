import HeroHeader from "@/components/heroHeader";
import Link from "next/link";
import paths from "@/paths";

export default function WgGamePage() {
  return (
    <div>
      <HeroHeader title="WG Game" />
      <div className="flex flex-col items-center gap-4">
        <Link href={paths.wgGame.newWG()}>
          Neue WG erstellen
        </Link>
        <br />
        <p>
          Einer bestehenden WG beitreten
        </p>
        <br />
        <p>
          WG Liste von bestehenden WGs
        </p>
      </div>
    </div>
  );
}