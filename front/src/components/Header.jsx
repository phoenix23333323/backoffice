import { NavLink, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

import { IconContext } from 'react-icons';
import { PiBuildingsFill } from 'react-icons/pi';
import { LiaUserTieSolid } from 'react-icons/lia';
import { LiaUserTagSolid } from 'react-icons/lia';
import { LiaUsersCogSolid } from 'react-icons/lia';
import { MdLogout } from 'react-icons/md';

import Logo from '../assets/logo.png';

function Header() {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <IconContext.Provider
      value={{ size: '30px', className: 'react-icons react-icons__nav' }}
    >
      <header className="header">
        <nav className="header-nav">
          <div className="header-nav__logo">
            <NavLink to="/">
              <img src={Logo} alt="Logo" title="Page d'accueil"></img>
            </NavLink>
          </div>
          <div className="header-nav__navigation">
            <NavLink to="/company">
              <PiBuildingsFill title="Entreprise" />
            </NavLink>
            <NavLink to="/clients">
              <LiaUserTieSolid title="Clients" />
            </NavLink>
            <NavLink to="/suppliers">
              <LiaUserTagSolid title="Fournisseurs" />
            </NavLink>
            <NavLink to="/users">
              <LiaUsersCogSolid title="Utilisateurs" />
            </NavLink>
          </div>
          <div className="header-nav__logout">
            <button onClick={handleClickLogout}>
              <MdLogout title="Se déconnecter" />
            </button>
          </div>
        </nav>
      </header>
    </IconContext.Provider>
  );
}

export default Header;
