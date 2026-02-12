"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Modal } from "./Modal";

type ModalStep = "gender" | "result";
type Gender = "male" | "female" | null;

const HINDI_TITLE = "\u0939\u093e\u0932 \u0939\u0940 \u092e\u0947\u0902 \u092c\u094d\u0930\u0947\u0915\u0905\u092a \u0939\u0941\u0906 \u0939\u0948?";
const HINDI_PROMPT = "\u0915\u0943\u092a\u092f\u093e \u0905\u092a\u0928\u093e \u0932\u093f\u0902\u0917 \u091a\u0941\u0928\u0947\u0902:";
const HINDI_MALE = "\u092a\u0941\u0930\u0941\u0937";
const HINDI_FEMALE = "\u092e\u0939\u093f\u0932\u093e";
const TOAST_MESSAGES = [
  "\u0906\u092a 12 \u092e\u093f\u0928\u091f \u0938\u0947 \u0938\u093f\u0902\u0917\u0932 \u0939\u0948\u0902\u0964 \u0906\u092f\u094b\u0917 \u0938\u0902\u0924\u0941\u0937\u094d\u091f \u0939\u0948\u0964",
  "Valentine Week Traffic Increased by 34%",
  "\u0906\u092a\u0915\u0947 \u0915\u094d\u0937\u0947\u0924\u094d\u0930 \u092e\u0947\u0902 3 \u0928\u090f \u0930\u093f\u0932\u0947\u0936\u0928\u0936\u093f\u092a \u092a\u0902\u091c\u0940\u0915\u0943\u0924 \u0939\u0941\u090f \u0939\u0948\u0902\u0964",
  "Instagram \u092a\u0930 'Couple Goals' \u0930\u0940\u0932\u094d\u0938 \u0915\u0940 \u0938\u0902\u0916\u094d\u092f\u093e \u092c\u0922\u093c \u0930\u0939\u0940 \u0939\u0948\u0964 \u0938\u0924\u0930\u094d\u0915 \u0930\u0939\u0947\u0902\u0964",
];

export const BreakupModalTrigger = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ModalStep>("gender");
  const [selectedGender, setSelectedGender] = useState<Gender>(null);
  const [toastIndex, setToastIndex] = useState(-1);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setToastIndex((previousIndex) => (previousIndex + 1) % TOAST_MESSAGES.length);
      setIsToastVisible(true);
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isToastVisible) return;
    const timeoutId = setTimeout(() => setIsToastVisible(false), 6000);
    return () => clearTimeout(timeoutId);
  }, [isToastVisible, toastIndex]);

  const openModal = () => {
    setIsOpen(true);
    setStep("gender");
    setSelectedGender(null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setStep("gender");
    setSelectedGender(null);
  };

  const handleGenderSelect = (gender: Exclude<Gender, null>) => {
    setSelectedGender(gender);
    setStep("result");
  };

  const handleCertificateRedirect = () => {
    closeModal();
    router.push("/certificate");
  };

  return (
    <>
      {toastIndex >= 0 && isToastVisible && (
        <div className="fixed right-4 top-4 z-[60] w-[92vw] max-w-md rounded-lg border-2 border-[#FF9933] bg-white shadow-lg md:right-6 md:top-6">
          <div className="rounded-t-md bg-[#FF9933] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
            AVCI Live Alert
          </div>
          <div className="px-4 py-3 text-sm font-semibold leading-relaxed text-[#1f2937]">
            {TOAST_MESSAGES[toastIndex]}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={openModal}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Had a Breakup Recently - Click Here
        </button>
        <Link
          href="/helpline"
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Emergency Helpline
        </Link>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {step === "gender" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-orange-600">{HINDI_TITLE}</h2>
            <p className="mt-2 text-center text-gray-700">{HINDI_PROMPT}</p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => handleGenderSelect("male")}
                className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
              >
                {HINDI_MALE}
              </button>
              <button
                type="button"
                onClick={() => handleGenderSelect("female")}
                className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
              >
                {HINDI_FEMALE}
              </button>
            </div>
          </div>
        )}

        {step === "result" && selectedGender && (
          <div className="space-y-4">
            <div className="mt-6 text-center text-gray-800 text-lg font-semibold">
              {selectedGender === "male"
                ? "She left you for someone else."
                : "He left you for someone else."}
              <br />
              Game over, loser.
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleCertificateRedirect}
                className="bg-orange-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-orange-700 transition"
              >
                Get Your Single Certificate
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
