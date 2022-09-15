import { useEffect, useState } from "react";
import { db } from "./index";
import { addDoc, doc, updateDoc, collection, onSnapshot, deleteDoc } from "firebase/firestore";

const useSetNotif = () => {
    const add = async (data = {}) => {
        const obj = {
            body: data?.message || "",
            date: data?.date || "",
            title: data?.title || "",
            event: data?.event || ""
        }
        try {
            await addDoc(collection(db, 'notifications'), obj)
        } catch (e) {
            console.error(e);
        }
    }

    return add;
}


export {
    useSetNotif,
}
