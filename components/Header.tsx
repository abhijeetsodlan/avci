import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/notice-board", label: "Notice Board" },
    { href: "/dard", label: "Dard Ki Deewar" },
    { href: "/certificate", label: "Get Certificate" },
    { href: "/helpline", label: "Emotional Helpline" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E5E7EB] bg-white">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                src="/images/images.png"
                alt="Indian flag"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold leading-tight">
              Anti-Valentine Commission of India
            </p>
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              Recognized by the Ministry of Emotional Independence
            </p>
          </div>
        </div>

        <nav
          aria-label="Primary"
          className="flex w-full flex-nowrap justify-center gap-4 overflow-x-auto whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.3em]"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded border border-transparent px-3 py-2 text-black transition-[border-color,color] hover:border-[#FF9933]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
