import { ID, Query } from "node-appwrite";
import { storage, users, database } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  const { name, email, phone } = user;
  console.log("calling create", user);
  try {
    const newUser = await users.create(
      ID.unique(),
      email,
      phone,
      undefined,
      name
    );
    console.log("new user created");
    console.log({ newUser });
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      //meaning user already exists
      const document = await users.list([Query.equal("email", [email])]);
      return document?.users[0];
    } else {
      console.log("Some error while creating new user: ", error);
      return undefined;
    }
  }
};

export const getUSer = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    //adding files to the storage
    //1. Fetch file from buffer using InputFile from appwrite
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      //2. Push file into the appwrite storage. Need to pass bucket ID
      file = await storage.createFile(
        "66d1683c002c889f06be",
        ID.unique(),
        inputFile
      );
    }
    //Creating document for this patient
    //Passing Database_ID and PATIENT_COLLECTION_ID
    const newPatient = database.createDocument(
      "66d16612003d7590eb00",
      "66d16693002b948e7c37",
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        //passing ENDPOINT, BUCKET_ID, PROJECT_ID
        identificationDocumentUrl: `https://cloud.appwrite.io/v1/storage/buckets/66d1683c002c889f06be/files/${file?.$id}/view?project=66d163b6001e3ae8d325`,
        ...patient,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
