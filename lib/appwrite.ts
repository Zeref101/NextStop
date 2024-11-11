import { CreateUserProps } from "@/types";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.zeref.NextStop",
  projectId: "672f9775002c8ba827d0",
  databaseId: "672f98d300146da6b073",
  usersCollectionId: "672f98f000091db7f0a6",
  savePlacesCollectionId: "6731be3900076a406b25",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

export const createUser = async ({
  email,
  password,
  username,
}: CreateUserProps) => {
  try {
    // Register User
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    console.log(newAccount);

    // Generate avatar initials
    const avatarUrl = avatars.getInitials(username);

    await signin(email, password);
    // Create a new document in the database
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    console.log(newUser);
    return newAccount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// ? SIGN IN THE USER
export async function signin(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session; // Returns session data for use or verification
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

// ? GET THE ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    console.log("account----->", currentAccount);
    return currentAccount;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// console.log("account----->", getAccount());

// ? GET CURRENT USER INFORMATION
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get(); // Await the promise
    // console.log(currentAccount);
    if (!currentAccount) {
      // console.log("oasdoaisjdoiajdoia");
      throw new Error("No current account found");
    }

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    // console.log("liiiiiiiiiiiiiist", currentUser);
    const document = currentUser.documents[0];
    if (!document.$id) throw new Error("No current user found");

    const responseObj = new Object({
      accountId: document.accountId,
      avatar: document.avatar,
      email: document.email,
      username: document.username,
    });

    return responseObj;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

// ? Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    console.log(session);
    return session;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

// ? Save places
export const savePlace = async (
  placeData: { title: string; description: string; img_url: string },
  userId: string
) => {
  try {
    // Create the saved place document in the saved_places collection
    const newPlace = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savePlacesCollectionId, // Collection for saved places
      ID.unique(),
      {
        title: placeData.title,
        description: placeData.description,
        image_url: placeData.img_url,
        userId: userId,
        createdAt: new Date().toISOString(),
      }
    );

    // Get the user document and update the saved places array with the new placeId
    const userDocuments = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", userId)]
    );

    const user = userDocuments.documents[0];

    if (user?.$id) {
      // Add the placeId to the user's savedPlaces array
      await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        user.$id,
        {
          savedPlaces: [...(user.savedPlaces || []), newPlace.$id],
        }
      );
    }

    console.log("Place saved successfully!");
    return newPlace;
  } catch (error) {
    console.error("Error saving place:", error);
    throw error;
  }
};

// ? get places
export const getSavedPlaces = async (userId: string) => {
  try {
    // Fetch saved places where userId matches
    const savedPlacesDocuments = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savePlacesCollectionId,
      [Query.equal("userId", userId)]
    );

    return savedPlacesDocuments.documents;
  } catch (error) {
    console.error("Error fetching saved places:", error);
    throw error;
  }
};
