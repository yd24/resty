import { useState, useEffect, Fragment } from 'react';
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
  const [data, setData] = useState(null);
  const [requestParams, setParams] = useState({method: 'GET'});
  const [loading, setLoading] = useState(false);

  let callApi = async(params) => {
    // mock output
    /*const mockdata = {
      count: 2,
      results: [
        {name: 'fake thing 1', url: 'http://fakethings.com/1'},
        {name: 'fake thing 2', url: 'http://fakethings.com/2'},
      ],
    };*/
    setParams(params);
  }

  let request = async(params) => {
    if (params.url) {
      const config = {
        method: params.method,
        url: params.url,
        data: JSON.stringify(params.body),
      };
      let date = new Date();
      date = date.toISOString();
      try {
        let resp = await axios(config);
        let update = {
          body: resp.data, 
          headers: resp.headers, 
          history: null,
        };
        if (data?.history) {
          data.history.push(`${date} - ${params.method} request to ${params.url}`);
          update.history = data.history;
        } else {
          update.history = [`${date} - ${params.method} request to ${params.url}`];
        }
        setData(update);
      } catch(e) {
        console.log('yo');
        let error = {
            body: `Error ${e.response.status}: Invalid request`, 
            headers: `Error ${e.response.status}: Invalid request`,
            history: null,
        };
        if (data?.history) {
          data.history.push(`Error ${e.response.status} from ${params.url} - ${date}`);
        } else {
          data.history = [`Error ${e.response.status} from ${params.url} - ${date}`];
        }
        error.history = data.history;
        setData(error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    request(requestParams);
  }, [requestParams]);

  return (
    <Fragment>
      <Header />
      {/*<div className='log'>
        <div>Request Method: {requestParams.method}</div>
        <div>URL: {requestParams.url}</div>
  </div>*/}
      <h2>Test requests to your favorite API!</h2>
      <Form handleApiCall={callApi} setParams={setParams} requestParams={requestParams} setLoading={setLoading}/>
      <Content data={data} requestParams={requestParams} loading={loading}/>
      <Footer />
    </Fragment>
  );
}

export default App;
