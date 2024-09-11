'use client';

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Image } from "@nextui-org/image";
import * as actions from "@/actions";


export default function AddTitleImage( {spotId}: {spotId: number}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [temporaryFileUrl, setTemporaryFileUrl] = useState<string | undefined>(undefined);
  const [uploadError, setUploadError] = useState<string | undefined>(undefined);


  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }


  async function handleSubmit() {
    if (file) {
      setIsUploading(true);
      setUploadError(undefined);

      try {
        const signedUrlResult = await actions.getSignedUrlAction(spotId, "title");
        if (!signedUrlResult.success) {
          throw new Error('Failed to get signed URL');
        }

        const url = signedUrlResult.success.url;
        const response = await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
      } catch (error: any) {
        setUploadError(error.message);
      } finally {
        setIsUploading(false);
        setFile(undefined);
        setTemporaryFileUrl(undefined);
        togglePopover();
      }
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFile(file);

    if (temporaryFileUrl) {
      URL.revokeObjectURL(temporaryFileUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setTemporaryFileUrl(url);
    } else {
      setTemporaryFileUrl(undefined);
    }
  }


  return (
   <Popover isOpen={isPopoverOpen} backdrop="blur">
    <PopoverTrigger>
      <Button onClick={togglePopover}>Add Title Image</Button>
    </PopoverTrigger>
    <PopoverContent className="flex flex-col gap-5 p-5">
      {
        temporaryFileUrl && (
          <Image
            src={temporaryFileUrl}
            alt="Title Image"
            height={250}
            width={250}
            className="object-cover rounded-xl mx-auto"
          />
        )
      }
      {
        !temporaryFileUrl &&
        <div>
        <label htmlFor="file-upload">
          <Button color="primary" as="span" className="cursor-pointer">
            Choose File
          </Button>
        </label>
        <input
          id="file-upload"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload Image"
        />
        </div>
        }
      {
        file &&
        <Button color="primary" onClick={handleSubmit}>
        {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
        }
      <Button color="danger" onClick={togglePopover}>Cancel</Button>
    </PopoverContent>
   </Popover>
    
  )
}