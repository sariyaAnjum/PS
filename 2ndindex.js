const calculateOrderSummary = ({
  customerId,
  customerCategory,
  orderAmount,
  deliveryLocation
}) => {
  // 1. Base percentage discount calculation via lookup map
  const discountRates = {
    premium: 0.15,
    regular: 0.05
  };
  const baseDiscountRate = discountRates[customerCategory.toLowerCase()] || 0;
  let discountAmount = orderAmount * baseDiscountRate;

  // 2. Orders above ₹5,000 qualify for an additional ₹500 discount
  if (orderAmount > 5000) {
    discountAmount += 500;
  }

  // 3. Total discount cannot exceed 20% of the original order amount
  const maxAllowedDiscount = orderAmount * 0.20;
  discountAmount = Math.min(discountAmount, maxAllowedDiscount);

  // 4. Delivery charges calculation for orders below ₹3,000
  let deliveryCharge = 0;
  if (orderAmount < 3000) {
    const locationRates = {
      local: 100,
      regional: 200,
      national: 350
    };
    deliveryCharge = locationRates[deliveryLocation.toLowerCase()] ?? 150;
  }

  // 5. Final payable amount calculation
  const finalPayableAmount = (orderAmount - discountAmount) + deliveryCharge;

  // 6. Expected Output Format
  return {
    "Customer ID": customerId,
    "Customer Category": customerCategory,
    "Original Order Amount": `₹${orderAmount}`,
    "Discount Amount": `₹${discountAmount.toFixed(2)}`,
    "Delivery Charge": deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`,
    "Final Payable Amount": `₹${finalPayableAmount.toFixed(2)}`,
    "Order Summary": `Order processed successfully for ${customerCategory} customer.`
  };
};

// Example usage:
const customerOrder = {
  customerId: "CUST5021",
  customerCategory: "Premium",
  orderAmount: 6000,
  deliveryLocation: "Local"
};

console.log(calculateOrderSummary(customerOrder));