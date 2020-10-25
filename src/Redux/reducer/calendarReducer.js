import moment from "moment";
import { types } from "../types/types";

const initialState = {

    events: [{
        id: new Date().getTime(),
        title: 'Happy birthday of Arleen',
        start: moment().toDate(),
        end: moment().add( 2, 'hours' ).toDate(),
        bgColor: '#fafafa',
        notes: 'Buy a cake',
        user: {
            _id: '123445773245',
            name: 'Ender'
        }
    }],
    activeEvent: null
}


export const calendarReducer = ( state = initialState, action ) =>{

    switch ( action.type ) {
        
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventClean:
            return {
                ...state,
                activeEvent: null
            }
        
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]   
            }

        case types.eventUpdated:
            return {
                //Updated some event.
                ...state,
                events: state.events.map( e => ( e.id === action.payload.id ) ? action.payload : e ) 
            }
        
        case types.eventDeleted:
            return {
                //Deleted an activenotes selected.
                ...state,
                events: state.events.filter( e => ( e.id !== state.activeEvent.id ) ),
                activeEvent: null
            }

        default:
            return state;           
    
    }
}