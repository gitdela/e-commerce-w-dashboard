'use client';

import { Store } from '@prisma/client';
// renaming here to avoid conflict with the Store type from prisma
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// extract all the props from PopoverTrigger without the ref
type PopOverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

// extend the PopOverTriggerProps with our own props
// added an items prop to store the list of stores from prisma, which are of the type Store from prisma
interface StoreSwitcherProps extends PopOverTriggerProps {
  items: Store[];
  className?: string;
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  // the switch is kind of like a navigation
  // this is done so that it can be easier to create that switcher navigation
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  // to find the current store in the array of stores which is formattedStores,
  // we compare the id of the store in the url with the id of the store in the array which is stored in the value of the item
  // don't forget this component is part of the navbar which is in the dashboard layout
  // and the layout has access to storeId which is the id of the store in the url
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);
  const onStoreChange = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover>
      {/* this trigger is just being designed to look like a button */}
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role='combobox'
          size={'sm'}
          aria-expanded={open}
          aria-label='Select a store'
          className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className='mr-2 h-4 w-4' />
          {currentStore?.label || 'Create a store'}
          <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      {/* now when the trigger is clicked on, we open this popover content */}
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            {/* this comes with a search icon and bar */}
            <CommandInput placeholder='Search store...' />
            <CommandEmpty>No Store Found</CommandEmpty>
            {/* this is where the list of stores will be */}
            <CommandGroup heading='Stores'>
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreChange(store)}
                  className='text-sm'
                >
                  <StoreIcon className='mr-2 h-4 w-4' />
                  {store.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onModalOpenAction();
                }}
                className='cursor-pointer'
              >
                <PlusCircle className='mr-2 h-4 w-4' />
                Create a New Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
