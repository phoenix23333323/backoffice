import { Link } from "react-router-dom";

function SignIn() {
    return (
        <div>
            <h1>CONNEXION</h1>
            <button><Link to='/backoffice/home'>SE CONNECTER</Link></button>
        </div>
    );
}

export default SignIn;