import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleteEvent } from '../../actions/calendar';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const {activeEvent} = useSelector(state => state.calendar)

    
    const handleDeleteEvent = ()=>{
        dispatch(startDeleteEvent(activeEvent))
    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleDeleteEvent}
        >
            <i className='fas fa-trash'></i>
            <span> Borrar Evento</span>
        </button>
    )
}
