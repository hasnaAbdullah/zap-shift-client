import { Outlet } from "react-router";
import Logo from "../pages/shared/Logo/Logo";
import authImg from "../assets/authImage.png";

function AuthLayout() {
  return (
    <div className="w-full min-h-screen  bg-white">
      <div className="max-w-[1480px] mx-auto px-3">
        <div className="py-8 xl:hidden ">
          <Logo />
        </div>

        <div className="xl:flex xl:flex-row-reverse xl:justify-center  xl:gap-x-40 min-h-screen ">
          <div className="bg-lime-50   py-10 xl:w-1/2 xl:pt-40">
            <img className="object-contain" src={authImg} alt="" />
          </div>

          <div className="xl:w-1/2">
            <div className="hidden xl:flex xl:py-7">
              <Logo />
            </div>
            <div className=" xl:px-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AuthLayout;
