import HeroHeader from "@/components/header/heroHeader";
import NewWgForm from "@/components/wg/newWgForm";
import ReturnButton from "@/components/common/returnButton";
import paths from "@/paths";

export default function NewWGPage() {
  return (
    <div>
      <HeroHeader title="Neue WG" />
      <div className="px-8 pb-16">
        <ReturnButton path={paths.wgGame.wg()} />
      </div>
      <NewWgForm />
    </div>
  );
}
