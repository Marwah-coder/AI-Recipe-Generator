"use client";

const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  onKeyPress,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${className}`}
      {...props}
    />
  );
};

export default Input;
