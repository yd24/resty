import Results from './Results';
import JSONForm from './JSONForm';

function Content(props) {
  return (
    <div>
      <Results data={props.data} loading={props.loading}/>
      <JSONForm requestParams={props.requestParams}/>
    </div>
  );
}

export default Content;