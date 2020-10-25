import React, { useEffect, useState } from 'react'

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { customStyles } from '../../helpers/calendar-modal';


import './css/styles.css';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../Redux/actions/uiCloseModal';
import { eventAddNew, eventClean, eventUpdated } from '../../Redux/actions/event';



Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowEnd = now.clone().add(1, 'hours');

const initForm = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowEnd.toDate()
}

export const CalendarModal = () => {
    
    const [startDate, setStartDate] = useState( now.toDate() );
    const [endDate, setEndDate] = useState( nowEnd.toDate() );
    const [titleValid, setTitleValid] = useState( true );
    //useSelector to listener any change from State.
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    
    
    const [formValues, setFormValues] = useState( initForm );
    const { notes, title, start, end } = formValues;
    
    useEffect((  ) => {
        //Load information from store and show on Modal
        if( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initForm );
        }

        

    }, [ activeEvent, setFormValues ])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        });
    }
    
    const handleDateTime = ( e ) => {
        //Change the start date dinamic
       setStartDate( e );
       setFormValues({
           ...formValues,
           start: e
       });
    }

    const handleEndTime = ( e ) => {
        setEndDate( e );
        setFormValues({
            ...formValues,
            end: e
        });
     }

     const handleSubmit = ( e ) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if( momentStart.isSameOrAfter( momentEnd ) ) {

            return Swal.fire('Error','The date 2 is invalid', 'error');
        }

        if( title.trim().length < 2 ) {
            return setTitleValid( false );
        }

        //TODO: realizar grabación
        if( activeEvent ) {

            dispatch( eventUpdated( formValues ) );
        } else {

            dispatch( eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '321',
                    name: 'Ender'
                }
            }) );
        }

        setTitleValid( true );
        closeModal();

     }
 
 
     const closeModal = () => {
        //TODO: Close modal
        dispatch( uiCloseModal() );
        setFormValues( initForm );
        dispatch( eventClean() );

     }


    return (
            <Modal
            isOpen = { modalOpen }
            // onAfterOpen={afterOpenModal}
            onRequestClose = { closeModal }
            closeTimeoutMS = { 300 }
            style = {customStyles}
            className = "modal"
            overlayClassName = "modal-fondo"
            > 
                <h1> { ( activeEvent ) ? 'Edit event' : 'New event' } </h1>
                    <hr />
                <form className="container"
                onSubmit = { handleSubmit }
                >

                    <div className="form-group">
                        <label>Start date and time</label>
                        <DateTimePicker 
                            onChange = { handleDateTime }
                            value = { startDate }
                            className = "form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>End date and time</label>
                        <DateTimePicker 
                            onChange = { handleEndTime }
                            value = { endDate }
                            className = "form-control"
                            minDate = { startDate }
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Title and notes</label>
                        <input 
                            type = "text" 
                            className = { `form-control ${ !titleValid && 'is-invalid' }`}
                            placeholder = "Title of Event"
                            name="title"
                            autoComplete = "off"
                            value = { title }
                            onChange = { handleInputChange }
                        />
                        <small id="emailHelp" 
                        className="form-text text-muted">A short description</small>
                    </div>

                    <div className="form-group">
                        <textarea 
                            type="text" 
                            className="form-control"
                            placeholder="Notes"
                            rows="5"
                            name="notes"
                            value = { notes }
                            onChange = { handleInputChange }
                        ></textarea>
                        <small id="emailHelp" 
                        className="form-text text-muted">Additional information</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Save</span>
                    </button>
                </form>
            </Modal>
    )
}
