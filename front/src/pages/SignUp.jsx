import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
      <h1>CRÉATION</h1>
      <button className="button">
        <Link to="/signin">SE CONNECTER</Link>
      </button>
    </>
  );
}

export default SignUp;
