import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className="main">
      <h1>CONNEXION</h1>
      <button className="button">
        <Link to="/home">SE CONNECTER</Link>
      </button>
      <button className="button">
        <Link to="/signup">CRÉER UN COMPTE</Link>
      </button>
    </div>
  );
}

export default SignIn;
