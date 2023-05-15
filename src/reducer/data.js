import axios from 'axios';

export const initialState = {
  data: null,
  requestParams: {
    url: null,
    method: 'GET',
    body: null,
  },
  loading: false,
  history: [],
  type: 'response',
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_API':
      state.requestParams = action.payload;
      return {...state};

    case 'SET_LOADING':
      state.loading = true;
      return {...state};

    case 'SET_RESULTS':
      state.data = action.payload;
      state.loading = false;
      return {...state};

    case 'SET_HISTORY':
      state.history.push(`${action.payload.date} - ${action.payload.params.method} request to ${action.payload.params.url}`)
      return {...state};

    case 'SET_TYPE':
      state.type = action.payload;
      return {...state};

    case 'REPEAT_REQ':
      return {

      }
    default: {
      return state;
    }
  }
};

export const setAPI = (params) => {
  return {
    type: 'SET_API',
    payload: params,
  };
};

export const setLoading = () => {
  return {
    type: 'SET_LOADING',
    payload: null,
  };
};

export const setResults = (data) => {
  return {
    type: 'SET_RESULTS',
    payload: data,
  };
};

export const setHistory = (history) => {
  return {
    type: 'SET_HISTORY',
    payload: history,
  };
};

export const setType = (type) => {
  return {
    type: 'SET_TYPE',
    payload: type,
  }
};

export const repeatRequest = (e) => {
  return {
    type: 'REPEAT_REQ',
    payload: e,
  };
};