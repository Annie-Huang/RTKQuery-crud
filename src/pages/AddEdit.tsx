import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEdit.css';
import { toast } from 'react-toastify';
import {
  useAddContactMutation,
  useContactQuery,
  useUpdateContactMutation,
} from '../services/contactsApi';

const initialState = {
  name: '',
  email: '',
  contact: '',
};

const AddEdit = () => {
  // You cannot form a type to formValue, because formValue can include id if it's retrieve from the DB.
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const { name, email, contact } = formValue;
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error } = useContactQuery(id!);

  useEffect(() => {
    if (error && id) {
      toast.error('Something went wrong');
    }
  }, [error]);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        // When it's in edit mode, the data getting from server includes the id,
        // that is why when you update the the contact the id will auto be sent as part of the formValue
        setFormValue({ ...data });
      }
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, data]);

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
      if (editMode) {
        console.log('formValue=', formValue);
        await updateContact(formValue);
        navigate('/');
        setEditMode(false);
        toast.success('Contact Updated Successfully');
      } else {
        await addContact(formValue);
        navigate('/');
        toast.success('Contact Added Successfully');
      }
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
        <input type='submit' value={editMode ? 'Update' : 'Add'} />
      </form>
    </div>
  );
};

export default AddEdit;
