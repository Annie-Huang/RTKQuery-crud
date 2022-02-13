import React from 'react';
import { Link } from 'react-router-dom';
import { useContactsQuery } from '../services/contactsApi';

const Home = () => {
  // isFetching - When true, indicates that the query is currently fetching, but might have data from an earlier request. This will be true for both the first request fired off, as well as subsequent requests.
  // isLoading - When true, indicates that the query is currently loading for the first time, and has no data yet. This will be true for the first request fired off, but not for subsequent requests.
  const { data, isLoading, error } = useContactsQuery();

  return (
    <div style={{ marginTop: '100px' }}>
      <Link to='/addContact'>
        <button className='btn btn-add'>Add Contact</button>
      </Link>
      <br />
      <br />
    </div>
  );
};

export default Home;
