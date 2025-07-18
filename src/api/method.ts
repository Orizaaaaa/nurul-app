import { auth, db } from "@/lib/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

export const registerUser = async (form: any): Promise<string> => {
    try {
        // Buat akun di Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;

        // Buat salinan data form tanpa password & confirmPassword
        const { password, confirmPassword, ...userData } = form;

        // Tambahkan UID dan createdAt
        const dataToSave = {
            ...userData,
            uid: user.uid,
            createdAt: new Date(),
        };

        // Simpan ke Firestore
        await setDoc(doc(db, "users", user.uid), dataToSave);

        return user.uid;
    } catch (error: any) {
        throw new Error(error.message);
    }
};




export const loginUser = async (email: string, password: string): Promise<any> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Ambil data user lengkap dari Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error("Data pengguna tidak ditemukan di Firestore.");
        }

        const userData = docSnap.data();

        return {
            uid: user.uid,
            email: user.email,
            ...userData, // gabungkan semua data dari Firestore
        };
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


