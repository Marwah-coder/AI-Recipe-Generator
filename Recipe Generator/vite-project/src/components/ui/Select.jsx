"use client";

const Select = ({ children, value, onChange, className = "", ...props }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
