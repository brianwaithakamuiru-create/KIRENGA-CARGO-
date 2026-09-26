import{addDoc,collection,deleteDoc,doc,getDocs,orderBy,query,setDoc,serverTimestamp}from"firebase/firestore";import{db,auth}from"../lib/firebase";import{getFunctions,httpsCallable}from"firebase/functions";
export const commandCollections=["vehicles","drivers","routes","compliance","finance","documents","notifications"] as const;
export type CommandCollection=typeof commandCollections[number];
export async function listRecords(name:CommandCollection){const q=query(collection(db,name),orderBy("updatedAt","desc"));return(await getDocs(q)).docs.map(d=>({id:d.id,...d.data()}))}
export async function createRecord(name:CommandCollection,data:Record<string,unknown>){return(await addDoc(collection(db,name),{...data,createdAt:serverTimestamp(),updatedAt:serverTimestamp()})).id}
export async function saveRecord(name:CommandCollection,id:string,data:Record<string,unknown>){await setDoc(doc(db,name,id),{...data,updatedAt:serverTimestamp()},{merge:true})}
export async function removeRecord(name:CommandCollection,id:string){await deleteDoc(doc(db,name,id))}
export async function saveConfig(name:"websiteSettings"|"brandingSettings",data:Record<string,unknown>){await setDoc(doc(db,name,"global"),{...data,updatedAt:serverTimestamp()},{merge:true})}

export async function listPublishedVehicles(){const q=query(collection(db,"vehicles"),orderBy("updatedAt","desc"));return(await getDocs(q)).docs.map(d=>({id:d.id,...d.data()})).filter((v:any)=>v.published===true);}

export async function listPublishedVehicles(){const q=query(collection(db,"vehicles"),orderBy("updatedAt","desc"));return(await getDocs(q)).docs.map(d=>({id:d.id,...d.data()})).filter((v:any)=>v.published===true);}

export async function getPublicFleet(){const fn=httpsCallable(getFunctions(auth.app),"getPublishedFleet");const r:any=await fn({});return r.data.vehicles||[];}
