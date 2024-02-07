'use client';

import { useEffect, useState } from 'react';
import { Button } from './button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

// this was added when i was creating the cloudinary account. i installed cloudinary, then the next-cloudinary package
// this is going to be an image to upload the image and a to display those uploaded images

interface imageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string[];
}

const ImageUpload: React.FC<imageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
          >
            {/* without adding the width and height props, you can just use fill */}
            <Image fill className='object-cover' alt='Image' src={url} />
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                variant='destructive'
                onClick={() => onRemove()}
                size={'icon'}
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* to get the preset, go on cloudinary, settings, upload, add upload preset, make it unsigned and copy the preset name */}
      <CldUploadWidget onUpload={onUpload} uploadPreset='onz5b4by'>
        {/* this callback function will be called when the user clicks on the upload button so it can open the cloudinary */}
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type='button'
              disabled={disabled}
              variant={'secondary'}
              onClick={onClick}
            >
              <ImagePlus className='mr-2 h-4 w-4' />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
