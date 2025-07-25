"use client";

const Badge = ({
  children,
  variant = "default",
  className = "",
  onClick,
  ...props
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    secondary: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    outline:
      "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        variants[variant]
      } ${onClick ? "cursor-pointer hover:opacity-80" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
