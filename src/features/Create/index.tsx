import { Header } from '@/components/layout/header';
import React from 'react';
// import { useParams } from 'react-router-dom';

const CreateScreen: React.FC = () => {
  //   const { id } = useParams<{ id: string }>();
  return (
    <div>
      <Header />
      <h1>Create post</h1>
      {/* <h1>{id ? 'Update' : 'Create'} post</h1> */}
    </div>
  );
};

export default CreateScreen;
