import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import AddTitleImage from "@/components/work+travel/forms/addTitleImage";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import type { VanSpot } from "@prisma/client";
import Link from "next/link";
import paths from "@/paths";

export default function SpotCard({ spot }: { spot: VanSpot }) {

  const { id, image_url } = spot;

  function generateStars(rating: number) {
    return "⭐".repeat(rating);
  }

  return (
    <Card className="px-4 pt-4 shadow-lg rounded-lg">
      <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-center">
        <h3 className="text-xl font-bold text-center">{spot.spot_name}</h3>
          <Link href={paths.workAndTravel.showVanSpot(spot.id)}>        
            <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            View
            </Button>
          </Link>
      </CardHeader>
      <CardBody className="overflow-visible">
        <div className="flex flex-col gap-3">
          <p className="flex justify-center pb-4">{spot.spot_description}</p>
          <p>General Rating: {generateStars(spot.general_rating)}</p>
          <p>Internet Rating: {generateStars(spot.internet_rating)}</p>
          {
            image_url != '' && (
            <Image
              src={image_url}
              alt={spot.spot_name}
              height={250}
              width={250}
              className="object-cover rounded-xl mx-auto"
            />
            )
          }
        </div>
      </CardBody>
      {
        image_url === '' && (
          <div className="p-5">
            <AddTitleImage spotId={id}/>
          </div>
        )
      }
      
    </Card>
  );
}
