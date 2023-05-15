import { useEffect } from 'react';
import { prettyPrintJson } from 'pretty-print-json';
import '../content.scss';


function Results(props) {
  let showTab = (e) => {
    document.querySelector('.json-container').innerHTML = props.data ? prettyPrintJson.toHtml(props.data.body) : null;
    document.querySelector('.results-tab .selected').classList.remove('selected');
    e.target.classList.add('selected');
    let type = e.target.innerHTML.toLowerCase();
    props.selectType(type);
  };

  useEffect(() => {
    let content = null;
    if (props.type === 'response') {
      content = props.data?.body ? prettyPrintJson.toHtml(props.data.body) : null;
    } else if (props.type === 'headers') {
      content = props.data?.headers ? prettyPrintJson.toHtml(props.data.headers) : null;
    } else if (props.type === 'history') {
      if (props.history.length > 0) {
        content = props.history.reduce((acc, line) => {
          return acc += line + '\n';
        }, '');
      } else {
        content = 'No History Available.';
      }
    }
    document.querySelector('.json-container').innerHTML = content;
  }, [props.type, props.data, props.history]);

  return (
    <section>
      <h4>Results</h4>
        <div className='results-tab'>
          <span className='selected' onClick={showTab}>Response</span>
          <span onClick={showTab}>Headers</span>
          <span onClick={showTab}>History</span>
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
