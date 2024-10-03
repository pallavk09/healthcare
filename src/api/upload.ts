import { Client, Storage, ID } from "appwrite";

console.log(
  "process.env.REACT_APP_APPWRITE_ENDPOINT",
  process.env.REACT_APP_APPWRITE_ENDPOINT
);

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT!)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID!);

const storage = new Storage(client);

export interface UploadFileType {
  filepath: File;
  bucket_id: string;
}

export async function uploadFile({ filepath, bucket_id }: UploadFileType) {
  try {
    console.log("Inside uploadFile function");
    console.log(filepath);

    const upload = await storage.createFile(bucket_id, ID.unique(), filepath);
    console.log("Upload done");
    console.log(upload);
    return upload;
  } catch (error: any) {
    console.log(error);
    console.log("Error while uploading file", error.message);
    return null;
  }
}

export async function getFilePreview(bucket_id: string, file_id: string) {
  try {
    console.log("Inside getFilePreview function");

    const result = await storage.getFilePreview(bucket_id, file_id);
    console.log("getFilePreview success");
    console.log(result);
    return result;
  } catch (error: any) {
    console.log(error);
    console.log("Error while getting file preview", error.message);
    return null;
  }
}
