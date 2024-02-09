import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div>
      <h1>CREATION</h1>
      <button>
        <Link to="/backoffice/signin">SE CONNECTER</Link>
      </button>
    </div>
  );
}

export default SignUp;
