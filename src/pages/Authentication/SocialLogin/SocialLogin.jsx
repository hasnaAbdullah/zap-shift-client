import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import GoogleIcon from "../../shared/icons/GoogleIcon";
import useAxios from "../../../hooks/useAxios";

function SocialLogin() {
  const { googleLogin } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handleGoogleLogin = () => {
    googleLogin().then(async (res) => {
      const user = res.user;
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photo: user.photoURL,
        role: "user", // be default role will be user
        createdAt: new Date().toISOString(),
        last_log_in: new Date(
          Number(res.user.metadata.lastLoginAt)
        ).toISOString(),
      };

      const usersRes = await axiosInstance.post("/users", userInfo);
      console.log(usersRes);
      navigate(state ? state : "/");
      console.log(res);
    });
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="btn border-none bg-gray-300/50 w-full  text-black border-[#e5e5e5]"
      >
        <GoogleIcon />
        Login with Google
      </button>
    </div>
  );
}
export default SocialLogin;
