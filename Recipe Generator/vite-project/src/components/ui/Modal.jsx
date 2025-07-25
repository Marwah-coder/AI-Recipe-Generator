"use client";

import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children, className = "" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 m-4 w-full ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
