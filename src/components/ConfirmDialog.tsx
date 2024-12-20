import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  onSave,
  onClose,
  children,
}: ConfirmDialogProps) {
  return (
    <Dialog onClose={onClose} open={isOpen} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded bg-white p-6 shadow-xl">
          <div className="flex justify-between text-center p-4">
            <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="space-x-4n ">
            {children}
            <div className="flex mt-6 ">
              <button
                onClick={onClose}
                className="w-full mr-4 inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-colors text-base text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                No
              </button>
              <button
                onClick={onSave}
                className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Yes
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
