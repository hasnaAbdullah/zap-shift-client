import { Link, Outlet } from "react-router";
import Logo from "../pages/shared/Logo/Logo";
import {
  FaHome,
  FaBoxOpen,
  FaHistory,
  FaMapMarkerAlt,
  FaUserCircle,
  FaUserCheck,
  FaUserClock,
} from "react-icons/fa";

function DashboardLayout() {
  return (
    <div>
      <div className="drawer  lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar px-0 bg-base-300 w-full lg:hidden">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square px-0 btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className=" flex-1 ">Dashboard</div>
          </div>
          {/* Page content here */}

          <Outlet />
        </div>

        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-sky-100 max-w-[280px] text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <Logo />

            <li className="text-base font-semibold border-b-2 border-gray-300/70 mt-5">
              <Link to="/" className="flex items-center gap-3">
                <FaHome />
                Home
              </Link>
            </li>

            <li className="text-base font-semibold border-b-2 border-gray-300/70">
              <Link
                to="/dashboard/my-parcels"
                className="flex items-center gap-3"
              >
                <FaBoxOpen />
                My Parcels
              </Link>
            </li>

            <li className="text-base font-semibold border-b-2 border-gray-300/70">
              <Link
                to="/dashboard/payment-history"
                className="flex items-center gap-3"
              >
                <FaHistory />
                Payment History
              </Link>
            </li>

            <li className="text-base font-semibold border-b-2 border-gray-300/70">
              <Link
                to="/dashboard/track-parcel"
                className="flex items-center gap-3"
              >
                <FaMapMarkerAlt />
                Track Parcel
              </Link>
            </li>

            <li className="text-base font-semibold border-b-2 border-gray-300/70">
              <Link to="/dashboard/profile" className="flex items-center gap-3">
                <FaUserCircle />
                Update Profile
              </Link>
            </li>

            {/* 🔽 New Links Added Below */}
            <li className="text-base font-semibold border-b-2 border-gray-300/70">
              <Link
                to="/dashboard/active-riders"
                className="flex items-center gap-3"
              >
                <FaUserCheck />
                Active Riders
              </Link>
            </li>

            <li className="text-base font-semibold border-b-2 border-gray-300/70">
              <Link
                to="/dashboard/pending-riders"
                className="flex items-center gap-3"
              >
                <FaUserClock />
                Pending Riders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default DashboardLayout;
