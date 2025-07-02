import Image from 'next/image';
import React from 'react'

interface propsType  {
    img: string;
    title: string;
    mainTitle: string;
    price: String;
}

const Slide:React.FC<propsType> = ({ img, title, mainTitle, price}) => {
  return (
    <div className='outline-none border-none relative '>
        <div className="absolute left-[30px] md:left-[70px] max-w-[250px] sm:max-w-[350px] top-[50%] -translate-y-[50%] space-y-2 lg:space-y-4 bg-[#ffffffa2] sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none">
        </div>
        <Image className='w-[100%] h-[300px] md:h-auto rounded-xl object-cover object-right md:object-left-bottom'
             src={img} 
             alt='banner'
             width="2000"
             height="2000"
             />
    </div>
  )
}

export default Slide