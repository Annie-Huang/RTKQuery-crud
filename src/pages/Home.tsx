import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useContactsQuery,
  useDeleteContactMutation,
} from '../services/contactsApi';
import './Home.css';

const Home = () => {
  // isFetching - When true, indicates that the query is currently fetching, but might have data from an earlier request. This will be true for both the first request fired off, as well as subsequent requests.
  // isLoading - When true, indicates that the query is currently loading for the first time, and has no data yet. This will be true for the first request fired off, but not for subsequent requests.
  const { data, isLoading, error } = useContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong');
    }
  }, [error]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  // Official example doesn't use async await, it instead do then function:
  // const handleAddPost = () => addPost(post).then(() => setPost(initialValue));
  const handleDelete = async (id: string) => {
    if (
      window.confirm('Are you sure that you wanted to delete that contact?')
    ) {
      await deleteContact(id);
      toast.success('Contact Deleted Successfully');
    }
  };

  return (
    <div style={{ marginTop: '100px', display: 'grid', placeItems: 'center' }}>
      <Link to='/addContact'>
        <button className='btn btn-add'>Add Contact</button>
      </Link>
      <br />
      <br />
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contact</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: number) => (
            <tr key={item.id}>
              <th scope='row'>{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>
                <Link to={`/editContact/${item.id}`}>
                  <button className='btn btn-edit'>Edit</button>
                </Link>
                <button
                  className='btn btn-delete'
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <Link to={`/info/${item.id}`}>
                  <button className='btn btn-view'>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
