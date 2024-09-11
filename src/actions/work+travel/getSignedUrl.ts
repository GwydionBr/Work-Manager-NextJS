'use server';

import { db } from "@/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const generateFileName= (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export async function getSignedUrlAction(spotId: number, folderPath: string) {
  const fileName = generateFileName();
  const fileKey = `${folderPath}/${fileName}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 3600 });

  await db.vanSpot.update({
    where: {
      id: spotId
    },
    data: {
      image_url: signedUrl.split("?")[0],
    }
  });

  return {success:{url: signedUrl}};
}
