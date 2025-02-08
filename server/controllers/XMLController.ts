// import { Request, Response } from "express";
// import fs from "fs";
// import xml2js from "xml2js";
// import CreditReport from "../models/XMLModel";
// import mongoose from "mongoose";


// export const uploadXML = async (req: Request, res: Response) => {
//   if (!req.file) {
//     res.status(400).json({ error: "No file uploaded" });
//     return
//   }

//   try {
//     const xmlData = req.file.buffer.toString("utf8");  
//     const parser = new xml2js.Parser();
//     const result = await parser.parseStringPromise(xmlData);

//     if (!result.INProfileResponse) {
//       res.status(400).json({ error: "Invalid XML structure. Please upload a valid credit report XML file." });
//       return
//    }

//     const currentApplication = result.INProfileResponse?.Current_Application?.[0]?.Current_Application_Details?.[0]?.Current_Applicant_Details?.[0];
//     const caisAccount = result.INProfileResponse?.CAIS_Account?.[0];
//     const caisSummary = caisAccount?.CAIS_Summary?.[0];
//     const caisDetails = caisAccount?.CAIS_Account_DETAILS || [];

//     const extractedData = {
//       name: `${currentApplication?.First_Name?.[0]} ${currentApplication?.Last_Name?.[0]}` || "N/A",
//       mobilePhone: currentApplication?.MobilePhoneNumber?.[0] || "N/A",
//       pan: caisAccount?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_ID_Details?.[0]?.Income_TAX_PAN?.[0] || "N/A",
//       creditScore: Number(result.INProfileResponse?.SCORE?.[0]?.BureauScore?.[0]) || 0,
//       reportSummary: {
//         totalAccounts: Number(caisSummary?.Credit_Account?.[0]?.CreditAccountTotal?.[0]) || 0,
//         activeAccounts: Number(caisSummary?.Credit_Account?.[0]?.CreditAccountActive?.[0]) || 0,
//         closedAccounts: Number(caisSummary?.Credit_Account?.[0]?.CreditAccountClosed?.[0]) || 0,
//         currentBalance: Number(caisSummary?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_All?.[0]) || 0,
//         securedAmount: Number(caisSummary?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_Secured?.[0]) || 0,
//         unsecuredAmount: Number(caisSummary?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_UnSecured?.[0]) || 0,
//         last7DaysEnquiries: Number(result.INProfileResponse?.TotalCAPS_Summary?.[0]?.TotalCAPSLast7Days?.[0]) || 0,
//       },
//       creditAccounts: caisDetails.map((account: any) => ({
//         bankName: account?.Subscriber_Name?.[0] || "N/A",
//         address: [
//           account?.CAIS_Holder_Address_Details?.[0]?.First_Line_Of_Address_non_normalized?.[0] || "",
//           account?.CAIS_Holder_Address_Details?.[0]?.Second_Line_Of_Address_non_normalized?.[0] || "",
//           account?.CAIS_Holder_Address_Details?.[0]?.Third_Line_Of_Address_non_normalized?.[0] || "",
//         ].filter(Boolean).join(", "),
//         accountNumber: account?.Account_Number?.[0] || "N/A",
//         amountOverdue: Number(account?.Amount_Past_Due?.[0]) || 0,
//         currentBalance: Number(account?.Current_Balance?.[0]) || 0,
//       })),
//     };

//     const existingReport = await CreditReport.findOne({
//       pan: extractedData.pan,
//       creditScore: extractedData.creditScore,
//     });

//     if (existingReport) {
//       res.status(200).json({ message: "Duplicate report found, returning existing report.", reportId: existingReport._id, });
//       return
//     }

//     const report = new CreditReport(extractedData);
//     const savedReport = await report.save();

//     res.status(201).json({ message: "File uploaded successfully", reportId: savedReport._id });
//   } catch (error) {
//     console.error("Error processing XML file:", error);
//     res.status(500).json({ error: "Failed to process XML file" });
//   }
// };


// export const getReportById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       res.status(400).json({ message: "Report ID is required" });
//       return
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//        res.status(404).json({ message: "Invalid report ID format" });
//        return
//     }

//     const report = await CreditReport.findById(id);

