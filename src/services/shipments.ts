import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Booking, ShipmentStatus } from "../types";

function trackingCode() {
  return "KCG-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function createBooking(data: Omit<Booking,"id"|"status"|"createdAt">) {
  return addDoc(collection(db,"bookings"), {...data,status:"requested",createdAt:serverTimestamp()});
}

export async function getCustomerBookings(customerId:string) {
  const q=query(collection(db,"bookings"),where("customerId","==",customerId),orderBy("createdAt","desc"),limit(50));
  return (await getDocs(q)).docs.map(d=>({id:d.id,...d.data()}));
}

export async function getTracking(trackingNumber:string) {
  const snap=await getDoc(doc(db,"tracking",trackingNumber));
  return snap.exists()?snap.data():null;
}

export async function createShipment(data:Record<string,unknown>) {
  const trackingNumber=trackingCode();
  const ref=await addDoc(collection(db,"shipments"),{...data,trackingNumber,status:"confirmed" satisfies ShipmentStatus,createdAt:serverTimestamp(),updatedAt:serverTimestamp()});
  await setDocTracking(trackingNumber,ref.id,"confirmed");
  return {id:ref.id,trackingNumber};
}

async function setDocTracking(trackingNumber:string,shipmentId:string,status:ShipmentStatus){
  await import("firebase/firestore").then(({setDoc})=>setDoc(doc(db,"tracking",trackingNumber),{trackingNumber,shipmentId,status,updatedAt:serverTimestamp()}));
}

export async function updateShipmentStatus(id:string,status:ShipmentStatus){
  await updateDoc(doc(db,"shipments",id),{status,updatedAt:serverTimestamp()});
}
