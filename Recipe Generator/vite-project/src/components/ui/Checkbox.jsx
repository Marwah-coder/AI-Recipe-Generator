"use client";

import { Check } from "lucide-react";

const Checkbox = ({ checked, onChange, id, className = "", ...props }) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
        {...props}
      />
      <div
        className={`w-4 h-4 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center transition-colors ${
          checked
            ? "bg-orange-500 border-orange-500"
            : "bg-white dark:bg-gray-700"
        } ${className}`}
        onClick={() => onChange(!checked)}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
    </div>
  );
};

export default Checkbox;
