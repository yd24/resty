import { useState, Fragment } from 'react';

import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App() {
  //state
  const [data, setData] = useState(null);
  const [requestParams, setParams] = useState({method: 'GET'});
  const [loading, setLoading] = useState(false);

  let callApi = (requestParams) => {
    // mock output
    const mockdata = {
      count: 2,
      results: [
        {name: 'fake thing 1', url: 'http://fakethings.com/1'},
        {name: 'fake thing 2', url: 'http://fakethings.com/2'},
      ],
    };
    setData(mockdata.results);
    console.log(loading);
  }

  return (
    <Fragment>
      <Header />
      {/*<div className='log'>
        <div>Request Method: {requestParams.method}</div>
        <div>URL: {requestParams.url}</div>
  </div>*/}
      <h2>Test requests to your favorite API!</h2>
      <Form handleApiCall={callApi} setParams={setParams} requestParams={requestParams} setLoading={setLoading}/>
      <Results data={data} requestParams={requestParams} />
      <Footer />
    </Fragment>
  );
}

export default App;
