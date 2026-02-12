"use client";

import { useEffect, useState } from "react";

const COUNTER_START = 234;
const COUNTER_STEP = 10;
const COUNTER_INTERVAL_MS = 10 * 60 * 1000;
const COUNTER_STORAGE_KEY = "avci_visitor_counter_start_ts";

const getCountFromStart = (startTimestamp: number, nowTimestamp: number) => {
  const elapsed = Math.max(nowTimestamp - startTimestamp, 0);
  const steps = Math.floor(elapsed / COUNTER_INTERVAL_MS);
  return COUNTER_START + steps * COUNTER_STEP;
};

export const VisitorCounter = () => {
  const [count, setCount] = useState(COUNTER_START);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let startTimestamp = Number(window.localStorage.getItem(COUNTER_STORAGE_KEY));
    if (!Number.isFinite(startTimestamp) || startTimestamp <= 0) {
      startTimestamp = Date.now();
      window.localStorage.setItem(COUNTER_STORAGE_KEY, String(startTimestamp));
    }

    const tick = () => {
      setCount(getCountFromStart(startTimestamp, Date.now()));
    };
    tick();

    const remainder = (Date.now() - startTimestamp) % COUNTER_INTERVAL_MS;
    const timeoutMs = remainder === 0 ? COUNTER_INTERVAL_MS : COUNTER_INTERVAL_MS - remainder;
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      tick();
      intervalId = window.setInterval(tick, COUNTER_INTERVAL_MS);
    }, timeoutMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className="text-center text-sm uppercase tracking-[0.4em] text-[#555]">
      <p className="text-[13px]">Total Citizens Protected</p>
      <p className="text-3xl font-bold text-[#FF9933]">{count}</p>
    </div>
  );
};
