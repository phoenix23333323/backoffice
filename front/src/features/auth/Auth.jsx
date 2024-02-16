import { React, useState } from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Footer from '../../components/Footer';

function Auth() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <>
      <h1>Mon entreprise</h1>
      {!isSignup ? (
        <SignIn setIsSignup={setIsSignup} />
      ) : (
        <SignUp setIsSignup={setIsSignup} />
      )}
      <Footer />
    </>
  );
}

export default Auth;
