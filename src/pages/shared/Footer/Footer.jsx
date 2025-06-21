import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";

const links = (
  <>
    <li className="font-semibold text-[15px] text-white/40 hover:text-primaryColor hover:border-b-2 hover:border-primaryColor border-b-2 border-transparent duration-300">
      {" "}
      <NavLink to="/">Home</NavLink>
    </li>
    <li className="font-semibold text-[15px] text-white/40 hover:text-primaryColor hover:border-b-2 hover:border-primaryColor border-b-2 border-transparent duration-300">
      {" "}
      <NavLink to="/services">Services</NavLink>
    </li>
    <li className="font-semibold text-[15px] text-white/40 hover:text-primaryColor hover:border-b-2 hover:border-primaryColor border-b-2 border-transparent duration-300">
      {" "}
      <NavLink to="/coverage">Coverage</NavLink>
    </li>
    <li className="font-semibold text-[15px] text-white/40 hover:text-primaryColor hover:border-b-2 hover:border-primaryColor border-b-2 border-transparent duration-300">
      {" "}
      <NavLink to="/about">About Us</NavLink>
    </li>
    <li className="font-semibold text-[15px] text-white/40 hover:text-primaryColor hover:border-b-2 hover:border-primaryColor border-b-2 border-transparent duration-300">
      {" "}
      <NavLink to="/pricing">Pricing</NavLink>
    </li>
    <li className="font-semibold text-[15px] text-white/40 hover:text-primaryColor hover:border-b-2 hover:border-primaryColor border-b-2 border-transparent duration-300">
      {" "}
      <NavLink to="/be-rider">Be a Rider</NavLink>
    </li>
  </>
);
function Footer() {
  return (
    <footer className=" py-16 rounded-3xl px-4 bg-gray-950">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Logo */}
        <Logo footer="footer" />

        {/* Description */}
        <p className="text-gray-500 text-[15px] max-w-[800px] mx-auto">
          Zap Shift Resources is your one-stop hub for reliable parcel
          management tools, guides, and delivery solutions—empowering businesses
          across Bangladesh.
        </p>

        {/* Navigation Links */}
        <ul className="w-full flex flex-wrap justify-center gap-6 font-medium border-y-2 border-dashed border-gray-900 py-8 ">
          {links}
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="#"
            className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="text-white bg-sky-500 p-2 rounded-full hover:bg-sky-600 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="text-white bg-pink-500 p-2 rounded-full hover:bg-pink-600 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="text-white bg-blue-800 p-2 rounded-full hover:bg-blue-900 transition"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
