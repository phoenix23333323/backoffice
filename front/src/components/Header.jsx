import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav>
        <NavLink to="/home">Logo</NavLink>
        <NavLink to="/company">Entreprise</NavLink>
        <NavLink to="/clients">Clients</NavLink>
        <NavLink to="/suppliers">Fournisseurs</NavLink>
        <NavLink to="/users">Utilisateurs</NavLink>
        <NavLink to="/signin">Déconnexion</NavLink>
      </nav>
    </header>
  );
}

export default Header;
