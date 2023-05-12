import '../content.scss';

function JSONForm(props) {
  return (
    <section>
      <h4>Insert JSON Data</h4>
      {(props.requestParams?.method === 'POST' || props.requestParams?.method === 'PUT')
        ?
        <textarea className='json-body'></textarea>
        :
        <textarea className='json-body' disabled={true}></textarea>
      }
    </section>
  );
}

export default JSONForm;