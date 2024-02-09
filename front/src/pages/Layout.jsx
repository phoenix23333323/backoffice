import { Link } from 'react-router-dom';

function Layout() {
  return (
    <div className="main">
      <button className="button">
        <Link to="/backoffice/signin">CONNEXION</Link>
      </button>
      <button className="button">
        <Link to="/backoffice/signup">CRÉATION</Link>
      </button>
    </div>
  );
}

export default Layout;
