import { useState } from 'react';
import './Form.css';

function Form() {
  const [form, setForm] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
    21: "",
    22: ""
  });
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const form_data = new FormData();
    for (let key in form) {
      form_data.append(key, form[key]);
    }

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: form_data
    })
    .then(response => response.text())
    .then(html => {
      setResult(html);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h4 className="form-title">Diabeat: The #1 Diabetes Prediction Model</h4>
        <div className="form-column">
          <input
            type="text"
            name="1"
            onChange={onChange}
            placeholder="Input 1"
            className="form-input"
          />
          <input
            type="text"
            name="2"
            onChange={onChange}
            placeholder="Input 2"
            className="form-input"
          />
          {/* Add the rest of the input fields */}
        </div>
        <button type="submit" className="form-button">Submit Form</button>
        {result && <div dangerouslySetInnerHTML={{ __html: result }} className="result" />}
      </form>
    </div>
  );
}

export default Form;
