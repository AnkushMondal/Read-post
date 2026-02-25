import React, { useId, forwardRef } from "react";

const Select = forwardRef(function Select(
  {
    options = [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
    label,
    className = "",
    ...props
  },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-sm font-medium"
        >
          {label}
        </label>
      )}

      // The select element with options
      <select
        id={id}
        ref={ref}
        className={`w-full rounded-md border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = "Select";

export default Select;
