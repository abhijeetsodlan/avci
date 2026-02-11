import { notices } from "@/lib/noticeData";

export const NoticeBoard = () => {
  return (
    <div className="space-y-6">
      {notices.map((notice) => (
        <article
          key={notice.id}
          className="rounded border border-[#E5E7EB] bg-white shadow-sm"
        >
          <div className="bg-[#FF9933] px-5 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-white">
            Official Circular
          </div>
          <div className="px-5 py-6 space-y-3">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              {notice.circularNo}
            </p>
            <h3 className="text-lg font-semibold text-black">{notice.subject}</h3>
            <p className="text-sm font-bold text-black">Status: {notice.status}</p>
            <p className="text-sm text-[#1f1f1f]">{notice.advisory}</p>
          </div>
        </article>
      ))}
    </div>
  );
};
