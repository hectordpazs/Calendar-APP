import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const setActiveEvent = (e)=>{
    return {
        type: types.calendarSetActiveEvent,
        payload: e
    }
}

export const eventStartAddNew = (event)=>{
    return async (dispatch, getState)=>{

        const {uid, name}= getState().auth

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
    
            if (body.ok){
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(event))
            }

        } catch (error) {
            Swal.fire('Error', error, 'error');
        }

       
    }
}

export const eventStartLoading = ()=>{
    return async (dispatch, getState)=>{

        try {
            
            const {uid} = getState().auth

            const resp = await fetchConToken('events');
            const body = await resp.json();

            const userEvents = body.events.filter(
                e=> e.user._id === uid
            )

            const events = prepareEvents(userEvents);

            if (events){
                dispatch(eventLoaded(events))
            }
            

        } catch (error) {
            Swal.fire('Error', 'Error en los eventos', 'error')
        }
       

    }
}

export const startEventUpdate = (event)=>{
    return async(dispatch)=>{

        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventUpdate(event))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            Swal.fire('Error', error, 'error');
        }

    }
}

export const startDeleteEvent = (event)=>{
    return async(dispatch, getState)=>{

        //const {id} = getState().calendar.activeEvent;

        try {
            const resp = await fetchConToken(`events/${event.id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDeleted(event))
                Swal.fire('Hecho', body.msg, 'success')
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            Swal.fire('Error', error, 'error');
        }

    }
}

const eventLoaded = (events)=>({
    type: types.eventLoaded,
    payload: events
})

export const eventAddNew = (event)=> ({
    type: types.calendarAddNew,
    payload: event
})

export const eventClearActiveEvent = ()=>({
    type: types.calendarClearActiveEvent
})

export const eventUpdate = (e)=>({
    type: types.calendarUpdateEvent,
    payload:e
})

export const eventDeleted = ()=>({
    type: types.calendarDeleteEvent,
})

export const cleanActive = ()=>({
    type: types.eventLogout
})