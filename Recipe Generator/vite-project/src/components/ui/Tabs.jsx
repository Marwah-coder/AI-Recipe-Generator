"use client";

import React from "react";

const Tabs = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="space-y-6">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, onTabChange })
      )}
    </div>
  );
};

const TabsList = ({ children, className = "", activeTab, onTabChange }) => {
  return (
    <div
      className={`flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 ${className}`}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, onTabChange })
      )}
    </div>
  );
};

const TabsTrigger = ({
  children,
  value,
  className = "",
  activeTab,
  onTabChange,
}) => {
  const isActive = activeTab === value;

  return (
    <button
      className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      } ${className}`}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value, className = "", activeTab }) => {
  if (activeTab !== value) return null;

  return <div className={className}>{children}</div>;
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
