'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy as CopyIcon, Server as ServerIcon } from 'lucide-react';
import { Badge, BadgeProps } from './badge';
import { Button } from './button';
import toast from 'react-hot-toast';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

// --------------------------------------------------------------
// i'm going to include two badges. one for public and one for admin
// when it's admin, i want the text to be "admin" and the badge style to be "destructive"
// when it's public, i want the text to be "public" and the badge style to be "secondary"
// for the text here, the object keys are public and admin and the values are strings
const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

// but for the badge style, the object keys are public and admin and the values are BadgeProps['variant']
// the values cannot be strings. typescript will complain
// shadcn declared the variant types as 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
// so when you assign it to strings there's a problem
const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};
// ------------------------------------------------------------------

export const ApiAlert = ({
  title,
  description,
  variant = 'public',
}: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('API route copied to clipboard!');
  };
  return (
    <Alert>
      <ServerIcon className='flex justify-center items-center h-4 w-4' />
      <AlertTitle className='flex items-center gap-x-2'>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      {/* code here is a html tag */}
      <AlertDescription className='mt-4 flex items-center justify-between'>
        <code className='relative rounded bg-muted px-[.3rem] py-[.2rem] font-mono font-semibold'>
          {description}
        </code>
        <Button variant={'outline'} size={'icon'} onClick={onCopy}>
          <CopyIcon className='h-4 w-4' />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
