import { useEffect, useReducer, Fragment } from 'react';
import { initialState, dataReducer, callAPI, showResults, setLoading, repeatRequest } from './reducer/data';
import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Content from './Components/Content';

function App() {
  //state
  const [state, dispatch] = useReducer(dataReducer, initialState);

  console.log('hello', state);

  let setParams = (params) => {
    console.log('params', params);
    dispatch(callAPI(params));
  };

  let loading = () => {
    dispatch(setLoading());
  }

  let getResults = () => {
    dispatch(showResults(state.requestParams));
  };

  //data.history.push(`Error ${e.response.status} from ${params.url} - ${date}`);
  //data.history.push(`${date} - ${params.method} request to ${params.url}`);

  return (
    <Fragment>
      <Header />
      <h2>Test requests to your favorite API!</h2>
      <Form handleApiCall={setParams} requestParams={state.requestParams} getResults={getResults}/>
      <Content data={state.data} requestParams={state.requestParams} loading={state.loading}/>
      <Footer />
    </Fragment>
  );
}

export default App;
