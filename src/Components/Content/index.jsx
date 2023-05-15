import Results from './Results';
import JSONForm from './JSONForm';

function Content(props) {
  return (
    <div>
      <Results data={props.data} type={props.type} history={props.history} loading={props.loading} selectType={props.selectType}/>
      <JSONForm requestParams={props.requestParams}/>
    </div>
  );
}

export default Content;