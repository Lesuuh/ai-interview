"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;

// register
export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    // check the db for that user with the uid
    const userRecord = await db.collection("users").doc(uid).get();
    // if user exists on the db
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists, Please sign in instead",
      };
    }
    // if it does not, create or set the user
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully, please sign in",
    };
  } catch (error: any) {
    console.error("Error creating a user", error);

    // if this is the error code (specify error)
    if (error.code === "auth/email-already-exists") {
      return { success: false, message: "This email is already in use" };
    }

    // if other errors occurs
    return {
      success: false,
      message: "Failed to create account",
    };
  }
}

// managing session
export async function setSessionCookie(idToken: string) {
  // initialize the cookies
  const cookieStore = await cookies();

  //   customize the session duration using firebase createSessionCookie
  const sessionCookies = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK,
  });

  //   configuring the sesssion
  cookieStore.set("session", sessionCookies, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

// sign-in
export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account instead",
      };
    }
    await setSessionCookie(idToken);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to log into an account",
    };
  }
}

// checking the current user
export async function getCurrentUser(): Promise<User | null> {
  // initialize the cookie
  const cookieStore = await cookies();

  //   check or get the session cookie value from the cookiestore
  const sessionCookies = cookieStore.get("session")?.value;

  if (!sessionCookies) return null;

  //   if the sessionCookie exists
  try {
    // verify the sessionCookies using auth.verifySessionCookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookies, true);
    // then if verified, get the userRecord
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }
    // then finally return the userRecord data with the id
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// checking if its authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
