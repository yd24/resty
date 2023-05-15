import { useEffect } from 'react';
import { prettyPrintJson } from 'pretty-print-json';
import '../content.scss';


function Results(props) {
  let showTab = (e, data) => {
    document.querySelector('.json-container').innerHTML = data;
    document.querySelector('.results-tab .selected').classList.remove('selected');
    e.target.classList.add('selected');
  };

  let showHeaders = (e) => {
    let data = props.data ? prettyPrintJson.toHtml(props.data.headers) : null;
    showTab(e, data);
  };

  let showResponse = (e) => {
    let data = props.data ? prettyPrintJson.toHtml(props.data.body) : null;
    showTab(e, data);
  };

  let showHistory = (e) => {
    if (props.data?.history) {
      let data = props.data.history.reduce((acc, line) => {
        return acc += line + '\n';
      }, '');
      console.log(data);
      showTab(e, data);
    } else {
      showTab(e, 'No History Available');
    }
  };

  useEffect(() => {
    let results = document.querySelector('.json-container');
    if (document.querySelector('.json-container .selected')) {
      document.querySelector('.json-container .selected').classList.remove('selected');
    }
    document.querySelector('.results-tab').children[0].classList.add('selected');
    results.innerHTML = props.data ? prettyPrintJson.toHtml(props.data.body) : null;
  });

  return (
    <section>
      <h4>Results</h4>
        <div className='results-tab'>
          <span onClick={showResponse}>Response</span>
          <span onClick={showHeaders}>Headers</span>
          <span onClick={showHistory}>History</span>
        </div>
        {props.loading
          &&
          <p>Loading...</p>
        }
        <pre className='json-container' role='code'></pre>
    </section>
  );
}

export default Results;
