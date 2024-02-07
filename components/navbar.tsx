import { UserButton, auth } from '@clerk/nextjs';
import { MainNav } from '@/components/main-nav';
import StoreSwitcher from '@/components/store-switcher';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div className='border-b'>
      <div className='h-16 flex items-center px-4'>
        <StoreSwitcher items={stores} />
        {/* we're passing a classname here because we declared that the MainNav component has a className prop */}
        {/* we will use cn there to merge this className with the MainNav className */}
        <MainNav className='mx-4' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
