import { useRouteError } from 'react-router';
import { Link } from 'react-router-dom';

function PageError() {
  const error = useRouteError();
  return (
    <>
      <h1>UNE ERREUR EST SURVENUE</h1>
      <p>{error?.error?.toString() ?? error?.toString()}</p>
      <button className="button">
        <Link to="/">RETOURNER A LA PAGE D'ACCUEIL</Link>
      </button>
    </>
  );
}

export default PageError;