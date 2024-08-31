import * as sdk from "node-appwrite";
// require("dotenv").config();

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

console.log("From appwrite.config.ts");
console.log(process.env);

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66d163b6001e3ae8d325")
  .setKey(
    "693ece3946a25d516870795e287ae2dc010f1bbdaefc487b11f9000a36161f34efb637e0fbe474d79a8fc9f6125ff6ac00694f1114b55346a6464e3b6b384e3dccba91a6f65f6456901b54a781e5becdd6751d9beed83c5070596020f9ba9ef6ce5b8a8a1c42b106510a06de892c441964785ea7bc6fb6ce3808cc0d45e595ad"
  );

export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
