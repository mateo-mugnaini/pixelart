"use client";
import PixelArtPage from "@/app/pixelart/page";
import style from "./Navbar.module.css";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className={style.ContenedorGeneral}>
      <Link href="/">Home</Link>
      <Link href={"/pixelart"}>Pixel Art</Link>
    </div>
  );
};

export default Navbar;
