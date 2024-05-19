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
    form_data.append("1", form.baseline_value);
    form_data.append("2", form.accelerations);
    form_data.append("3", form.fetal_movement);
    form_data.append("4", form.uterine_contractions);
    form_data.append("5", form.light_decelerations);
    form_data.append("6", form.severe_decelerations);
    form_data.append("7", form.prolongued_decelerations);
    form_data.append("8", form.abnormal_short_term_variability);
    form_data.append("9", form.mean_value_of_short_term_variability);
    form_data.append("10", form.percentage_of_time_with_abnormal_long_term_variability);
    form_data.append("11", form.mean_value_of_long_term_variability);
    form_data.append("12", form.histogram_width);
    form_data.append("13", form.histogram_min);
    form_data.append("14", form.histogram_max);
    form_data.append("15", form.histogram_number_of_peaks);
    form_data.append("16", form.histogram_number_of_zeroes);
    form_data.append("17", form.histogram_mode);
    form_data.append("18", form.histogram_mean);
    form_data.append("19", form.histogram_median);
    form_data.append("20", form.histogram_variance);
    form_data.append("21", form.histogram_tendency);

  
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: form_data
    })
    .then(response => response.text()) // Assuming response is JSON
    .then(html =>{
      setResult(html);
    })
    .then(data => {
      // Handle response data, update state, etc.
      console.log(data); // For demonstration, log the response data
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
        <h4 className="form-title">TinyGuardian Fetal Disease Predictor</h4>
        <div className="form-column">
          <input
            type="text"
            name="baseline_value"
            onChange={onChange}
            placeholder="Baseline Value"
            className="form-input"
          />
         <input
          type="text"
          name="accelerations"
          onChange={onChange}
          placeholder="Accelerations"
          className="form-input"
        />
        <input
          type="text"
          name="fetal_movement"
          onChange={onChange}
          placeholder="Fetal Movement"
          className="form-input"
        />
        <input
  type="text"
  name="uterine_contractions"
  onChange={onChange}
  placeholder="Uterine Contractions"
  className="form-input"
/>
<input
  type="text"
  name="light_decelerations"
  onChange={onChange}
  placeholder="Light Decelerations"
  className="form-input"
/>
<input
  type="text"
  name="severe_decelerations"
  onChange={onChange}
  placeholder="Severe Decelerations"
  className="form-input"
/>
<input
  type="text"
  name="prolongued_decelerations"
  onChange={onChange}
  placeholder="Prolongued Decelerations"
  className="form-input"
/>
<input
  type="text"
  name="abnormal_short_term_variability"
  onChange={onChange}
  placeholder="Abnormal Short Term Variability"
  className="form-input"
/>
<input
  type="text"
  name="mean_value_of_short_term_variability"
  onChange={onChange}
  placeholder="Mean Value of Short Term Variability"
  className="form-input"
/>
<input
  type="text"
  name="percentage_of_time_with_abnormal_long_term_variability"
  onChange={onChange}
  placeholder="Percentage of Time with Abnormal Long Term Variability"
  className="form-input"
/>
<input
  type="text"
  name="mean_value_of_long_term_variability"
  onChange={onChange}
  placeholder="Mean Value of Long Term Variability"
  className="form-input"
/>
<input
  type="text"
  name="histogram_width"
  onChange={onChange}
  placeholder="Histogram Width"
  className="form-input"
/>
<input
  type="text"
  name="histogram_min"
  onChange={onChange}
  placeholder="Histogram Min"
  className="form-input"
/>
<input
  type="text"
  name="histogram_max"
  onChange={onChange}
  placeholder="Histogram Max"
  className="form-input"
/>
<input
  type="text"
  name="histogram_number_of_peaks"
  onChange={onChange}
  placeholder="Histogram Number of Peaks"
  className="form-input"
/>
<input
  type="text"
  name="histogram_number_of_zeroes"
  onChange={onChange}
  placeholder="Histogram Number of Zeroes"
  className="form-input"
/>
<input
  type="text"
  name="histogram_mode"
  onChange={onChange}
  placeholder="Histogram Mode"
  className="form-input"
/>
<input
  type="text"
  name="histogram_mean"
  onChange={onChange}
  placeholder="Histogram Mean"
  className="form-input"
/>
<input
  type="text"
  name="histogram_median"
  onChange={onChange}
  placeholder="Histogram Median"
  className="form-input"
/>
<input
  type="text"
  name="histogram_variance"
  onChange={onChange}
  placeholder="Histogram Variance"
  className="form-input"
/>
<input
  type="text"
  name="histogram_tendency"
  onChange={onChange}
  placeholder="Histogram Tendency"
  className="form-input"
/>





        </div>
        <button type="submit" className="form-button">Submit Form</button>
        {result && <div dangerouslySetInnerHTML={{ __html: result }} className="result" />}
      </form>
    </div>
  );
}

export default Form;