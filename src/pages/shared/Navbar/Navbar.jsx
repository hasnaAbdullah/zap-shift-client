import { NavLink } from "react-router";
import Logo from "../Logo/Logo";

function Navbar() {
  const links = (
    <>
      <li className="font-semibold text-[15px] text-black/60">
        {" "}
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-semibold text-[15px] text-black/60">
        {" "}
        <NavLink to="/services">Services</NavLink>
      </li>
      <li className="font-semibold text-[15px] text-black/60">
        {" "}
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li className="font-semibold text-[15px] text-black/60">
        {" "}
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li className="font-semibold text-[15px] text-black/60">
        {" "}
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li className="font-semibold text-[15px] text-black/60">
        {" "}
        <NavLink to="/be-rider">Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <div className=" bg-white shadow-sm">
      <div className="max-w-[1450px] mx-auto navbar p-0 bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost p-0 px-1 m-0 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="middle-links flex gap-5 px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Sign In</a>
          <a className="btn">Be a Rider</a>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
