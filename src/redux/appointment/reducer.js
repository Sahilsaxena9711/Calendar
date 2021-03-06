import * as constants from '../constant';
import {genetrateId} from '../../helper'
export default (state = localStorage.getItem('data') === "null" || localStorage.getItem('data') === null ? [] : JSON.parse(localStorage.getItem('data')), action) => {
    switch (action.type){
      
      case constants.ADD_NEW_APPOINTMENT:
        action.appointment.id = genetrateId(state);
      return [
        ...state,
        action.appointment
      ];
      case constants.REMOVE_APPOINTMENT:
      return state.filter((appointment, i) => appointment.id !== action.id);

      case constants.EDIT_APPOINTMENT:
      return state.map((appointment, i) => appointment.id === action.appointment.id ? action.appointment : appointment);

      default:
        return state;
    }
};