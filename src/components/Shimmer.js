import React from 'react'

const Shimmer = () => {
  return (
    <div className='shimmer-container'>
        {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className='shimmer-card'></div>
        ))}
    </div>
  )
}

export default Shimmer