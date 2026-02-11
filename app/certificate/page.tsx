import { CertificateGenerator } from "@/components/CertificateGenerator";

export default function CertificatePage() {
  return (
    <div className="space-y-8 py-12">
      <h1 className="text-center text-3xl font-bold uppercase tracking-[0.3em] text-black">
        Certificate Dispatch
      </h1>
      <CertificateGenerator />
    </div>
  );
}
