'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';

interface CreateSpotProps {
  spot_name: string;
  spot_description: string;
  location: string;
  general_rating: number;
  internet_rating: number;
  image_url: string;
}

export async function createSpot(
  newSpot: CreateSpotProps
): Promise<boolean> {
  const { spot_name, spot_description, location, general_rating, internet_rating, image_url } = newSpot;

  try {
    await db.vanSpot.create({
      data: {
        spot_name,
        spot_description,
        location,
        general_rating,
        internet_rating,
        image_url
      },
    });
  } catch (err: any) {
    console.error(err);
    return false;
  }

  console.log('Spot created successfully');
  revalidatePath(paths.workAndTravel.workAndTravel());
  return true;
  
}