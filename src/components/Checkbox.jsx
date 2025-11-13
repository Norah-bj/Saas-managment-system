import React from "react";

export const Checkbox = ({
  checked = false,
  onChange,
  onCheckedChange,
  className = "",
  ...props
}) => {
  const handleChange = (e) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    } else if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className={`w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer ${className}`}
      {...props}
    />
  );
};
