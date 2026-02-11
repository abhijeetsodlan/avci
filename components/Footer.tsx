import Image from "next/image";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.2em] text-[#1f1f1f] md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-base font-semibold text-black">
              एंटी-वैलेंटाइन आयोग, भारत
            </p>
            <p className="text-[11px] text-black">
              भावनात्मक आत्मनिर्भरता मंत्रालय द्वारा मान्यता प्राप्त
            </p>
          </div>
          <a
            href="https://abhijeethere.netlify.app"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-[#FF9933] transition hover:text-[#cc5900] md:text-sm"
          >
            <Image
              src="https://pbs.twimg.com/profile_images/1917982995052691456/SmbTOeLq_400x400.jpg"
              alt="Abhijeet"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border border-[#FF9933] object-cover"
              priority
            />
            <span className="text-[10px] tracking-normal md:text-[11px]">
              निर्मित एवं विकसित:
              <br />
              अभिजीत सोडलन – गर्वित सिंगल
            </span>
          </a>
        </div>
        <div className="mt-6 space-y-3 text-center text-[11px] text-black">
          <p className="text-[11px] uppercase tracking-[0.3em]">
            © {CURRENT_YEAR} | सभी भावनात्मक अधिकार सुरक्षित
          </p>
          <p className="uppercase tracking-[0.15em] text-[#FF9933] font-serif font-semibold text-sm">
            यह वेबसाइट केवल व्यंग्य एवं मनोरंजन के उद्देश्य से बनाई गई है।
          </p>
        </div>
      </div>
    </footer>
  );
};
