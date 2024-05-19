import React, { useState } from 'react';
import './Form.css';

function Form() {
  const [form, setForm] = useState({
    baseline_value: "",
    accelerations: "",
    fetal_movement: "",
    uterine_contractions: "",
    light_decelerations: "",
    severe_decelerations: "",
    prolongued_decelerations: "",
    abnormal_short_term_variability: "",
    mean_value_of_short_term_variability: "",
    percentage_of_time_with_abnormal_long_term_variability: "",
    mean_value_of_long_term_variability: "",
    histogram_width: "",
    histogram_min: "",
    histogram_max: "",
    histogram_number_of_peaks: "",
    histogram_number_of_zeroes: "",
    histogram_mode: "",
    histogram_mean: "",
    histogram_median: "",
    histogram_variance: "",
    histogram_tendency: ""
  });
  const [result, setResult] = useState(""); //result display

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const form_data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      form_data.append(key, value);
    });
  
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: form_data
    })
    .then(response => response.json()) // Assuming response is JSON
    .then(data => {
      setResult(data.pred);
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

  const columns = [
    'baseline_value', 'accelerations', 'fetal_movement', 'uterine_contractions',
    'light_decelerations', 'severe_decelerations', 'prolongued_decelerations',
    'abnormal_short_term_variability', 'mean_value_of_short_term_variability',
    'percentage_of_time_with_abnormal_long_term_variability',
    'mean_value_of_long_term_variability', 'histogram_width', 'histogram_min',
    'histogram_max', 'histogram_number_of_peaks', 'histogram_number_of_zeroes',
    'histogram_mode', 'histogram_mean', 'histogram_median', 'histogram_variance',
    'histogram_tendency'
  ];

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h4 className="form-title">Fetal Health Prediction</h4>
        <div className="form-column">
          {columns.map((column, index) => (
            <input
              key={index}
              type="number"
              step="0.01" // Allow decimals
              name={column}
              onChange={onChange}
              placeholder={column.replace(/_/g, " ")} // Replace underscores with spaces for placeholder text
              className="form-input"
            />
          ))}
        </div>
        <button type="submit" className="form-button">Predict</button>
      </form>
      {result && <div className="result">{result}</div>}
    </div>
  );
}

export default Form;