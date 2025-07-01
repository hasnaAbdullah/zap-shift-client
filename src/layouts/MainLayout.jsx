import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import Loader from "../pages/shared/Loader/Loader";

function MainLayout() {
  const { loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-[1450px]  mx-auto">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default MainLayout;
