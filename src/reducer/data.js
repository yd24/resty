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
};

export const dataReducer = async(state, action) => {
  switch (action.type) {
    case 'API_CALL':
      return {
        data: state.data,
        requestParams: action.payload,
        loading: false,
        history: state.history,
      };
    case 'SET_LOADING':
      return {
        data: state.data,
        requestParams: state.requestParams,
        loading: true,
        history: state.history,
      };
    case 'SHOW_RESULTS':
      let date = new Date();
      let entry = {
        date: date.toISOString(),
        params: action.payload,
      }
      state.history.push(entry);

      let update = {
        body: null,
        headers: null,
      };

      let config = {
        method: state.requestParams.method,
        url: state.requestParams.url,
        data: JSON.stringify(state.requestParams.body),
      };
      try {
        let resp = await axios(config);
        update.body = resp.data;
        update.headers = resp.headers;
      } catch(e) {
        update.body = `Error ${e.response.status}: Invalid request`;
        update.headers = `Error ${e.response.status}: Invalid request`;
      }
      return {
        data: update,
        requestParams: state.requestParams,
        loading: false,
        history: state.history,
      };
    case 'REPEAT_REQ':
      return {

      }
    default: {
      return state;
    }
  }
};

export const callAPI = (params) => {
  return {
    type: 'API_CALL',
    payload: params,
  };
};

export const setLoading = () => {
  return {
    type: 'SET_LOADING',
    payload: null,
  };
};

export const showResults = (data) => {
  return {
    type: 'SHOW_RESULTS',
    payload: data,
  };
};

export const repeatRequest = (e) => {
  return {
    type: 'REPEAT_REQ',
    payload: e,
  };
};