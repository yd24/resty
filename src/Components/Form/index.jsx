import React from 'react';
import './Form.scss';

function Form(props) {
  let handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: props.requestParams?.method ? props.requestParams.method.toUpperCase() : 'GET',
      url: document.querySelector('.url').value,
      body: document.querySelector('.json-body').disabled ? null : document.querySelector('.json-body').value,
    };
    props.setLoading(true);
    props.handleApiCall(formData);
  };

  let select = (e) => {
    props.setParams({url: document.querySelector('.url').value, method: e.target.id.toUpperCase()});
    let n = document.querySelector('.selected')
    if (n) {
      n.classList.remove('selected');
    }
    e.target.className = 'selected';
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label >
        <input className='url' name='url' type='text' placeholder='URL'/>
        <button type="submit">GO!</button>
      </label>
      <label className="methods">
        <span onClick={select} className='selected' id="get">GET</span>
        <span onClick={select} id="post">POST</span>
        <span onClick={select} id="put">PUT</span>
        <span onClick={select} id="delete">DELETE</span>
      </label>
    </form>
  </>
  );
}

export default Form;
