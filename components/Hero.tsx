"use client";
import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Popup from "./LoginDialog";
import ProductDialog from "./ProductDialog";
import SignUpDialog from "./SignUpDialog";
import Header from "./Header";

const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        src="/croissant.jpg"
        alt="Nothing"
        className="blur-sm absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-50"
      />
      <div className="-mt-32 item-hover">
        <Header />
      </div>
      <div className="relative isolate px-6 pt-10 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-9xl font-chicle tracking-tight p-5 text-transparent -mt-10 mb-5 bg-gradient-to-r from-primary to-red-500 inline-block bg-clip-text">
              To Pie For
            </h1>
            <div className="ml-6 font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-secondary to-50% to-slate-200">
              Home to SA's Best{" "}
              <span className="text-red-600 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                <ul className="block animate-text-slide text-left leading-tight [&_li]:block">
                  <li>Pies</li>
                  <li>Croissants</li>
                  <li>Cakes</li>
                  <li>Bread</li>
                  <li>Cookies</li>
                  <li aria-hidden="true">Pies</li>
                </ul>
              </span>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Popup button={true} />
              <a
                href="/categories"
                className="button-hover text-sm font-semibold leading-6 text-white"
              >
                Menu <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};

export default Hero;
