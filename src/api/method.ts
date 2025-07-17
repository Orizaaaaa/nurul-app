import { auth, db } from "@/lib/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

export const registerUser = async (
    email: string,
    password: string,
    name: string,
    role: "siswa" | "admin"
): Promise<string> => {
    try {
        // Register ke Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Simpan data user ke Firestore dengan role
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            email,
            role,
            createdAt: new Date(),
        });

        return user.uid;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// ✅ LOGIN USER
export const loginUser = async (email: string, password: string): Promise<any> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Ambil data user dari Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                uid: user.uid,
                email: user.email,
                role: docSnap.data().role,
                name: docSnap.data().name,
            };
        } else {
            throw new Error("User data not found in Firestore.");
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// ✅ LOGOUT USER
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


