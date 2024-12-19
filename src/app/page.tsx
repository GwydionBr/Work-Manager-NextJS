import { getUsers } from "@/db";
import HeroHeader from "@/components/header/heroHeader";
import FakeText from "@/components/fakeText";

export default async function Home() {
  const tester = await getUsers();

  return (
    <div>
      <HeroHeader title="Home" />
      <FakeText />
    </div>
  );
}
