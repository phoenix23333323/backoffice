import { useRouteError } from 'react-router';
import { useNavigate } from 'react-router-dom';

function PageError() {
  const error = useRouteError();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <>
      <h1>UNE ERREUR EST SURVENUE</h1>
      <div className="main-error">
        <p className="error">{error?.error?.toString() ?? error?.toString()}</p>
        <button className="button" onClick={goBack}>
          Revenir en arrière
        </button>
      </div>
    </>
  );
}

export default PageError;
