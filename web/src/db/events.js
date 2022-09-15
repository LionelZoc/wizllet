import { useEffect, useState } from "react";
import { db } from "./index";
import { addDoc, doc, updateDoc, collection, onSnapshot, deleteDoc } from "firebase/firestore"; 

const useGetEvents = () => {
    const [events, setEvents] = useState([]);

    const getEvents = () => {
        onSnapshot(collection(db, 'events'), (querySnapshot) => {
            setEvents(querySnapshot.docs.map(event => {
                return {...event.data(), id: event.id }
            }));
        })
    }

    useEffect(() => {
        getEvents();
    }, []);

    return events;
}

const useSetEvent = () => {
    const add = async (data = {}) => {
        const obj = {
            title: data?.title || "",
            description: data?.description || "",
            logo: data?.logo || "",
            qrcode: data?.qrcode || ""
        }
        try {
            await addDoc(collection(db, 'events'), obj)
        } catch (e) {
            console.error(e);
        }
    }

    return add;
}
 
const useDeleteEvent = () => {
    const remove = async (id) => {
        const docRef = doc(db, "events", id);
        try {
            await deleteDoc(docRef, {})
        } catch(e) {
            console.error(e);
        }
    }
    return remove;
}

export {
    useGetEvents,
    useSetEvent,
    useDeleteEvent
}