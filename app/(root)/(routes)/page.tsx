'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

export default function SetupPage() {
  const isModalOpen = useStoreModal((state) => state.isModalOpen);
  const openModal = useStoreModal((state) => state.onModalOpenAction);

  useEffect(() => {
    if (!isModalOpen) {
      openModal();
    }
  }, [isModalOpen, openModal]);

  return null;
}
