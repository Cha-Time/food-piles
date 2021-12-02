import Axios from 'axios';

////// Action Types
const SET_ORGANIZATION = 'SET_ORGANIZATION'

////// Action Creators
export const setOrganization = (organization) => ({type: SET_ORGANIZATION, organization})

////// Async Creators
export const fetchOrganization = (orgId) => {
    return async (dispatch) => {
      const token = window.localStorage.getItem('token');
        const res = await Axios.get(`https://foodpiles.herokuapp.com/api/organizations/${orgId}`);
        dispatch(setOrganization(res.data));
    }
}

//////Reducer
export default function(state = {}, action) {
    switch(action.type) {
      case SET_ORGANIZATION :
        return action.organization;
      default :
        return state;
    }
  }
