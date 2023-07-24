import React, { useRef, useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from "react-router-dom";
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const bodyRef = useRef(document.body);
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);
  const [modalProps, setModalProps] = useState({})

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalProps,
    setModalProps,
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  useEffect(() => {
    if(modalContent) {
      bodyRef.current.style.overflow = "hidden";
    } else {
      bodyRef.current.style.overflow = "";
    };
  }, [modalContent]);

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalProps, modalContent, closeModal } = useContext(ModalContext);
  
  const { vAlign = "middle" , hAlign = "center", className = "", id = ""} = modalProps;
  
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id={id} onClick={closeModal} />
      <div id="modal-content" className={`modal-content modal-content--${vAlign}-${hAlign} ${className}`}>
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);