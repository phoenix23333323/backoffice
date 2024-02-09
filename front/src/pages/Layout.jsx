import { Link } from "react-router-dom";

function Layout() {
    return (
        <div>
            <button><Link to='/backoffice/signin'>CONNEXION</Link></button>
            <button><Link to='/backoffice/signup'>CREATION</Link></button>
        </div>
    );
}

export default Layout;