import Hero from "@/components/Hero";
import Image from "next/image";
import { Chicle } from "next/font/google";
import Header from "@/components/Header";
import ShoppingCart from "@/components/ShoppingCart";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Register from "./register/page";
import Modal from "@/components/Modal";

const inter = Chicle({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className="">
      <Header />
      {/* <Register /> */}
      <Hero />
      <About />
      <Footer />
    </main>
  );
}
