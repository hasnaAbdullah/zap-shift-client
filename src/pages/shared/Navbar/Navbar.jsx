import { NavLink } from "react-router";
import Logo from "../Logo/Logo";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const [isShowMenu, setIsShowMenu] = useState(false);
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
      {user && (
        <>
          {" "}
          <li className="font-semibold text-[15px] text-black/60">
            {" "}
            <NavLink to="/send-parcel">Send Parcel</NavLink>
          </li>
          <li className="font-semibold text-[15px] text-black/60">
            {" "}
            <NavLink to="/be-rider">Be a Rider</NavLink>
          </li>
          <li className="font-semibold text-[15px] text-black/60">
            {" "}
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    window.onclick = (event) => {
      if (!event.target.matches(".menu-btn")) {
        setIsShowMenu(false);
      }
    };

    if (document.getElementsByClassName("modal_menu")[0]) {
      document.getElementsByClassName("modal_menu")[0].onclick = (event) =>
        event.stopPropagation();
    }
  }, [isShowMenu]);

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
        <div className="navbar-center hidden lg:flex relative">
          <ul className="middle-links flex gap-5 px-1">{links}</ul>
          <button
            onClick={() => setIsShowMenu(!isShowMenu)}
            className="btn menu-btn"
          >
            menu
          </button>
          {isShowMenu && (
            <ul className="modal_menu absolute right-0 shadow-md space-y-2 top-14 w-54 z-50 bg-slate-200 p-6 rounded-xl">
              {links}
            </ul>
          )}
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL}
                className="w-10 h-10 rounded-full object-cover"
              />
              <button onClick={handleLogout} className="btn bg-primaryColor">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <NavLink to="/login" className="btn border-primaryColor">
                Sign In
              </NavLink>
              <NavLink to="/account" className="btn bg-primaryColor">
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
