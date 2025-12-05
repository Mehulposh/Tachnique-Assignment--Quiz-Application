import React from 'react'
import AlertCircle from 'lucide-react'
const ErrorHandler = ({message}) => {
  return (
    <div className='bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
        <AlertCircle className='w-5 h-5 mr-2'/>
        {message}
    </div>
  )
}

export default ErrorHandler