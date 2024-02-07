import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashBoardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const { userId } = auth();
  // ----------------------------------------------------------------------
  // now you may be wondering why i used the `|| ''` in the `where` clause.
  // because if you don't use the `|| ''` it will throw a type error.
  // we didn't have to do that in the layout file because we handled the situation where user is undefined
  // with the if statement
  // we can do that here as well but let's just make it simple
  // ----------------------------------------------------------------------

  const store = await prismadb.store.findFirst({
    where: {
      userId: userId || '',
      id: params.storeId,
    },
  });
  return <div>Active Store: {store?.name}</div>;
};

export default DashBoardPage;
