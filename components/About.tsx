"use client";
import React, { useEffect, useRef, useState } from "react";
import SignUpDialog from "./SignUpDialog";
import LoginDialog from "./LoginDialog";
import Footer from "./Footer";

const links = [{ name: "Menu", href: "/categories" }];
const stats = [
  { name: "Delivery", value: "Same Day" },
  { name: "Years Baking Experience", value: "30" },
  { name: "Ingredients", value: "Highest Quality" },
];

const About = () => {
  return (
    <>
      <span className="bg-primary blur-xl w-screen h-10" />
      <div
        id="about"
        className="relative isolate overflow-hidden bg-gradient-to-tr from-primary to-white py-24 sm:py-32 -mb-36"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-wrap items-center">
          <div className="ml-10 mx-auto max-w-2xl lg:mx-0 w-full lg:w-auto lg:flex-1">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Our story... <br />
              so far
            </h2>
            <p className="mt-6 text-lg leading-8 text-white ">
              Many years ago in a land far far away (Boksburg) a student began
              baking in her spare time and selling to friends and family. By the
              end of her studies she had more requests than she could manage.
              She decided to open To Pie For. Mrs Pat Cake has continued to
              evolve her bakery with the times. Now offering home delivery, To
              Pie For has been able to satisfy customers from the comfort of
              their home. Providing high-quality baked goods that remind the
              enjoyer of grandma, of mom, of dad, of home has always been at the
              doughy center of To Pie For's mission and now you can enjoy the
              experience from the comfort of your home!
            </p>
          </div>
          <div className="w-full lg:w-auto lg:flex-1 lg:pl-12 drop-shadow-2xl">
            <img src="/baker.png" alt="Ms Pat" className="mx-auto lg:mx-0" />
          </div>
        </div>
        <div className="-ml-8">
        <div className="mx-16 mt-5 max-w-2xl lg:mx-0 lg:max-w-none ">
          <div className="ml-96 grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <LoginDialog button={true} />
            <SignUpDialog button={false} />
            {links.map((link) => (
              <a key={link.name} href={link.href} className="button-hover mt-2">
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 ml-96 pr-10 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-lg leading-7 text-secondary">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
};
export default About;
