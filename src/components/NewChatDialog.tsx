import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ChangeEvent, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NewChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, image: File) => void;
}

export function NewChatDialog({ isOpen, onClose, onSave }: NewChatDialogProps) {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    if ((name.trim(), image)) {
      onSave(name, image);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded bg-white p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-medium">New Chat</DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="chat-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Chat Name
              </label>
              <input
                type="text"
                id="chat-name"
                value={name}
                onChange={handleNameChange}
                className="flex-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="chat-image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Chat Image
              </label>
              <input
                type="file"
                id="chat-image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
              />
            </div>
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
            )}
          </div>
          <div className="mt-6">
            <button
              onClick={handleSave}
              disabled={!name || !image}
              className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-base text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
