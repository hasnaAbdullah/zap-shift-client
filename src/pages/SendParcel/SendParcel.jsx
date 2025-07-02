import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea.jsx";
import totalCostCalculator from "../utils/totalCostCalculator.js";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { parcelType: "document" } });

  const districtData = useLoaderData();
  const { user } = useAuth();

  const getUniqueRegions = () => {
    const regions = districtData.map((d) => d.region);
    return [...new Set(regions)];
  };

  const getServiceCenters = (region) => {
    if (!region) return [];
    const areas = districtData
      .filter((d) => d.region === region)
      .flatMap((d) => d.covered_area);
    return [...new Set(areas)];
  };

  const parcelType = watch("parcelType");
  const senderRegion = watch("sender.region");
  const receiverRegion = watch("receiver.region");

  const senderCenters = getServiceCenters(senderRegion);
  const receiverCenters = getServiceCenters(receiverRegion);

  const uniqueRegions = getUniqueRegions();

  const onSubmit = (data) => {
    const { parcelType, weight = 0, sender, receiver } = data;
    const isWithinCity =
      sender.region?.trim().toLowerCase() ===
      receiver.region?.trim().toLowerCase();

    const { baseCost, extraCost, costNote, zone, total, wt } =
      totalCostCalculator(weight, isWithinCity, parcelType);
    const breakdownHtml = `
      <div style="text-align: left; font-size: 16px;">
        <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Delivery Cost Breakdown</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td><strong>Parcel Type:</strong></td><td>${
            parcelType === "document" ? "Document" : "Non-Document"
          }</td></tr>
          ${
            parcelType === "non-document"
              ? `<tr><td><strong>Weight:</strong></td><td>${wt} kg</td></tr>`
              : ""
          }
          <tr><td><strong>Delivery Zone:</strong></td><td>${zone}</td></tr>
          <tr><td><strong>Base Cost:</strong></td><td>৳${baseCost}</td></tr>
          ${
            extraCost > 0
              ? `<tr><td><strong>Extra Charges:</strong></td><td>৳${extraCost}</td></tr>`
              : ""
          }
          <tr style="border-top: 1px solid #ccc;"><td><strong>Total Delivery Cost:</strong></td><td><strong>৳${total}</strong></td></tr>
        </table>
        <p style="margin-top: 10px; font-style: italic; color: #444;">${costNote}</p>
      </div>`;

    Swal.fire({
      title: "Review Delivery Cost",
      html: breakdownHtml,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "✅ Proceed to Payment",
      cancelButtonText: "✏️ Continue Edit",
    }).then((result) => {
      if (result.isConfirmed) {
        const generateTrackingId = () => {
          const date = new Date();
          const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
          const random = Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase();
          return `TRK-${dateStr}-${random}`;
        };

        const trackingId = generateTrackingId();
        const finalData = {
          ...data,
          createdBy: user?.email,
          createdAt: new Date().toISOString(),
          payment_status: "unpaid",
          delivery_status: "not_collected",
          deliveryCost: total,
          trackingId,
        };

        console.log("✅ Final Data to send to DB:", finalData);
        Swal.fire("Submitted!", "Your parcel has been confirmed.", "success");
        // submit finalData to database here
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-xl my-16 max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-8 text-black">
        Enter Your Parcel Details
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" value="document" {...register("parcelType")} />{" "}
            Document
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType")}
            />{" "}
            Non-Document
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormInput
            label="Parcel Title"
            name="parcelTitle"
            register={register}
            placeholder="Enter parcel title"
            required
          />
          {parcelType === "non-document" && (
            <FormInput
              label="Weight (kg)"
              name="weight"
              type="number"
              register={register}
              placeholder="Enter weight"
              required
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sender Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">
              Sender Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormInput
                label="Sender Name"
                name="sender.name"
                register={register}
                placeholder="Sender name"
                required
              />
              <FormInput
                label="Contact"
                name="sender.contact"
                register={register}
                placeholder="Sender contact"
                required
              />
              <FormInput
                label="Address"
                name="sender.address"
                register={register}
                placeholder="Sender address"
                required
              />
              <FormSelect
                label="Select Region"
                name="sender.region"
                register={register}
                options={uniqueRegions}
                required
              />
            </div>
            <FormSelect
              label="Select Service Center"
              name="sender.serviceCenter"
              register={register}
              options={senderCenters}
              required
            />
            <FormTextarea
              label="Pickup Instruction"
              name="sender.instruction"
              register={register}
            />
          </div>

          {/* Receiver Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">
              Receiver Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormInput
                label="Receiver Name"
                name="receiver.name"
                register={register}
                placeholder="Receiver name"
                required
              />
              <FormInput
                label="Contact"
                name="receiver.contact"
                register={register}
                placeholder="Receiver contact"
                required
              />
              <FormInput
                label="Address"
                name="receiver.address"
                register={register}
                placeholder="Receiver address"
                required
              />
              <FormSelect
                label="Select Region"
                name="receiver.region"
                register={register}
                options={uniqueRegions}
                required
              />
            </div>
            <FormSelect
              label="Select Service Center"
              name="receiver.serviceCenter"
              register={register}
              options={receiverCenters}
              required
            />
            <FormTextarea
              label="Delivery Instruction"
              name="receiver.instruction"
              register={register}
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="bg-[#CAEB66] text-black font-semibold px-6 py-2 rounded-lg hover:bg-[#bde856] transition-all"
          >
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
