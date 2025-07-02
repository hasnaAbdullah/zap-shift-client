function totalCostCalculator(weight, isWithinCity, parcelType) {
  const wt = parseFloat(weight);
  let baseCost = 0;
  let extraCost = 0;
  let costNote = "";
  let zone = isWithinCity ? "Within City" : "Outside City";

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

  return { baseCost, extraCost, costNote, zone, total, wt };
}

export default totalCostCalculator;
