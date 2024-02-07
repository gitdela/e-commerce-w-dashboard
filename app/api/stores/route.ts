import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// now when a user creates a store, we need to send that POST request to planetscale using prisma
// according to the schema, only the name of the store and userId is required
// the request will contain the name of the store
// but we can get the userId from the clerk... if it exists
// we do an error check on both to see if they exist or not
export async function POST(req: Request) {
  try {
    // get the userId from the clerk
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // get the body from the json request. the body contains the name of the store. just that
    const body = await req.json();
    // let's destructure the name from it so it can be easier to work with
    const { name } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    // now if both the name and userId exist, we can create the store with prisma create method
    const store = await prismadb.store.create({
      data: {
        name: name,
        userId: userId,
      },
    });

    return NextResponse.json(store);

    // now let's go back to the modal and when we click on the button, we can send a POST request to this route and redirect to the stores page
  } catch (error) {
    console.log('[STORES_POST', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
