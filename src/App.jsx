import { useReducer, Fragment } from 'react';
import { initialState, dataReducer, setAPI, setResults, setLoading, setHistory, setType, repeatRequest } from './reducer/data';
import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Content from './Components/Content';
import axios from 'axios';

function App() {
  //state
  const [state, dispatch] = useReducer(dataReducer, initialState);

  let setParams = (params) => {
    dispatch(setAPI(params));
  };

  let selectType = (type) => {
    dispatch(setType(type));
  }

  let loading = () => {
    dispatch(setLoading());
  }

  let getResults = async(params) => {
    let date = new Date();
    let entry = {
      date: date.toISOString(),
      params: params,
    }

    let update = {
      body: null,
      headers: null,
    };

    let config = {
      method: params.method,
      url: params.url,
      data: JSON.stringify(params.body),
    };
    try {
      let resp = await axios(config);
      console.log('pop', resp.data);
      update.body = resp.data;
      update.headers = resp.headers;
    } catch(e) {
      update.body = `Error ${e.response.status}: Invalid request`;
      update.headers = `Error ${e.response.status}: Invalid request`;
    }
    dispatch(setResults(update));
    dispatch(setHistory(entry));
  };

  //data.history.push(`Error ${e.response.status} from ${params.url} - ${date}`);
  //data.history.push(`${date} - ${params.method} request to ${params.url}`);

  return (
    <Fragment>
      <Header />
      <h2>Test requests to your favorite API!</h2>
      <Form handleApiCall={setParams} requestParams={state.requestParams} getResults={getResults} setLoading={loading}/>
      <Content data={state.data} type={state.type} history={state.history} requestParams={state.requestParams} loading={state.loading} selectType={selectType}/>
      <Footer />
    </Fragment>
  );
}

export default App;
