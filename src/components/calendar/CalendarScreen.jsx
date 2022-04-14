import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { setActiveEvent, eventClearActiveEvent, eventStartLoading } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month');
    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar)

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])

    const onDoubleClick = (e)=>{
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e)=>{
        dispatch(setActiveEvent(e));
    }

    const onViewChange = (e)=>{
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e)=>{
        dispatch(eventClearActiveEvent())
    }

    const eventStyleGetter = (event, start, end, isSelected )=>{
       
        const style={
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return{
            style
        }
    }

    return (
        <div>
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab/>
            {   
                activeEvent&&
                <DeleteEventFab/>
            }
            <CalendarModal/>

        </div>
    )
}
