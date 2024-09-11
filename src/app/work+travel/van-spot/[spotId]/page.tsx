
import type { VanSpot } from "@prisma/client";
import { Image } from "@nextui-org/image";
import * as actions from "@/actions";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import paths from "@/paths";

interface VanSpotShowPageProps {
  params: {
    spotId: string;
  };
}

export default async function ShowVanSpot({ params }: VanSpotShowPageProps) {

  const { spotId } = params;
  let spot: VanSpot | null = null;

  try {
    const result = await actions.fetchSpotById(Number(spotId));
    if (result) {
      spot = result;
    } else {
      return <div>Spot not found</div>;
    }
  } catch (error: any) {
    console.log(error)
    return <div>Error fetching spot: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <Link href={paths.workAndTravel.workAndTravel()}>
          <Button color="default">Back</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <h1>{spot.spot_name}</h1>
        <h2>{spot.spot_description}</h2>
        <p>General Rating: {spot.general_rating}</p>
        <p>Internet Rating: {spot.internet_rating}</p>
        <Image src={spot.image_url} alt={spot.spot_name} width={400} height={400} />
      </div>
    </div>
  );
}
