"use client";
import React from "react";
// import type { NavbarProps } from "@material-tailwind/react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginDialog from "./LoginDialog";
import Popup from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";
import CartDialog from "./CartDialog";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Menu", href: "/categories", current: false },
  { name: "About", href: "/", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  return (
    <Disclosure as="nav" className="bg-destructive bg-opacity-70 shadow-sm rounded-3xl mx-72 mt-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item?.href}
                        className={classNames(
                          item.current
                            ? "bg-footer text-white hover:bg-secondary font-chicle text-xl"
                            : "text-white hover:text-secondary font-chicle text-xl",
                          "button-hover rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    
                      <Popup button={true} />
                      <SignUpDialog button={true} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    {/* <div className="relative flex text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">

                      <a href="/shoppingcart" className="button-hover">
                        <img
                          className=" h-8 w-8 "
                          src="/shoppingcart.png"
                          alt="Cart"
                        />
                      </a>
                    </div> */}
                    <CartDialog link={false}  />
                  </div>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};
export default Header;
