import { db } from "@/lib/firebase/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

export const createBook = async (item: any): Promise<string> => {
    const docRef = await addDoc(collection(db, "books"), item);
    return docRef.id;
};

export const getAllBooks = async (): Promise<any[]> => {
    const snapshot = await getDocs(collection(db, "books"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateBook = async (id: string, updatedData: any): Promise<void> => {
    const docRef = doc(db, "books", id);
    await updateDoc(docRef, updatedData);
};

export const deleteBook = async (id: string): Promise<void> => {
    const docRef = doc(db, "books", id);
    await deleteDoc(docRef);
};


// Peminjaman Buku
export const createLoan = async (loanData: any): Promise<string> => {
    const docRef = await addDoc(collection(db, "loans"), loanData);
    return docRef.id;
};

export const getLoansByUser = async (userId: string): Promise<any[]> => {
    const q = query(collection(db, "loans"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createFine = async (fineData: any): Promise<string> => {
    const docRef = await addDoc(collection(db, "fines"), fineData);
    return docRef.id;
};