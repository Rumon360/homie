"use client";

import { Minus, Plus } from "lucide-react";
import { FC, useCallback } from "react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col text-sm">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="w-6 h-6 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <Minus className="text-neutral-600" size={16} />
        </div>
        <div className="text-sm font-semibold text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className="w-6 h-6 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <Plus className="text-neutral-600" size={16} />
        </div>
      </div>
    </div>
  );
};

export default Counter;
