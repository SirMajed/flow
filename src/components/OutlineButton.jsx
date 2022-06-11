import React from 'react'

const OutlineButton = ({text, onClick}) => {
  return (
    <button className="flex items-center justify-center rounded-md hover:bg-primaryHover hover:text-white transition px-2 py-[4px] bg-transparent text-primary border border-primary " onClick={onClick}>
        {text}
    </button>

  )
}

export default OutlineButton