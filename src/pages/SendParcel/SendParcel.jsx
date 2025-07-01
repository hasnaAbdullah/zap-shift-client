import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { parcelType: "document" },
  });
  const districtData = useLoaderData();
  const { user } = useAuth();
  // ইউনিক region বের করার ফাংশন
  const getUniqueRegions = () => {
    const regions = districtData.map((d) => d.region);
    return [...new Set(regions)];
  };

  // region অনুযায়ী সব covered_area নিয়ে আসার ফাংশন (ইউনিক)
  const getServiceCenters = (region) => {
    if (!region) return [];
    // region মিলিয়ে সব covered_area arrays নিয়ে আসি
    const areas = districtData
      .filter((d) => d.region === region)
      .flatMap((d) => d.covered_area);
    // ইউনিক করে রিটার্ন
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

    const wt = parseFloat(weight);
    let baseCost = 0;
    let extraCost = 0;
    let costNote = "";
    let zone = isWithinCity ? "Within City" : "Outside City";

    // === Cost Logic ===
    if (parcelType === "document") {
      baseCost = isWithinCity ? 60 : 80;
      costNote = `Flat rate for document delivery in ${zone}`;
    } else {
      if (wt <= 3) {
        baseCost = isWithinCity ? 110 : 150;
        costNote = `Flat rate for non-document (up to 3kg) in ${zone}`;
      } else {
        baseCost = isWithinCity ? 110 : 150;
        const extraKg = Math.ceil(wt - 3);
        extraCost = extraKg * 40 + (!isWithinCity ? 40 : 0);
        costNote = `Includes ৳40/kg for extra ${extraKg}kg ${
          !isWithinCity ? "and ৳40 extra for outside city delivery" : ""
        }`;
      }
    }

    const total = baseCost + extraCost;

    // === HTML Breakdown ===
    const breakdownHtml = `
    <div style="text-align: left; font-size: 16px;">
      <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Delivery Cost Breakdown</h3>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td><strong>Parcel Type:</strong></td>
          <td>${parcelType === "document" ? "Document" : "Non-Document"}</td>
        </tr>
        ${
          parcelType === "non-document"
            ? `<tr>
              <td><strong>Weight:</strong></td>
              <td>${wt} kg</td>
            </tr>`
            : ""
        }
        <tr>
          <td><strong>Delivery Zone:</strong></td>
          <td>${zone}</td>
        </tr>
        <tr>
          <td><strong>Base Cost:</strong></td>
          <td>৳${baseCost}</td>
        </tr>
        ${
          extraCost > 0
            ? `<tr>
                <td><strong>Extra Charges:</strong></td>
                <td>৳${extraCost}</td>
              </tr>`
            : ""
        }
        <tr style="border-top: 1px solid #ccc;">
          <td><strong>Total Delivery Cost:</strong></td>
          <td><strong>৳${total}</strong></td>
        </tr>
      </table>

      <p style="margin-top: 10px; font-style: italic; color: #444;">${costNote}</p>
    </div>
  `;

    // === SweetAlert Prompt ===
    Swal.fire({
      title: "Review Delivery Cost",
      html: breakdownHtml,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "✅ Proceed to Payment",
      cancelButtonText: "✏️ Continue Edit",
      customClass: {
        htmlContainer: "text-left",
      },
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
          trackingId,
          delivery_status: "not_collected",
          deliveryCost: total,
        };

        console.log("✅ Final Data to send to DB:", finalData);

        Swal.fire("Submitted!", "Your parcel has been confirmed.", "success");
        // here you can call API to submit finalData
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-xl my-16 max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-8 text-black">
        Enter Your Parcel Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Parcel Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("parcelType")}
              />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType")}
              />
              Non-Document
            </label>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-black">
                Parcel Title
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter parcel title"
                {...register("parcelTitle", { required: true })}
              />
            </div>

            {parcelType === "non-document" && (
              <div>
                <label className="block mb-1 text-sm font-medium text-black">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter weight"
                  {...register("weight", { required: true })}
                />
              </div>
            )}
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sender Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">
              Sender Information
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-black">
                  Sender Name
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Sender name"
                  {...register("sender.name", { required: true })}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-black">
                  Contact
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Sender contact"
                  {...register("sender.contact", { required: true })}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-black">
                  Address
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Sender address"
                  {...register("sender.address", { required: true })}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-black">
                  Select Region
                </label>
                <select className="input" {...register("sender.region")}>
                  <option value="">Select region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-black">
                Select Service Center
              </label>
              <select className="input" {...register("sender.serviceCenter")}>
                <option value="">Select service center</option>
                {senderCenters.map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-black">
                Pickup Instruction
              </label>
              <textarea
                className="input min-h-30"
                rows={3}
                placeholder="Optional instructions"
                {...register("sender.instruction")}
              />
            </div>
          </div>

          {/* Receiver Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">
              Receiver Information
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-black">
                  Receiver Name
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Receiver name"
                  {...register("receiver.name", { required: true })}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-black">
                  Contact
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Receiver contact"
                  {...register("receiver.contact", { required: true })}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-black">
                  Address
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Receiver address"
                  {...register("receiver.address", { required: true })}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-black">
                  Select Region
                </label>
                <select className="input" {...register("receiver.region")}>
                  <option value="">Select region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-black">
                Select Service Center
              </label>
              <select className="input" {...register("receiver.serviceCenter")}>
                <option value="">Select service center</option>
                {receiverCenters.map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-black">
                Delivery Instruction
              </label>
              <textarea
                className="input min-h-30"
                placeholder="Optional instructions"
                {...register("receiver.instruction")}
              />
            </div>
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
