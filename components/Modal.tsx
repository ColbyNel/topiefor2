"use client";
import {useSearchParams, usePathname} from "next/navigation";
import Link from "next/link";
import Login from "./login/Login";


function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();
  const modal2 = searchParams.get("modal2");
  return (
      <>
        {modal &&
          <dialog
              className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
              <Login />
          </dialog>
          }
          {/* {modal2 &&
          <dialog
              className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                <Product />
              </dialog>

          } */}
      </>
  );
}

export default Modal;
