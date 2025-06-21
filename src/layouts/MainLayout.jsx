import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1450px] mx-auto">
        <Outlet />
      </div>
      <div>{/* <Footer /> */}</div>
    </div>
  );
}
export default MainLayout;
