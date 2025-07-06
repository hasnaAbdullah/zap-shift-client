import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router";
import GoogleIcon from "../../shared/icons/GoogleIcon";
import useAuth from "../../../hooks/useAuth";
import { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
import SocialLogin from "../SocialLogin/SocialLogin";

function Account() {
  const { setUser, createUser, updateUserProfile, setLoading } = useAuth();
  const navigate = useNavigate();
  // upload image functionality
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(errors);
    createUser(data?.email, data?.password)
      .then(async (res) => {
        // take entry for new user in database
        const userInfo = {
          name: data?.name,
          email: data?.email,
          photo: preview,
          role: "user", // be default role will be user
          createdAt: new Date().toISOString(),
          last_log_in: new Date(
            Number(res.user.metadata.lastLoginAt)
          ).toISOString(),
        };
        // console.log(userInfo);
        // console.log(res);
        const usersRes = await axiosInstance.post("/users", userInfo);
        console.log(usersRes);

        updateUserProfile(data?.name, preview).then(() => {
          setUser({ ...res.user, displayName: data?.name, photoURL: preview });
          setLoading(false);
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreview(URL.createObjectURL(image));
      const formData = new FormData();
      formData.append("image", image);
      const uploadImageUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;

      const axiosRes = await axios.post(uploadImageUrl, formData);
      console.log(axiosRes.data.data.url);
    }
  };
  // upload image functionality end here
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
          <div className="relative w-15 h-15">
            {/* Rounded image or icon */}
            <div
              onClick={handleClick}
              className="w-full h-full rounded-full cursor-pointer overflow-hidden border-2 border-gray-300 shadow-sm"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-scale-down"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <FaUserCircle className="text-7xl text-gray-400" />
                </div>
              )}
            </div>

            {/* Upload icon in bottom-right */}
            <div
              onClick={handleClick}
              className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 p-1 rounded-full text-white cursor-pointer shadow"
            >
              <MdPhotoCamera size={16} />
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>
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
          <SocialLogin />
        </div>
      </form>
    </div>
  );
}
export default Account;
