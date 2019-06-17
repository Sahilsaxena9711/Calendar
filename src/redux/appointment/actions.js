import * as constatnts from '../constant';

export const createAppointment = appointment => {
  return {
    type: constatnts.ADD_NEW_APPOINTMENT,
    appointment: appointment
  }
};

export const removeAppointment = id => {
  return{
    type: constatnts.REMOVE_APPOINTMENT,
    id: id
  }
}

export const editAppointment = appointment => {
  return{
    type: constatnts.EDIT_APPOINTMENT,
    appointment: appointment
  }
}