import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { StarIcon, CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Feedback } from '../../context/FeedbackContext';

interface FeedbackDetailsModalProps {
  feedback: Feedback;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'resolved' | 'unresolved') => void;
  onAddNote: (id: string, note: string) => void;
}

const FeedbackDetailsModal: React.FC<FeedbackDetailsModalProps> = ({
  feedback,
  isOpen,
  onClose,
  onUpdateStatus,
  onAddNote,
}) => {
  const [newNote, setNewNote] = useState('');

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(feedback.id, newNote.trim());
      setNewNote('');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Feedback Details
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Rating and Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <StarIcon className="h-6 w-6 text-yellow-400" />
                      <span className="ml-2 text-lg font-medium text-gray-900">{feedback.rating}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        feedback.status === 'resolved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {feedback.status === 'resolved' ? (
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <XCircleIcon className="h-4 w-4 mr-1" />
                        )}
                        {feedback.status === 'unresolved' ? 'pending' : feedback.status}
                      </span>
                      <button
                        onClick={() => onUpdateStatus(feedback.id, feedback.status === 'resolved' ? 'unresolved' : 'resolved')}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-milea hover:bg-milea-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-milea"
                      >
                        {feedback.status === 'resolved' ? 'Mark as Pending' : 'Mark as Resolved'}
                      </button>
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Comment</h4>
                    <p className="mt-1 text-sm text-gray-900">{feedback.comment}</p>
                  </div>

                  {/* Tags */}
                  {feedback.tags && feedback.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Tags</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {feedback.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-milea/10 text-milea"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes Section */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                    <div className="mt-2 space-y-2">
                      {feedback.notes?.map((note, index) => (
                        <div key={index} className="bg-gray-50 rounded-md p-3">
                          <p className="text-sm text-gray-900">{note}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(feedback.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSubmitNote} className="mt-4">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add a note..."
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-milea focus:ring-milea sm:text-sm"
                        />
                        <button
                          type="submit"
                          disabled={!newNote.trim()}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-milea hover:bg-milea-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-milea disabled:opacity-50"
                        >
                          Add Note
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FeedbackDetailsModal; 