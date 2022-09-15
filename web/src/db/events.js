import React, { useEffect, useState } from "react";
import { db } from "./index";
import { getDocs, collection, onSnapshot } from "firebase/firestore"; 

const useEventsManager = () => {
    const [events, setEvents] = useState([]);

    const getEvents = () => {
        onSnapshot(collection(db, 'events'), (querySnapshot) => {
            setEvents(querySnapshot.docs.map(event => event.data()));
        });
    }

    useEffect(() => {
        getEvents();
    }, []);

    return events;
}

const addEvent = () => {}

export {
    useEventsManager,
    addEvent
}