// src/components/auth/Register.jsx (or in AppContext.jsx if done centrally)
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";

const registerUser = async (email, password, name, type) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      type: type, // "consumer" or "supplier"
      createdAt: serverTimestamp(),
    });

    return user;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};
export default registerUser;