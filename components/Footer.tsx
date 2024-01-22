import Link from "next/link";

const Footer = () => {
  return (
    <div id="section-footer" className="bg-primary">
      <div className="text-center py-5 justify-items-center md:justify-items-center ">
        <Link href="/" className="btn btn-link text-white hover:text-black px-4">
           Home 
        </Link>
        <span className="text-white">|</span>
        <Link href="/categories" className="btn btn-link text-white hover:text-black px-4">
           Menu 
        </Link>
        <span className="text-white">|</span>
        <Link href="/login" className="btn btn-link text-white hover:text-black px-4">
           Log In
        </Link>
        <p className="text-black py-2">Copyright © 2024, To Pie For Ltd. All Rights Reserved </p>
      </div>
    </div>
  );
};
export default Footer;
