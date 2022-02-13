import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEdit.css';

const initialState = {
  name: '',
  email: '',
  contact: '',
};

const AddEdit = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, contact } = formValue;
  const navigate = useNavigate();

  const handleInputChange = (e) => {};
  const handleSubmit = (e) => {};

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Enter Name...'
          value={name}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default AddEdit;
