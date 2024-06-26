import React from 'react'

export default function ErrorMessage({ error }) {
  return (
    <div className='text-danger'>
      Error: {error}
    </div>
  )
}
