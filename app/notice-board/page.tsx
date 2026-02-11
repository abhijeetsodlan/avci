import { NoticeBoard } from "@/components/NoticeBoard";

export default function NoticeBoardPage() {
  return (
    <div className="space-y-8 py-12">
      <h1 className="text-center text-3xl font-bold uppercase tracking-[0.3em] text-black">
        Notice Board
      </h1>
      <section className="rounded border border-[#E5E7EB] bg-white shadow-sm">
        <div className="bg-[#FF9933] px-5 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-white">
          Official Circular Dispatch
        </div>
        <div className="p-5">
          <NoticeBoard />
        </div>
      </section>
    </div>
  );
}
