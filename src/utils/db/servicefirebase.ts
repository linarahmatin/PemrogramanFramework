import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

/* =========================
   🔹 GET ALL PRODUCTS
========================= */
export async function retrieveProducts(collectionName: string) {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error retrieveProducts:", error);
    return [];
  }
}

/* =========================
   🔹 GET DATA BY ID
========================= */
export async function retrieveDataByID(collectionName: string, id: string) {
  try {
    const snapshot = await getDoc(doc(db, collectionName, id));
    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("Error retrieveDataByID:", error);
    return null;
  }
}

/* =========================
   🔹 SIGN IN (CREDENTIAL)
========================= */
export async function signIn(email: string) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error signIn:", error);
    return null;
  }
}

/* =========================
   🔹 SIGN UP
========================= */
export async function signUp(
  userData: any,
  callback: (result: { status: boolean; message: string }) => void
) {
  try {
    if (!userData.email) {
      return callback({ status: false, message: "Email wajib diisi" });
    }

    if (userData.password.length < 6) {
      return callback({
        status: false,
        message: "Password minimal 6 karakter",
      });
    }

    // cek email sudah ada
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return callback({
        status: false,
        message: "Email sudah terdaftar",
      });
    }

    // hash password
    const saltRounds = 10;
    userData.password = await bcrypt.hash(userData.password, saltRounds);

    userData.role = "member";

    await addDoc(collection(db, "users"), userData);

    callback({
      status: true,
      message: "Registrasi Berhasil",
    });
  } catch (error: any) {
    callback({
      status: false,
      message: error.message,
    });
  }
}

/* =========================
   🔹 LOGIN GOOGLE / SOCIAL
========================= */
export async function loginWithSocial(userData: any, callback: any) {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email)
    );

    const querySnapshot = await getDocs(q);

    const data: any = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      // user sudah ada
      userData.role = data[0].role;

      await updateDoc(doc(db, "users", data[0].id), userData);

      callback({
        status: true,
        message: "Login social media success",
        data: userData,
      });
    } else {
      // user baru
      userData.role = "member";

      await addDoc(collection(db, "users"), userData);

      callback({
        status: true,
        message: "Registration social media success",
        data: userData,
      });
    }
  } catch (error: any) {
    console.error("Error loginWithSocial:", error);
    callback({
      status: false,
      message: "Failed to process social login",
    });
  }
}
