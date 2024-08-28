import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import {
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
} from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
console.log("Service Account Email: ", GOOGLE_SERVICE_ACCOUNT_EMAIL);
const serviceAccountAuth = new JWT({
  // env var values here are copied from service account credentials generated by google
  // see "Authentication" section in docs for more info
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const headers = [
  "Date",
  "Name",
  "Email",
  "Cables",
  "Quantity",
  "Total",
  "Payment Method",
];

const getOrCreateSheet = (doc: GoogleSpreadsheet, title: string) => {
  const sheet = doc.sheetsByTitle[title];
  if (sheet) {
    return sheet;
  }
  return doc.addSheet({ title, headerValues: headers });
};

export const GET: RequestHandler = async () => {
  console.log("Resolving doc...");
  const doc = new GoogleSpreadsheet(
    "1an5lgSZJtJBczocd5fkG71z73l6pR3UKe9eNTKXP2Xw",
    serviceAccountAuth
  );

  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = await getOrCreateSheet(doc, "sales");

  console.log(sheet.title);
  console.log(sheet.rowCount);

  await sheet.addRow({
    Date: new Date().toISOString(),
    Name: "John Doe",
    Email: "John@example.com",
    Cables: "USB-C",
  });
  // adding / removing sheets
  const newSheet = await doc.addSheet({ title: "another sheet" });
  await newSheet.delete();

  return json({ test: "hello" });
};
