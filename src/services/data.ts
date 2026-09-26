import{collection,getDocs,limit,orderBy,query,where}from"firebase/firestore";import{db}from"../lib/firebase";
export async function getShipments(){const q=query(collection(db,"shipments"),orderBy("createdAt","desc"),limit(100));return(await getDocs(q)).docs.map(d=>({id:d.id,...d.data()}))}
export async function getBookings(){const q=query(collection(db,"bookings"),orderBy("createdAt","desc"),limit(100));return(await getDocs(q)).docs.map(d=>({id:d.id,...d.data()}))}
export async function getCustomerBookings(uid:string){const q=query(collection(db,"bookings"),where("customerId","==",uid),orderBy("createdAt","desc"),limit(50));return(await getDocs(q)).docs.map(d=>({id:d.id,...d.data()}))}
export async function getDriverShipments(uid:string){const q=query(collection(db,"shipments"),where("assignedDriverId","==",uid),orderBy("updatedAt","desc"),limit(50));return(await getDocs(q)).docs.map(d=>({id:d.id,...d.data()}))}
