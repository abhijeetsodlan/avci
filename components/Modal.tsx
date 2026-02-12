"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
    >
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-black">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-gray-500 transition hover:text-black"
          >
            Close
          </button>
        </div>
        <div className="mt-6 space-y-4 text-sm text-gray-700">{children}</div>
        {footer && (
          <div className="mt-6 border-t border-[#E5E7EB] pt-4 text-sm text-gray-600">{footer}</div>
        )}
      </div>
    </div>
  );
};
