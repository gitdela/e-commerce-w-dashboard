import { BillboardClient } from './components/client';

const BillboardsPage = () => {
  return (
    // i removed the flex col from here to see if something breaks
    // i think here we will fetch all billboards and render them
    // well if not here then inside the billboardclient component
    <div className=''>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillboardsPage;
