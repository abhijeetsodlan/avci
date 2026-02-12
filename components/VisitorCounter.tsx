"use client";

import { useEffect, useState } from "react";

export const VisitorCounter = () => {
  const [count, setCount] = useState(1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-sm uppercase tracking-[0.4em] text-[#555]">
      <p className="text-[13px]">Total Citizens Protected</p>
      <p className="text-3xl font-bold text-[#FF9933]">{count}</p>
    </div>
  );
};
