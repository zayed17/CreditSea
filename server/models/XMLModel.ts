import mongoose from "mongoose";

const CreditReportSchema = new mongoose.Schema({
  name: String,
  mobilePhone: String,
  pan: String,
  creditScore: Number,
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    last7DaysEnquiries: Number
  },
  creditAccounts: [{
    bankName: String,
    address: String,
    accountNumber: String,
    amountOverdue: Number,
    currentBalance: Number
  }]
});

export default mongoose.model("CreditReport", CreditReportSchema);
