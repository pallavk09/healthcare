import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

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
