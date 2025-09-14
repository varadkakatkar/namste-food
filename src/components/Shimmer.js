import React from 'react'

const Shimmer = () => {
  return (
    <div className='shimmer-container'>
        {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className='shimmer-card'>
              <div className='shimmer-content'>
                <div className='shimmer-image'></div>
                <div className='shimmer-text'>
                  <div className='shimmer-line shimmer-line-title'></div>
                  <div className='shimmer-line shimmer-line-subtitle'></div>
                  <div className='shimmer-line shimmer-line-small'></div>
                </div>
              </div>
            </div>
        ))}
    </div>
  )
}

export default Shimmer