//     if (!report) {
//       res.status(404).json({ message: "Report not found" });
//       return
//     }
//     res.status(200).json(report);
//   } catch (error) {
//     console.error("Error fetching report by ID:", error);
//     res.status(500).json({ message: "Failed to fetch the report" });
//   }
// };





import { Request, Response, NextFunction } from "express";
import xml2js from "xml2js";
import CreditReport from "../models/XMLModel";
import mongoose from "mongoose";

/**
 * Parses and extracts data from an XML file buffer.
 */
const parseXML = async (xmlBuffer: Buffer) => {
  const xmlData = xmlBuffer.toString("utf8");
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xmlData);

  if (!result.INProfileResponse) throw new Error("Invalid XML structure.");

  const currentApplication = result.INProfileResponse?.Current_Application?.[0]?.Current_Application_Details?.[0]?.Current_Applicant_Details?.[0];
  const caisAccount = result.INProfileResponse?.CAIS_Account?.[0];
  const caisSummary = caisAccount?.CAIS_Summary?.[0];
  const caisDetails = caisAccount?.CAIS_Account_DETAILS || [];

  return {
    name: `${currentApplication?.First_Name?.[0]} ${currentApplication?.Last_Name?.[0]}`.trim() || "N/A",
    mobilePhone: currentApplication?.MobilePhoneNumber?.[0] || "N/A",
    pan: caisAccount?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_ID_Details?.[0]?.Income_TAX_PAN?.[0] || "N/A",
    creditScore: Number(result.INProfileResponse?.SCORE?.[0]?.BureauScore?.[0]) || 0,
    reportSummary: {
      totalAccounts: Number(caisSummary?.Credit_Account?.[0]?.CreditAccountTotal?.[0]) || 0,
      activeAccounts: Number(caisSummary?.Credit_Account?.[0]?.CreditAccountActive?.[0]) || 0,
      closedAccounts: Number(caisSummary?.Credit_Account?.[0]?.CreditAccountClosed?.[0]) || 0,
      currentBalance: Number(caisSummary?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_All?.[0]) || 0,
      securedAmount: Number(caisSummary?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_Secured?.[0]) || 0,
      unsecuredAmount: Number(caisSummary?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_UnSecured?.[0]) || 0,
      last7DaysEnquiries: Number(result.INProfileResponse?.TotalCAPS_Summary?.[0]?.TotalCAPSLast7Days?.[0]) || 0,
    },
    creditAccounts: caisDetails.map((account: any) => ({
      bankName: account?.Subscriber_Name?.[0] || "N/A",
      address: [
        account?.CAIS_Holder_Address_Details?.[0]?.First_Line_Of_Address_non_normalized?.[0] || "",
        account?.CAIS_Holder_Address_Details?.[0]?.Second_Line_Of_Address_non_normalized?.[0] || "",
        account?.CAIS_Holder_Address_Details?.[0]?.Third_Line_Of_Address_non_normalized?.[0] || "",
      ].filter(Boolean).join(", "),
      accountNumber: account?.Account_Number?.[0] || "N/A",
      amountOverdue: Number(account?.Amount_Past_Due?.[0]) || 0,
      currentBalance: Number(account?.Current_Balance?.[0]) || 0,
    })),
  };
};

/**
 * Uploads an XML file and saves the extracted data.
 */
export const uploadXML = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file){
       res.status(400).json({ error: "No file uploaded." });
       return
    } 

    const extractedData = await parseXML(req.file.buffer);

    const existingReport = await CreditReport.findOne({
      pan: extractedData.pan,
      creditScore: extractedData.creditScore,
    });

    if (existingReport) {
       res.status(200).json({ message: "Duplicate report found.", reportId: existingReport._id });
       return
    }

    const report = new CreditReport(extractedData);
    const savedReport = await report.save();

    res.status(201).json({ message: "File uploaded successfully", reportId: savedReport._id });
  } catch (error) {
    console.error("Error processing XML file:", error);
    next(error);
  }
};

/**
 * Retrieves a credit report by ID.
 */
export const getReportById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
       res.status(400).json({ message: "Invalid report ID format" });
       return
    }

    const report = await CreditReport.findById(id);
    if (!report){
       res.status(404).json({ message: "Report not found" });
       return
    } 

    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    res.status(500).json({ message: "Failed to fetch the report" });
  }
};
