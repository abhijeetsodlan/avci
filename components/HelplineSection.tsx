"use client";

import { useEffect, useMemo, useState } from "react";
import { Modal } from "./Modal";

const emergencyList = [
  "आपके 5 से अधिक मित्र रिलेशनशिप में प्रवेश कर चुके हैं",
  "आपको “कब कर रहे हो शादी?” प्रश्न 3 बार से अधिक पूछा गया है",
  "आपने गलती से पुरानी चैट पढ़ ली है",
  "आपने “Just checking on you” मैसेज टाइप करके डिलीट किया है",
];

const helplineButtons = [
  {
    key: "report",
    icon: "🔴",
    label: "Cringe Exposure Report करें",
  },
  {
    key: "guide",
    icon: "🟠",
    label: "ब्रेकअप प्राथमिक उपचार गाइड खोलें",
  },
  {
    key: "pledge",
    icon: "🟢",
    label: "स्वतंत्रता प्रतिज्ञा दोहराएँ",
  },
];

const responseOptions = [
  {
    key: "stable",
    label: "🟢 स्थिर",
    description: "आप पूर्णतः नियंत्रित अवस्था में हैं। आयोग संतुष्ट है।",
  },
  {
    key: "slight",
    label: "🟡 हल्का विचलन",
    description: "सामान्य लक्षण पाए गए। मीम थेरेपी की सलाह दी जाती है।",
  },
  {
    key: "serious",
    label: "🟠 गंभीर अस्थिरता",
    description: "तत्काल ब्रेकअप प्राथमिक उपचार गाइड सक्रिय करें।",
  },
  {
    key: "ex",
    label: "🔴 एक्स की याद आ रही है",
    description: "आपातकालीन स्थिति घोषित। तुरंत “स्वतंत्रता प्रतिज्ञा” दोहराएँ।",
  },
];

const staticVotePercentages: Record<(typeof responseOptions)[number]["key"], number> = {
  stable: 16,
  slight: 21,
  serious: 27,
  ex: 36,
};

