"use client";

import { useState } from "react";

export default function Home() {
  const [hourlyWage, setHourlyWage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [workedMinutes, setWorkedMinutes] = useState<number | null>(null);

  const calcDiff = (start: string, end: string) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let diff = (eh * 60 + em) - (sh * 60 + sm);
    if (diff <= 0) diff += 24 * 60;
    return diff;
  };

  const handleTimeChange = (start: string, end: string) => {
    if (start && end) {
      const diff = calcDiff(start, end);
      setWorkedMinutes(diff);
    } else {
      setWorkedMinutes(null);
    }
    setResult(null);
  };

  const calculate = () => {
    const wage = parseFloat(hourlyWage);
    if (!wage || !startTime || !endTime) return;
    const diff = calcDiff(startTime, endTime);
    setWorkedMinutes(diff);
    setResult(Math.floor(wage * diff / 60));
  };

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}時間${m > 0 ? `${m}分` : ""}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)" }}>
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-8 w-full max-w-sm flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">時給計算</h1>

        <label className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-300">
          時給（円）
          <input
            type="number"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(e.target.value)}
            placeholder="例: 1200"
            className="border rounded-lg px-3 py-2 text-zinc-800 dark:text-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <div className="flex gap-3">
          <label className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-300 flex-1">
            開始時刻
            <input
              type="time"
              value={startTime}
              onChange={(e) => { setStartTime(e.target.value); handleTimeChange(e.target.value, endTime); }}
              className="border rounded-lg px-3 py-2 text-zinc-800 dark:text-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-300 flex-1">
            終了時刻
            <input
              type="time"
              value={endTime}
              onChange={(e) => { setEndTime(e.target.value); handleTimeChange(startTime, e.target.value); }}
              className="border rounded-lg px-3 py-2 text-zinc-800 dark:text-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        <button
          onClick={calculate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 transition-colors"
        >
          計算する
        </button>

        {workedMinutes !== null && (
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">勤務時間: {formatDuration(workedMinutes)}</p>
            {result !== null && (
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">給与: {result.toLocaleString()} 円</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
