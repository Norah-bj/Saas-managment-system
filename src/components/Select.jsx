import React, { useState, useEffect } from "react";

export const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  const handleSelect = (val) => {
    setSelectedValue(val);
    if (onValueChange) onValueChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            selectedValue,
          });
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen,
            onSelect: handleSelect,
          });
        }
        return child;
      })}
    </div>
  );
};

export const SelectTrigger = ({
  children,
  onClick,
  selectedValue,
  className = ""
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (child.type === SelectValue) {
          return React.cloneElement(child, { selectedValue });
        }
        return child;
      })}
      <svg
        className="w-4 h-4 ml-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
};

export const SelectValue = ({ placeholder, selectedValue, className = "" }) => {
  return (
    <span className={className}>
      {selectedValue || placeholder}
    </span>
  );
};

export const SelectContent = ({ children, isOpen, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
      {React.Children.map(children, (child) => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, { onSelect });
        }
        return child;
      })}
    </div>
  );
};

export const SelectItem = ({ children, value, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(value)}
      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
    >
      {children}
    </div>
  );
};
