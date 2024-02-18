import React from 'react';
import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { TbListNumbers } from 'react-icons/tb';
import { IoCalendarNumber } from 'react-icons/io5';
import { AiOutlineStop } from 'react-icons/ai';
import { PiClockCountdownFill } from 'react-icons/pi';
import { IoDocumentLock } from 'react-icons/io5';
import { IoShareSocialSharp } from 'react-icons/io5';
import { PiTreeStructureFill } from 'react-icons/pi';

function Home() {
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
        <Link to="/counter" className="app app--enabled">
          <TbListNumbers />
          <p>Counter</p>
        </Link>
        <div className="app app--enabled">
          <IoCalendarNumber />
          <p>Planning</p>
        </div>
        <div className="app app--to-come">
          <IoShareSocialSharp />
          <p>Social Place</p>
          <PiClockCountdownFill className="no-display" />
        </div>
        <div className="app app--disabled">
          <IoDocumentLock />
          <p>GED</p>
          <AiOutlineStop className="no-display" />
        </div>
        <div className="app app--to-come">
          <PiTreeStructureFill />
          <p>GMAO</p>
          <PiClockCountdownFill className="no-display" />
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Home;
