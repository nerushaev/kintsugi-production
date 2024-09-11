import { useState, useCallback } from 'react';

function useModal(open = false) {
  const [isModalOpen, setIsModalOpen] = useState(open);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const toggleModal = useCallback(() => setIsModalOpen(state => !state), []);

  return { isModalOpen, openModal, closeModal, toggleModal };
}

export default useModal;
