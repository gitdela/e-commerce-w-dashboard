import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { SettingsForm } from './components/settings-form';

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId: userId,
      id: params.storeId,
    },
  });

  if (!store) {
    redirect('/');
  }
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        {/* since this will only be used inside the settings page here, let the component live in the same folder  */}
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
