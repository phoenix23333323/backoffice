import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="main">
      <h1>CRÉATION</h1>
      <button className="button">
        <Link to="/signin">SE CONNECTER</Link>
      </button>
    </div>
  );
}

export default SignUp;
