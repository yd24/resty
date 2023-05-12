import { useEffect } from 'react';
import { prettyPrintJson } from 'pretty-print-json';
import './results.scss';


function Results(props) {

  let showHeaders = () => {
    document.querySelector('.json-container').innerHTML = props.data ? prettyPrintJson.toHtml(props.data.headers) : null;
    document.querySelector('.results-tab').children[0].classList.remove('selected');
    document.querySelector('.results-tab').children[1].classList.add('selected');
  };

  let showResponse = () => {
    document.querySelector('.json-container').innerHTML = props.data ? prettyPrintJson.toHtml(props.data.body) : null;
    document.querySelector('.results-tab').children[1].classList.remove('selected');
    document.querySelector('.results-tab').children[0].classList.add('selected');
  };

  useEffect(() => {
    let results = document.querySelector('.json-container');
    results.innerHTML = props.data ? prettyPrintJson.toHtml(props.data.body) : null;
  });

  return (
    <div>
      <section>
      <h4>Results</h4>
        <div className='results-tab'>
          <span className='selected' onClick={showResponse}>Response</span>
          <span onClick={showHeaders}>Headers</span>
        </div>
        {props.loading
          &&
          <p>Loading...</p>
        }
        <pre className='json-container' role='code'></pre>
      </section>

      <section>
        <h4>Insert JSON Data</h4>
        {(props.requestParams?.method === 'POST' || props.requestParams?.method === 'PUT')
          ?
          <textarea className='json-body'></textarea>
          :
          <textarea className='json-body' disabled={true}></textarea>
        }
      </section>
    </div>
  );
}

export default Results;
