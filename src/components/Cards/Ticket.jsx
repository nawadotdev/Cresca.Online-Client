import React from 'react'
import { FaHeart } from 'react-icons/fa'

const Ticket = ({ image, title, description, price }) => {
  return (
    <div className="relative break-words rounded-lg border border-gray-200 dark:border-dark-600 flex flex-col overflow-hidden">
      <img 
        className="h-48 w-full object-cover object-center" 
        alt={title} 
        src={image} 
      />
      
      <div className="flex grow flex-col p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-primary">Oyun</span>
            <div className="w-px h-4 bg-gray-200"></div>
            <span className="text-xs text-gray-400">1 saat önce</span>
          </div>
          <span className="text-lg font-bold text-primary">{price} ₺</span>
        </div>

        <div className="pt-2">
          <h3 className="text-base font-medium text-gray-700 line-clamp-1">
            {title}
          </h3>
        </div>

        <p className="grow pt-2 text-sm text-gray-500 line-clamp-2">
          {description}
        </p>

        <div className="mt-3 flex justify-between items-center">
          <button className="btn bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm">
            Satın Al
          </button>
          
          <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
            <FaHeart className="text-sm" />
            <span className="text-sm">32</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Ticket
