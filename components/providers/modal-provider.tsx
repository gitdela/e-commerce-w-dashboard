'use client';

import { useState, useEffect } from 'react';

import { StoreModal } from '../modals/store-modal';

export const ModalProvider = () => {
  // first of all, we need to check if the modal is mounted.
  // nextjs was throwing hydration errors if the modal was not mounted
  // because the client component modal is going to be added to the layout.tsx which is a server component
  // so we need to add this check before it is rendered
  // also, we are creating a provider to add to the layout.tsx because we are using multiple modals
  // and we want it to be available everywhere in the app
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
