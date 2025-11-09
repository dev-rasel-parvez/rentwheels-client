import React, { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    updateProfile,
    getIdToken,
} from "firebase/auth";
import { auth } from "../firebase/firebase"; 
import { toast } from "react-toastify";

export const AuthContext = createContext();


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    async function Signup({ name, email, photoURL, password }) {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            // update displayName / photoURL
            await updateProfile(res.user, { displayName: name, photoURL: photoURL || undefined });
            toast.success("Sign Up successful");
            return res.user;
        } catch (err) {
            toast.error(err.message || "Registration failed");
            throw err;
        }
    }

    async function login(email, password) {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful");
            return res.user;
        } catch (err) {
            toast.error(`invalid-credential`);
            throw err;
        }
    }

    async function loginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            toast.success("Signed in with Google successful");
            return res.user;
        } catch (err) {
            toast.error(err.message || "Google sign-in failed");
            throw err;
        }
    }

    async function logout() {
        try {
            await firebaseSignOut(auth);
            toast.success("Logged out successful");
        } catch (err) {
            toast.error("Logout failed");
        }
    }

    async function getToken() {
        if (!auth.currentUser) return null;
        return await getIdToken(auth.currentUser,  false);
    }

    const value = {
        user,
        loading,
        Signup,
        login,
        loginWithGoogle,
        logout,
        getToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
