import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router";
import GoogleIcon from "../../shared/icons/GoogleIcon";
import useAuth from "../../../hooks/useAuth";

function Account() {
  const { setUser, createUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // console.log(errors);
    createUser(data?.email, data?.password)
      .then((res) => {
        console.log(res.user);
        setUser(res.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto xl:mx-0 bg-white px-3 md:px-5 lg:p-8 py-10 space-y-3 rounded-xl"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Create an Account
        </h1>
        <p className="mb-12 font-medium ">Register With Profast</p>
        <fieldset className="fieldset">
          <label className="font-medium text-base">Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="your mail... "
            {...register("name", { required: true })}
          />
        </fieldset>

        <fieldset className="fieldset">
          <label className="font-medium text-base">Email</label>
          <input
            type="text"
            className="input w-full"
            placeholder="your mail... "
            {...register("email", { required: true })}
          />
        </fieldset>
        <fieldset className="fieldset ">
          <label className="font-medium text-base">Password</label>
          <input
            type="text"
            className="input w-full"
            placeholder="your password..."
            {...register("password", { required: true })}
          />
        </fieldset>
        <div>
          <fieldset className="fieldset">
            <button className="py-2 rounded-md text-base px-2 text-white font-semibold text-left bg-primaryColor">
              Continue
            </button>
            <div>
              <p className=" text-gray-700 font-medium text-[17px]">
                Already have an account?{" "}
                <Link to="/login" className="text-lime-500 hover:underline">
                  Login
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
export default Account;
