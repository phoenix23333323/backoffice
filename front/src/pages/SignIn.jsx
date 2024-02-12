import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <>
      <h1>CONNEXION</h1>
      <button className="button">
        <Link to="/home">SE CONNECTER</Link>
      </button>
      <button className="button">
        <Link to="/signup">CRÉER UN COMPTE</Link>
      </button>
    </>
  );
}

export default SignIn;
