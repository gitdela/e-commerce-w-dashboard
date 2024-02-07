'use client';
// creating this from shadcn dialog because we will be using multiple modals in the project
// but this is to just help create the modal by giving the component props
// and not use shadcn custom names everywhere

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ModalProps {
  title: string;
  description: string;
  isModalOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isModalOpen,
  closeModal,
  children,
}) => {
  // this onchange function accepts a boolean which shadcn passes to it when the dialog is closed
  // onOpenChange probably has access to the open value of the dialog
  // if you think about it, we can only check to see if modal is open and close the modal when we are inside it
  // hence why there is no openModal prop
  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
