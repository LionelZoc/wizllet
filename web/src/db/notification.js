import { useEffect, useState } from "react";
import { db } from "./index";
import { addDoc, doc, updateDoc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import dayjs from "dayjs";

const useSetNotif = () => {
    const add = async (data = {}) => {
        //const now = dayjs();
        const obj = {
            body: data?.message || "",
            date: data?.date || "", //? now.diff(dayjs(data.date), "s") : "",
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
