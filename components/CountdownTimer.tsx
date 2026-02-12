"use client";

import { useEffect, useState } from "react";

const getTargetDate = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  let target = new Date(currentYear, 1, 14, 23, 59, 0);
  if (now >= target) {
    target = new Date(currentYear + 1, 1, 14, 23, 59, 0);
  }
  return target;
};

const calculateRemaining = (target: Date) => {
  const now = new Date();
  const diff = Math.max(target.getTime() - now.getTime(), 0);
  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return {
    total: diff,
    days,
    hours,
    minutes,
    seconds: secs,
  };
};

const twoDigits = (value: number) => String(value).padStart(2, "0");

type CountdownTimerProps = {
  inline?: boolean;
};

const InlineTimer = ({
  remainingDays,
  hours,
  minutes,
  seconds,
}: {
  remainingDays: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => (
  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-white md:text-sm">
    <div className="flex flex-col items-end">
      <span className="text-[10px] md:text-[12px]">DAYS</span>
      <span className="text-lg md:text-xl">{twoDigits(remainingDays)}</span>
    </div>
    <span>:</span>
    <div className="flex flex-col items-end">
      <span className="text-[10px] md:text-[12px]">HRS</span>
      <span className="text-lg md:text-xl">{twoDigits(hours)}</span>
    </div>
    <span>:</span>
    <div className="flex flex-col items-end">
      <span className="text-[10px] md:text-[12px]">MIN</span>
      <span className="text-lg md:text-xl">{twoDigits(minutes)}</span>
    </div>
    <span>:</span>
    <div className="flex flex-col items-end">
      <span className="text-[10px] md:text-[12px]">SEC</span>
      <span className="text-lg md:text-xl">{twoDigits(seconds)}</span>
    </div>
  </div>
);

export const CountdownTimer = ({ inline }: CountdownTimerProps) => {
  const [remaining, setRemaining] = useState({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = getTargetDate();
    const interval = setInterval(() => {
      setRemaining(calculateRemaining(target));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (inline) {
    return (
      <div className="flex justify-end">
        <InlineTimer
          remainingDays={remaining.days}
          hours={remaining.hours}
          minutes={remaining.minutes}
          seconds={remaining.seconds}
        />
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 text-2xl font-bold tracking-wide text-[#0a0a0a]">
        <div>
          <div className="text-sm tracking-[0.4em] text-[#555]">DAYS</div>
          <div>{twoDigits(remaining.days)}</div>
        </div>
        <div className="text-2xl">:</div>
        <div>
          <div className="text-sm tracking-[0.4em] text-[#555]">HOURS</div>
          <div>{twoDigits(remaining.hours)}</div>
        </div>
        <div className="text-2xl">:</div>
        <div>
          <div className="text-sm tracking-[0.4em] text-[#555]">MINUTES</div>
          <div>{twoDigits(remaining.minutes)}</div>
        </div>
        <div className="text-2xl">:</div>
        <div>
          <div className="text-sm tracking-[0.4em] text-[#555]">SECONDS</div>
          <div>{twoDigits(remaining.seconds)}</div>
        </div>
      </div>
    </div>
  );
};
