import React from "react";

export const Table = ({ children, className = "", ...props }) => {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className = "", ...props }) => {
  return (
    <thead className={`${className}`} {...props}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className = "", ...props }) => {
  return (
    <tbody className={`${className}`} {...props}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className = "", ...props }) => {
  return (
    <tr className={`${className}`} {...props}>
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className = "", ...props }) => {
  return (
    <th className={`px-4 py-3 text-left ${className}`} {...props}>
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = "", ...props }) => {
  return (
    <td className={`px-4 py-3 ${className}`} {...props}>
      {children}
    </td>
  );
};
