import { useParams } from 'react-router-dom';

function Client() {
  const { id } = useParams();
  return (
    <>
      <h1>CLIENT</h1>
      <p>Id : {id}</p>
    </>
  );
}

export default Client;
