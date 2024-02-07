'use client';

import { useEffect, useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      isModalOpen={isOpen}
      closeModal={onClose}
      title='Are you sure?'
      description='This action cannot be undone.'
    >
      <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
        <Button variant='outline' disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant='destructive' disabled={loading} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
