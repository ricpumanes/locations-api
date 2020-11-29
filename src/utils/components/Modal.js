import React from "react";
import ReactModal from "react-modal";
import { FaTimes } from "react-icons/fa";

if (process.env.NODE_ENV !== "test") ReactModal.setAppElement("#root");

const Modal = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: "80%",
    },
    overlay: {
      zIndex: 20,
    },
  };

  const {
    isOpen,
    onRequestClose,
    children,
    dataTestId,
    modalClassName,
    className,
    showCloseButton = true,
    width,
    maxHeight,
    ...rest
  } = props;

  if (width) customStyles.content.width = width;
  if (maxHeight) customStyles.content.maxHeight = maxHeight;

  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onRequestClose}
      testId={dataTestId}
      className={modalClassName}
      portalClassName={className}
      ariaHideApp={false}
      {...rest}
    >
      {showCloseButton && (
        <div className="modal-close-btn" style={{ textAlign: "right" }}>
          <FaTimes onClick={onRequestClose} />
        </div>
      )}
      {children}
    </ReactModal>
  );
};

export default Modal;
