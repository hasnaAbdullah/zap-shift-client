import { Link, NavLink } from "react-router";

function ForgotPassword() {
  return (
    <div>
      <form className="max-w-lg mx-auto xl:mx-0 bg-white px-3 md:px-5 lg:p-8 py-10 space-y-3 rounded-xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Forgot Password
        </h1>
        <p className="mb-5 max-w-sm pr-10 font-medium">
          Enter your email address and we’ll send you a reset link.
        </p>

        <fieldset className="fieldset">
          <label className="font-medium text-base">Email</label>
          <input
            type="text"
            className="input w-full"
            placeholder="your mail... "
          />
        </fieldset>

        <div>
          <fieldset className="fieldset">
            <button className="py-2 rounded-md text-base px-2 text-white font-semibold text-left bg-primaryColor">
              Continue
            </button>
            <div>
              <p className=" text-gray-700 font-medium text-[17px]">
                Remember your password?{" "}
                <Link to="/login" className="text-lime-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  );
}
export default ForgotPassword;
