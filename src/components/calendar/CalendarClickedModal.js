import React, { useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { customStyles } from '../../helpers/calendar-modal'
import { eventAddNew, eventClean, eventUpdated } from '../../Redux/actions/event'
import { uiCloseModal } from '../../Redux/actions/uiCloseModal'

const initForm = {
    title: '',
    notes: '',
    start: '',
    end: ''
}
export const CalendarClickedModal = (  ) => {


    const [startDate, setStartDate] = useState(  );
    const [endDate, setEndDate] = useState( );
    const [titleValid, setTitleValid] = useState( true );

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState( initForm );
    const { notes, title } = formValues;

    // useEffect(( ) => {
    //     //Load information from store and show on Modal
    //     if( activeEvent ) {
    //         setFormValues( activeEvent );
    //     } else {
    //         setFormValues( initForm );
    //     }

        

    // }, [ activeEvent, setFormValues, initForm ])

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

        const momentStart = e.start;
        const momentEnd = e.end;

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
        <div>
            <Modal
                isOpen = { modalOpen }
                // onAfterOpen={afterOpenModal}
                onRequestClose = { closeModal }
                closeTimeoutMS = { 300 }
                style = { customStyles }
                className = "modal"
                overlayClassName = "modal-fondo"
            > 
                <h1> { ( activeEvent ) ? 'Edit event' : 'New event' } </h1>
                    <hr />
                    <form className="container"
                    onSubmit = { handleSubmit }
                    >

                        <div className="form-group">
                            <label>End date and time</label>
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
        </div>
    )
}
