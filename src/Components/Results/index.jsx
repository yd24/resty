import React from 'react';
import './results.scss';


function Results(props) {
  return (
    <div>
      <section>
        <h4>Results:</h4>
        <pre className='json-container' role='results'>{props.data ? JSON.stringify(props.data, null, 2) : null}</pre>
      </section>

      <section>
        <h4>Insert JSON Data</h4>
        {(props.requestParams?.method === 'POST' || props.requestParams?.method === 'PUT')
          ?
          <textarea></textarea>
          :
          <textarea disabled={true}></textarea>
        }
      </section>
    </div>
  );
}

export default Results;
