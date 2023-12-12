import { Header } from '@/components/layout/header';
import React from 'react';
import { useParams } from 'react-router-dom';

const EditScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log({ id });
  return (
    <div>
      <Header />
      <h1>Edit post</h1>
      {/* <h1>{id ? 'Update' : 'Create'} post</h1> */}
    </div>
  );
};

export default EditScreen;
