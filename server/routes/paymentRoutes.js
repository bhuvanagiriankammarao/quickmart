import Razorpay from "razorpay";
import Payment from "../models/pamentModels.js";
import User from "../models/User.js";
import router from "./authRoutes.js";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: "rzp_test_GsUAh2atNEW2CJ", 
  key_secret: "KD2TJZjIV1kJecLkcgRV6UiM", 
});

export const fetchAndSaveRazorpayPayments = async () => {
  try {
    // console.log(" Fetching payments from Razorpay...");
    
    const response = await razorpay.payments.all();
    if (!response.items || response.items.length === 0) {
      console.log("No new payments found.");
      return;
    }

    for (const payment of response.items) {
      try {
        const existingPayment = await Payment.findOne({ paymentId: payment.id });
        if (existingPayment) {
          // console.log(`Payment already exists: ${payment.id}`);
          continue;
        }

        const amountInRupees = payment.amount / 100;
        const paymentDetails = new Payment({
          paymentId: payment.id,
          amount: amountInRupees,
          currency: payment.currency,
          status: payment.status,
          orderId: payment.order_id || "N/A",
          method: payment.method || "unknown",
          email: payment.email || "N/A",
          contact: payment.contact || "N/A",
          createdAt: new Date(payment.created_at * 1000),
        });

        const savedPayment = await paymentDetails.save();

        //  Reward user with coins if email exists
        if (payment.email) {
          const rewardCoins = Math.floor(amountInRupees / 10) * 1; // 10 coins per ₹100 spent
          
          const updatedUser = await User.findOneAndUpdate(
            { email: payment.email }, 
            { $inc: { "wallet.coins": rewardCoins } }, 
            { new: true }
          );

          if (updatedUser) {
            console.log(` Added ${rewardCoins} coins to ${payment.email}, new balance: ${updatedUser.wallet.coins}`);
          } else {
            console.warn(` User not found for email: ${payment.email}`);
          }
        }
      } catch (error) {
        console.error(`Error processing payment ID ${payment.id}:, error`);
      }
    }

    // console.log(" Payments processed successfully.");
  } catch (error) {
    console.error(" Error fetching payments from Razorpay:", error);
  }
};

export default router;