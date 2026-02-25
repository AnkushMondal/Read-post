import React from 'react'

const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}

) => {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} ${className} inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
