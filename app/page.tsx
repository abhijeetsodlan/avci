import Image from "next/image";
import Link from "next/link";
import { CountdownTimer } from "@/components/CountdownTimer";
import { BreakupModalTrigger } from "@/components/BreakupModalTrigger";
import { VisitorCounter } from "@/components/VisitorCounter";

export default function Home() {
  return (
    <div className="pb-12">
      <section>
        <div className="rounded border border-[#E5E7EB] bg-white shadow-sm">
          <div className="bg-[#FF9933] px-5 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-white">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <span className="text-sm font-bold uppercase tracking-[0.15em] leading-tight md:text-lg">
                प्रेम प्रदर्शन सप्ताह के समापन तक शेष समय:
              </span>
              <CountdownTimer inline />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 px-5 py-8 md:grid-cols-[0.9fr_1.4fr_0.9fr]">
            <div className="order-2 flex items-start justify-start md:order-1">
              <div className="w-full rounded border border-[#E5E7EB] bg-white p-2 shadow">
                <Image
                  src="/images/images.jfif"
                  width={500}
                  height={500}
                  alt="Satirical government seal"
                  className="h-[320px] w-full rounded object-cover"
                  priority
                />
                <div className="mt-2 space-y-1 text-center">
                 
                  <p className="text-sm font-semibold uppercase tracking-tight text-black font-serif">
                    नरेंद्र मोदी (सिंगल)
                  </p>
                  <p className="text-[10px] uppercase tracking-tight text-[#FF9933] font-serif">
                   अध्यक्ष, आत्मनिर्भर प्रेम प्रकोष्ठ
                  </p>
                   <p className="text-xs uppercase tracking-tight text-gray-500 font-serif">
                   Chairman, Self-Reliant Love Cell
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 flex flex-col items-center justify-center space-y-2 text-center md:order-2">
              <p className="text-2xl font-semibold uppercase tracking-tight leading-snug text-black md:text-3xl whitespace-nowrap font-serif">
                Hum Do Nahi.
              </p>
              <p className="text-2xl font-semibold uppercase tracking-tight leading-snug text-black md:text-3xl whitespace-nowrap font-serif">
                Hum Ek Hi Theek Hai
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#FF9933]">
                Atmanirbhar in Love Affairs
              </p>
              <div className="mt-6 flex flex-col items-center gap-4">
                <VisitorCounter />
                <Link
                  href="/certificate"
                  className="rounded border border-[#FF9933] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#FF9933] hover:text-white"
                >
                  Get Your Certificate
                </Link>
                <BreakupModalTrigger />
              </div>
            </div>

            <div className="order-3 flex items-end justify-end">
              <div className="w-full rounded border border-[#E5E7EB] bg-white p-2 shadow">
                <Image
                  src="/images/rahul.jfif"
                  width={500}
                  height={500}
                  alt="AVCI guardian"
                  className="h-[320px] w-full rounded object-cover"
                  priority
                />
                <div className="mt-2 space-y-1 text-center">
                  <p className="text-[12px] font-semibold uppercase tracking-tight text-black font-serif">
                    राहुल गांधी (सिंगल)  
                  </p>
                  <p className="text-[10px] uppercase tracking-tight text-[#FF9933] font-serif">
                     संयुक्त सचिव, अविवाहित कल्याण विभाग 
                  </p>
                  <p className="text-[10px] uppercase tracking-tight text-gray-500 font-serif">
                    Secretary, Department of Unmarried Welfare
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
