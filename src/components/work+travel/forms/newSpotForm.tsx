'use client';

import { useState } from 'react';
import {
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  toggle,
} from '@nextui-org/react';
import { z } from 'zod';
import { Pagination } from "@nextui-org/pagination";
import * as actions from '@/actions';

const createSpotSchema = z.object({
  spotName: z.string().min(1).max(255),
  spotDescription: z.string().min(1).max(255),
  spotLocation: z.string().url(),
  generalRating: z.number().min(0),
  internetRating: z.number().min(0),
});

interface CreateSpotFormState {
  errors: {
    spotName?: string[];
    spotDescription?: string[];
    spotLocation?: string[];
    generalRating?: string[];
    internetRating?: string[];
    _form?: string[];
  };
}

export default function NewSpotForm() {
  const [formState, setFormState] = useState<CreateSpotFormState>({errors: {},});
  const [spotName, setSpotName] = useState('');
  const [spotDescription, setSpotDescription] = useState('');
  const [spotLocation, setSpotLocation] = useState('');
  const [generalRating, setGeneralRating] = useState(1);
  const [internetRating, setInternetRating] = useState(1);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  async function handleSubmit() {

    const result = createSpotSchema.safeParse({
      spotName,
      spotDescription,
      spotLocation,
      generalRating,
      internetRating
    });
  
    if (!result.success) {
        setFormState({
          errors: result.error.flatten().fieldErrors})
      }

    

    try{
      const newSpot = {
        spot_name: spotName,
        spot_description: spotDescription,
        location: spotLocation,
        general_rating: generalRating,
        internet_rating: internetRating,
        image_url: '',
      };

      const status= await actions.createSpot(newSpot);

      if(status){
        togglePopover();
      } else {
        console.log("Status failed")
        setFormState({
          errors: {
            _form: ['Failed to create spot']
          }
        })
      } 
    } catch (err: any) {
      console.log("error failed")
        setFormState({
          errors: {
            _form: ['Failed to create spot']
          }
        })
    }
  }

   
  return (
    <Popover placement="right" backdrop="blur" isOpen={isPopoverOpen}>
      <PopoverTrigger>
        <Button onClick={togglePopover}>Add Spot</Button>
      </PopoverTrigger>
      <PopoverContent>
          <div className="flex flex-col gap-3 p-3">
            <Input
              value={spotName}
              onChange={(e) => setSpotName(e.target.value)}
              name="spotName"
              label="Spot Name:"
              labelPlacement="outside"
              placeholder="Enter spot name"
              isInvalid={!!formState?.errors.spotName}
              errorMessage={formState?.errors.spotName?.join(', ')}
            />
            <Input
              value={spotDescription}
              onChange={(e) => setSpotDescription(e.target.value)}
              name="spotDescription"
              label="Spot Description:"
              labelPlacement="outside"
              placeholder="Enter spot description"
              isInvalid={!!formState?.errors.spotDescription}
              errorMessage={formState?.errors.spotDescription?.join(', ')}
            />
            <Input
              value={spotLocation}
              onChange={(e) => setSpotLocation(e.target.value)}
              name="spotLocation"
              label="Spot Location:"
              labelPlacement="outside"
              placeholder="Enter spot location"
              isInvalid={!!formState?.errors.spotLocation}
              errorMessage={formState?.errors.spotLocation?.join(', ')}
            />

            <div className="flex flex-col">
              <label>General Rating:</label>
              <Pagination
                total={5}
                initialPage={generalRating}
                onChange={(page) => setGeneralRating(page)}
              />
            </div>

            <div className="flex flex-col">
              <label>Internet Rating:</label>
              <Pagination
                total={5}
                initialPage={internetRating}
                onChange={(page) => setInternetRating(page)}
              />
            </div>
            <Button color="primary" onClick={handleSubmit}>Add Spot</Button>
            <Button color="danger" onClick={togglePopover}>Cancel</Button>
            {formState?.errors._form ? (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              {formState?.errors._form?.join(', ')}
            </div>
          ) : null}
          </div>
          
      </PopoverContent>
    </Popover>
  );
}
