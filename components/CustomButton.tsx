
import React from 'react';
import Image from "next/image";
import { CustomButtonProps } from '@/types';

const CustomButton = () => {
  return (
    
<section>
<a
  className="inline-flex items-center gap-2 rounded border border-primary bg-primary px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
  href="/download"
>
  <span className="text-sm font-medium"> Download </span>

  <svg
    className="h-5 w-5 rtl:rotate-180"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
</a>

</section>
  )
}

export default CustomButton