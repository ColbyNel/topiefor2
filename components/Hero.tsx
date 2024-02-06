"use client";
import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import Link from "next/link";
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Popup from "./LoginDialog";
import ProductDialog from "./ProductDialog";
import SignUpDialog from "./SignUpDialog";


const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
            src="/croissant.jpg"
            alt="Nothing"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-50"
          />
      <div className="relative isolate px-6 pt-10 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          
          <div className="text-center">
            <h1 className="font-chicle text-4xl tracking-tight text-white sm:text-6xl">
              To Pie For
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              From sweet treats to savoury delights we have it all!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Popup button={true}/>
              <a href="/categories" className="button-hover text-sm font-semibold leading-6 text-white">
                Menu <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
        </div>
      </div>
    </div>
  )
};

export default Hero;
