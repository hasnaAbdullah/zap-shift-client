// BeARider.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const regionDistrictData = useLoaderData();
  const axiosInstance = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  const [regionOptions, setRegionOptions] = useState([]);
  const [districtMap, setDistrictMap] = useState({});
  const [districtOptions, setDistrictOptions] = useState([]);

  const selectedRegion = watch("region");

  useEffect(() => {
    const regionSet = new Set();
    const districtGroup = {};

    regionDistrictData.forEach((item) => {
      regionSet.add(item.region);
      if (!districtGroup[item.region]) {
        districtGroup[item.region] = new Set();
      }
      districtGroup[item.region].add(item.district);
    });

    const regionArray = Array.from(regionSet);
    setRegionOptions(regionArray);

    // Convert sets to arrays for select options
    const districtObj = {};
    for (const region in districtGroup) {
      districtObj[region] = Array.from(districtGroup[region]);
    }
    setDistrictMap(districtObj);
  }, []);

  useEffect(() => {
    if (selectedRegion && districtMap[selectedRegion]) {
      setDistrictOptions(districtMap[selectedRegion]);
    } else {
      setDistrictOptions([]);
    }
  }, [selectedRegion, districtMap]);

  const onSubmit = async (data) => {
    const riderInfo = {
      ...data,
      name: user.displayName,
      email: user.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    axiosInstance
      .post("/riders", riderInfo)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Application Submitted!",
            text: "Your rider request has been submitted successfully.",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Something went wrong. Please try again later.",
        });
      });
    console.log("Rider Form Data:", {
      ...data,
      name: user.displayName,
      email: user.email,
    });
    // handle submission to backend
  };

  return (
    <div className="max-w-2xl my-16 mx-auto p-4 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Become A Rider</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField label="Name" value={user?.displayName || ""} readOnly />

        <InputField label="Email" value={user?.email || ""} readOnly />
        <InputField label="Age" name="age" register={register} required />

        <InputField
          label="Phone Number"
          name="phone"
          register={register}
          required
          error={errors.phone}
        />

        <InputField
          label="National ID"
          name="nid"
          register={register}
          required
          error={errors.nid}
        />

        <InputField
          label="Bike Brand"
          name="bike_brand"
          register={register}
          required
          error={errors.bike_brand}
        />

        <InputField
          label="Bike Registration Number"
          name="bike_reg_number"
          register={register}
          required
          error={errors.bike_reg_number}
        />

        <SelectField
          label="Region"
          name="region"
          register={register}
          options={regionOptions}
          required
        />

        <SelectField
          label="Covered Area (District)"
          name="covered_area"
          register={register}
          options={districtOptions}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BeARider;
