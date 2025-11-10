import React from "react";

export const Checkbox = ({
  checked = false,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer ${className}`}
      {...props}
    />
  );
};
