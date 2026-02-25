import React,{useId,forwardRef} from 'react'

const Input = forwardRef(function Input({
    label,
    type = "text",
    className="",
    ...props

},ref){
    const id = useId()

    return(
        <div className='w-full'>
            {label && <label htmlFor={id} className='inline-block mb-1 pl-1 text-sm font-medium '>{label}</label>}
            <input
                id={id}
                ref={ref}
                type={type}
                className={`w-full rounded-md border border-gray-200 px-4 py-3 text-sm font-medium outline-none ${className}`}
                {...props}
            />
        </div>
            

    )
})

export default Input
