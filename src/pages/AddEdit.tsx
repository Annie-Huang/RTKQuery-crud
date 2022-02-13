import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEdit.css';
import { toast } from 'react-toastify';
import { useAddContactMutation } from '../services/contactsApi';

const initialState = {
  name: '',
  email: '',
  contact: '',
};

const AddEdit = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [addContact] = useAddContactMutation();
  const { name, email, contact } = formValue;
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    // Very smart way to set value to the correct field, I never thought of this...
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error('Please provide value into each input field');
    } else {
      await addContact(formValue);
      navigate('/');
      toast.success('Contact Added Successfully');
    }
  };

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
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Enter Email...'
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor='contact'>Contact</label>
        <input
          type='number'
          name='contact'
          id='contact'
          placeholder='Enter Contact no...'
          value={contact}
          onChange={handleInputChange}
        />
        <input type='submit' value='Add' />
      </form>
    </div>
  );
};

export default AddEdit;
