'use client';

// this component actually manages the state of the modal
// we used zustand to the opening and closing of the modal

import * as z from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '@/components/ui/modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Create at least one store before continuing' }),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  // used to disable elements when the store is being created
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', {
        name: value.name,
      });

      storeModal.onModalCloseAction();
      // not using redirect from nextjs because it does not do a full refresh of the page
      window.location.assign(`/${response.data.storeId}`);
      toast.success('Store created successfully');
    } catch (error) {
      toast.error('Something went wrong :(');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isModalOpen={storeModal.isModalOpen}
      closeModal={storeModal.onModalCloseAction}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='E-Commerce'
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end'>
                <Button
                  variant={'ghost'}
                  disabled={loading}
                  onClick={storeModal.onModalCloseAction}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

// the ...field inside of the input is spreading onChange, onBlur, value, name etc
