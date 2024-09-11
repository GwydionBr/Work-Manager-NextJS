import { db } from '@/db';
import SpotCard from '@/components/work+travel/spots/spotCard';


export default async function ListSpots(){
  const spots = await db.vanSpot.findMany();

  if (!spots) {
    return <div>Error in fetching Spots</div>
  } else {
    return (
      <div className="flex gap-6 flex-wrap">
        {spots.map((spot: any) => (
          <div key={spot.id} className="">
            <SpotCard spot={spot} />
          </div>
        ))}
      </div>
    )
  }
}