import React, { useId } from 'react'

function SelectComponent({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()
    return (
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(SelectComponent)