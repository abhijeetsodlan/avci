type ProtectedSectionProps = {
  title: string;
  id?: string;
  children: React.ReactNode;
};

export const ProtectedSection = ({ title, id, children }: ProtectedSectionProps) => {
  return (
    <section
      id={id}
      className="rounded border border-[#E5E7EB] bg-white shadow-sm"
    >
      <div className="bg-[#FF9933] px-5 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-white">
        {title}
      </div>
      <div className="px-5 py-6">{children}</div>
    </section>
  );
};
