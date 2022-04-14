import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';

import {customStyles} from './customStyles';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2';
import { eventClearActiveEvent, eventStartAddNew, startEventUpdate } from '../../actions/calendar';


Modal.setAppElement('#root');

const startDate = moment().minutes(0).seconds(0).add(1,"hours");
const endDate = startDate.clone().add(1,"hours")

const initEvent = {
    title: '',
    notes: '',
    start: startDate.toDate(),
    end: endDate.toDate()
}

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(startDate.toDate());
    const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const dispatch = useDispatch();
    const {modalOpen} = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)

    const [formValues, setFormValues] = useState(initEvent)

    const {title, notes, start, end} = formValues;

    useEffect(() => {
        
        if (activeEvent){
            setFormValues(activeEvent)
        }else{
            setFormValues(initEvent)
        }
        
    }, [activeEvent, setFormValues])


    const handleInputChange = ({target})=>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = ()=>{
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    }

    const handleStartDateChange = (e)=>{
        setDateStart(e);
        setFormValues({
            ...formValues,
            start:e
        })
    }

    const handleEndDateChange = (e)=>{
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end:e
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){
            
            return Swal.fire('Error' , 'La fecha fin debe ser mayor a la inicial', 'error')
            
        }

        if(title.trim().length<2){
            return setTitleValid(false)
        }

        if (activeEvent){
            dispatch(startEventUpdate(formValues))
        }else{
            dispatch(eventStartAddNew(formValues));
        }

       

        setTitleValid(true);
        closeModal();
        
        
    }

    return (
        <Modal
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        contentLabel="Example Modal"
        className='modal'
        >
            {activeEvent ?<h1>Actualizar Evento</h1>:<h1>Nuevo Evento</h1>}
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmit}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                        placeholder='Fecha Inicio'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                        placeholder='Fecha y Hora Fin'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className= {`form-control ${!titleValid&&'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
