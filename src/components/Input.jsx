import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef(function ({
    label,
    type = 'text',
    classname = '',
    ...props
}, ref) {
    const id = useId()
    return (
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                <input
                    type={type}
                    id={id}
                    ref={ref}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${classname}`}
                    {...props}
                />
            </label>}
        </div>
    )
})

export default Input