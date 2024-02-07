'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus as PlusIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export const BillboardClient = () => {
  // we will probably fetch all billboards here and render them
  // but
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Billboards (0)'
          description='Manage billboards for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusIcon className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};
