"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        {title && (
          <div className="pr-10">
            <h3 className="text-xl font-bold text-black">{title}</h3>
          </div>
        )}
        <div className={`${title ? "mt-6" : "mt-0"} space-y-4 text-sm text-gray-700`}>{children}</div>
        {footer && (
          <div className="mt-6 border-t border-[#E5E7EB] pt-4 text-sm text-gray-600">{footer}</div>
        )}
      </div>
    </div>
  );
};
