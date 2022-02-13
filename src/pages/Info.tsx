import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Info.css';
import { useContactQuery } from '../services/contactsApi';
import { toast } from 'react-toastify';

const Info = () => {
  const { id } = useParams();
  const { data, error } = useContactQuery(id!);

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong');
    }
  }, [error]);

  return (
    <div>
      <h2>Info</h2>
    </div>
  );
};

export default Info;
