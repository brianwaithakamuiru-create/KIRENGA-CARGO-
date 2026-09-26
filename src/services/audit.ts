import{addDoc,collection,serverTimestamp}from"firebase/firestore";import{db}from"../lib/firebase";
export async function writeAudit(uid:string,action:string,entity:string,entityId:string){await addDoc(collection(db,"auditLogs"),{uid,action,entity,entityId,createdAt:serverTimestamp()})}
