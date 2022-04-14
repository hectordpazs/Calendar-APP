
import { types } from '../types/types';

const initialState = {
    events:[],
    activeEvent: null
};

export const calendarReducer = (state=initialState, action)=>{
    switch (action.type){

        case types.calendarSetActiveEvent:
            return {...state, activeEvent:action.payload}

        case types.calendarAddNew:
            return {...state, events: [...state.events, action.payload] }

        case types.calendarClearActiveEvent:
            return{...state, activeEvent:null}

        case types.calendarUpdateEvent:
            return {
                ...state,
                events: state.events.map(
                    event=> event.id===action.payload.id
                    ? action.payload
                    : event
                )
            }

            case types.calendarDeleteEvent:
                return {
                    ...state,
                    events: state.events.filter(
                        event=> event.id!==state.activeEvent.id
                    ),
                    activeEvent: null
                }

            case types.eventLoaded:
                return{
                    ...state,
                    events: [...action.payload]
                }

            case types.eventLogout:
                return{
                    ...initialState
                }

        default:
            return state;
    }
}