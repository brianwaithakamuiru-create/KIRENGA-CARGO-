import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import type { UserRole } from "../types";

export async function registerCustomer(name: string, email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });
  await setDoc(doc(db, "users", credential.user.uid), {
    uid: credential.user.uid, email, displayName: name, role: "customer" satisfies UserRole,
    active: true, createdAt: serverTimestamp()
  });
  return credential.user;
}

export async function login(email: string, password: string) {
  return (await signInWithEmailAndPassword(auth, email, password)).user;
}

export async function logout() { await signOut(auth); }
