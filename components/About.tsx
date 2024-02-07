"use client";
import React from "react";
import SignUpDialog from "./SignUpDialog";
import LoginDialog from "./LoginDialog";

const links = [{ name: "Menu", href: "/categories" }];
const stats = [
  { name: "Delivery", value: "Same Day" },
  { name: "Years Baking Experience", value: "30" },
  { name: "Ingredients", value: "Highest Quality" },
];

const About = () => {
  return (
    <div
      id="about"
      className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32"
    >
      <img
        src="/about-image.jpg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-50"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Our Story... <br />
            so far
          </h2>
          <p className="mt-6 text-lg leading-8 text-white">
            Many years ago in a land far far away (Boksburg) a student began
            baking in her spare time and selling to friends and family. By the
            end of her studies she had more requests than she could manage. She
            decided to open To Pie For. Mrs Pat Cake has continued to evolve her
            bakery with the times. Now offering home delivery, To Pie For has
            been able to satisfy customers from the comfort of their home.
            Providing high-quality baked goods that reminds the enjoyer of
            grandma, of mom, of dad, of home has always been at the doughy
            center of To Pie For's mission and now you can enjoy the experience
            from the comfort of your home!
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <LoginDialog button={true} />
            <SignUpDialog button={false} />
            {links.map((link) => (
              <a key={link.name} href={link.href} className="button-hover mt-2">
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">
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
  );
};
export default About;
