import WorkAndTravelHeader from "@/components/work+travel/workAndTravelHeader";
import NewSpotForm from "@/components/work+travel/forms/newSpotForm";
import ListSpots from "@/components/work+travel/spots/listSpots";

export default function WorkAndTravel() {
  return (
    <div>
      <WorkAndTravelHeader />
      <div className="flex flex-col gap-4 items-center p-10">
        <NewSpotForm />
        <ListSpots />
      </div>
    </div>
  );
}