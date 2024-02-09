import { Link } from 'react-router-dom';

import errorImg from '../assets/error404.png';

function Error404() {
  return (
    <div className="main">
      <h1>PAGE INTROUVABLE</h1>
      <p></p>
      <img src={errorImg} alt="Page introuvable"></img>
      <button className="button">
        <Link to="/backoffice/home">RETOURNER A LA PAGE D'ACCUEIL</Link>
      </button>
    </div>
  );
}

export default Error404;
