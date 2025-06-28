import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router";
import GoogleIcon from "../../shared/icons/GoogleIcon";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto xl:mx-0 bg-white px-3 md:px-5 lg:p-8 py-10 space-y-3 rounded-xl"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Welcome Back
        </h1>
        <p className="mb-12 font-medium">Login With Profast</p>
        <fieldset className="fieldset">
          <label className="font-medium text-base">Email</label>
          <input
            type="text"
            className="input w-full"
            placeholder="your mail... "
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500" role="alert">
              Email is required
            </p>
          )}
        </fieldset>
        <fieldset className="fieldset ">
          <label className="font-medium text-base">Password</label>
          <input
            type="text"
            className="input w-full"
            placeholder="your password..."
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password?.type === "required" ? (
            <p className="text-red-500" role="alert">
              password is required
            </p>
          ) : (
            <p className="text-red-500" role="alert">
              password should be at least 6 character or longer
            </p>
          )}
          <div>
            <NavLink
              to="/change-password"
              className="underline text-gray-700 font-medium text-[15px]"
            >
              Forget Password
            </NavLink>
          </div>
        </fieldset>
        <div>
          <fieldset className="fieldset">
            <button className="py-2 rounded-md text-base px-2 text-white font-semibold text-left bg-primaryColor">
              Continue
            </button>
            <div>
              <p className=" text-gray-700 font-medium text-[17px]">
                Don't have an account?{" "}
                <Link to="/account" className="text-lime-500 hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </fieldset>

          <div className="text-center py-4 text-gray-500 font-bold">OR</div>
          <div>
            <button className="btn border-none bg-gray-300/50 w-full  text-black border-[#e5e5e5]">
              <GoogleIcon />
              Login with Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Login;
