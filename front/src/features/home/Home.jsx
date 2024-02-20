import React from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { IconContext } from 'react-icons';
import { TbListNumbers } from 'react-icons/tb';
import { IoCalendarNumber } from 'react-icons/io5';
import { AiOutlineStop } from 'react-icons/ai';
import { PiClockCountdownFill } from 'react-icons/pi';
import { IoDocumentLock } from 'react-icons/io5';
import { IoShareSocialSharp } from 'react-icons/io5';
import { PiTreeStructureFill } from 'react-icons/pi';

function Home() {
  const { auth } = useAuth();
  const isAppAcces = !auth.admin ? 'app app--disabled' : 'app app--enabled';
  const appEnabled = 'app app--enabled';
  const appToCome = 'app app--to-come';

  return (
    <IconContext.Provider
      value={{ size: '80%', className: 'react-icons react-icons__apps' }}
    >
      <h1>PAGE D'ACCUEIL</h1>
      <div className="home__presentation">
        <p>
          Gérer les données de votre entreprise, de vos clients, de vos
          fournisseurs, et des utilisateurs grâce au menu de navigation.
        </p>
        <p>
          Vous pouvez accéder aux différentes applications depuis cette page
          d'accueil (au clique sur le logo en haut à gauche).
        </p>
      </div>
      <div className="home__apps">
        <Link to="/counter" className={appEnabled}>
          <TbListNumbers />
          <p>Counter</p>
          <AiOutlineStop className="no-display" />
        </Link>
        <div className={appEnabled}>
          <IoCalendarNumber />
          <p>Planning</p>
          <AiOutlineStop className="no-display" />
        </div>
        <div className={appToCome}>
          <IoShareSocialSharp />
          <p>Social Place</p>
          <PiClockCountdownFill className="no-display" />
        </div>
        <div className={isAppAcces}>
          <IoDocumentLock />
          <p>GED</p>
          <AiOutlineStop className="no-display" />
        </div>
        <div className={appToCome}>
          <PiTreeStructureFill />
          <p>GMAO</p>
          <PiClockCountdownFill className="no-display" />
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Home;