export const HelplineSection = () => {
  const [openModal, setOpenModal] = useState<null | (typeof helplineButtons)[number]["key"]>(null);
  const [selectedResponse, setSelectedResponse] = useState<null | (typeof responseOptions)[number]["key"]>(null);
  const [responseVisible, setResponseVisible] = useState(true);

  useEffect(() => {
    if (!selectedResponse) return;
    setResponseVisible(false);
    const timer = setTimeout(() => setResponseVisible(true), 80);
    return () => clearTimeout(timer);
  }, [selectedResponse]);

  const activeResponse = useMemo(
    () => responseOptions.find((option) => option.key === selectedResponse) ?? null,
    [selectedResponse]
  );

  return (
    <section className="space-y-10 py-12">
      <div className="space-y-3 border-b-4 border-[#FF9933] pb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-[0.3em] text-black md:text-4xl">
          राष्ट्रीय भावनात्मक आपातकालीन सहायता केंद्र
        </h1>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-600">
          Recognized by the Ministry of Emotional Independence
        </p>
      </div>

      <div className="space-y-4 rounded-md border border-[#E5E7EB] bg-[#f9fafb] p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.5em] text-[#FF9933]">
          2️⃣ SECTION 1 – Emergency Situations
        </p>
        <h2 className="text-lg font-bold text-black">⚠️ तुरंत सहायता की आवश्यकता कब है?</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <p className="text-gray-800">जब आप इन संकेतों में से किसी एक को महसूस करें:</p>
          <ul className="space-y-2 pl-4">
            {emergencyList.map((item) => (
              <li key={item} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.5em] text-[#FF9933]">
          3️⃣ SECTION 2 – Helpline Action Buttons
        </p>
        <h2 className="text-2xl font-bold text-black">📞 आपातकालीन सहायता विकल्प</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {helplineButtons.map((button) => (
            <button
              key={button.key}
              type="button"
              onClick={() => setOpenModal(button.key)}
              className="group flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-lg border border-[#FF9933] bg-white px-4 py-5 text-center text-base font-bold uppercase tracking-[0.2em] text-black transition duration-200 hover:-translate-y-0.5 hover:bg-[#FFb25c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9933] md:text-sm"
            >
              <span className="text-3xl">{button.icon}</span>
              <span>{button.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-md border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.5em] text-[#FF9933]">
          4️⃣ SECTION 3 – Emotional Damage Meter
        </p>
        <h2 className="text-xl font-bold text-black">📊 भावनात्मक क्षति मापक यंत्र</h2>
        <label className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
          अपनी स्थिति पर वोट करें
        </label>
        <div className="grid gap-3 md:grid-cols-2">
          {responseOptions.map((option) => {
            const percentage = staticVotePercentages[option.key];
            const isSelected = selectedResponse === option.key;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelectedResponse(option.key)}
                className={`rounded-lg border px-4 py-3 text-left transition duration-200 ${
                  isSelected
                    ? "border-[#FF9933] bg-[#fff7ed]"
                    : "border-[#E5E7EB] bg-white hover:border-[#FFB25C] hover:bg-[#fffaf4]"
                }`}
              >
                <p className="text-sm font-bold text-black">{option.label}</p>
                {selectedResponse ? (
                  <div className="mt-3 space-y-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#ffe4c7]">
                      <div
                        className="h-full rounded-full bg-[#FF9933] transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a3412]">
                      {percentage}% votes
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-gray-500">Tap to vote</p>
                )}
              </button>
            );
          })}
        </div>
        {activeResponse && (
          <div
            key={activeResponse.key}
            className="rounded-lg border border-[#FF9933] bg-[#fff7ed] px-4 py-3 text-sm text-[#b45309] transition-all duration-300"
            style={{ opacity: responseVisible ? 1 : 0 }}
          >
            {activeResponse.description}
          </div>
        )}
      </div>

      <Modal
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
        title={
          openModal === "report"
            ? "सार्वजनिक प्रेम प्रदर्शन रिपोर्ट प्रपत्र"
            : openModal === "guide"
            ? "ब्रेकअप प्राथमिक उपचार प्रोटोकॉल"
            : "एकल स्वतंत्रता शपथ"
        }
        footer={
          openModal === "report"
            ? "“Cringe सहनशीलता स्तर सफलतापूर्वक बनाए रखा गया।”"
            : openModal === "guide"
            ? "“आप आधिकारिक रूप से पुनर्प्राप्ति प्रक्रिया में हैं।”"
            : "“शपथ सफलतापूर्वक दर्ज की गई।”"
        }
      >
        {openModal === "report" && (
          <div className="space-y-4 text-sm leading-relaxed text-gray-800">
            <p>यदि आपने निम्नलिखित दृश्य देखे हैं:</p>
            <ul className="space-y-1 px-4">
              <li>पार्क में अत्यधिक हाथ पकड़ना</li>
              <li>कैफे में एक ही स्ट्रॉ से पीना</li>
              <li>इंस्टाग्राम पर “Couple Goals” रील्स</li>
            </ul>
            <p>तो आयोग को सूचित करना आपका कर्तव्य है।</p>
            <div className="space-y-2 rounded-lg border border-[#10b981]/60 bg-[#ecfdf3] px-4 py-3 text-sm text-[#047857]">
              <p className="font-semibold">स्थिति:</p>
              <ul className="space-y-1 text-sm text-[#065f46]">
                <li>✔ आपने मानसिक स्थिरता बनाए रखी है</li>
                <li>✔ आपने प्रतिक्रिया देने के बजाय स्क्रीन स्क्रोल किया</li>
              </ul>
            </div>
          </div>
        )}
        {openModal === "guide" && (
          <div className="space-y-4 text-sm leading-relaxed text-gray-800">
            <p>चरण 1: Instagram Reels तुरंत बंद करें</p>
            <p>चरण 2: Ex की चैट Archive करें</p>
            <p>चरण 3: Single Certificate पुनः डाउनलोड करें</p>
            <p>चरण 4: “Hum Ek Hi Theek” मंत्र तीन बार दोहराएँ</p>
            <div className="rounded-lg border border-[#FF9933]/60 bg-[#fff1e6] px-4 py-3 text-sm text-[#c2410c]">
              <p className="font-semibold">Recovery Advisory:</p>
              <ul className="space-y-1 text-sm text-[#9a3412]">
                <li>अनावश्यक late night overthinking से बचें</li>
                <li>“Last Seen” जांचने से परहेज करें</li>
                <li>आत्मनिर्भर मोड सक्रिय रखें</li>
              </ul>
            </div>
          </div>
        )}
        {openModal === "pledge" && (
          <div className="space-y-4 text-center text-gray-800">
            <p className="text-lg font-semibold leading-relaxed text-black">
              मैं, एक स्वाभिमानी एकल नागरिक, प्रतिज्ञा करता/करती हूँ कि:
            </p>
            <div className="space-y-2 text-base font-semibold text-[#1e1e1e]">
              <p>वैलेंटाइन प्रभाव से प्रभावित नहीं होऊँगा/हूँगी</p>
              <p>सार्वजनिक प्रेम प्रदर्शन पर अनावश्यक प्रतिक्रिया नहीं दूँगा/दूँगी</p>
              <p>आत्मनिर्भरता एवं मानसिक शांति बनाए रखूँगा/रखूँगी</p>
            </div>
            <p className="text-lg font-bold text-black">Hum Do Nahi. Hum Ek Hi Theek.</p>
          </div>
        )}
      </Modal>
    </section>
  );
};
