import React from 'react';

const MenuShimmer = () => {
  return (
    <div className='menu-shimmer-container'>
      {/* Restaurant info shimmer */}
      <div className='restaurant-info-shimmer'></div>
      
      {/* Menu section shimmer */}
      <div className='menu-items-shimmer'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='menu-item-shimmer'>
            <div className='item-details-shimmer'></div>
            <div className='item-price-shimmer'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuShimmer;
