import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import axios from '../../api/axios';

import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

import LoadingBloc from '../../components/LoadingBloc';
const regexEmail = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)^[^ ]+$/;
const schema = z.object({
  email: z.string().email('Vous devez saisir un e-mail valide !'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit être avoir au moins 8 caractères !')
    .max(30, 'Le mot de passe doit être avoir au maximum 30 caractères !')
    .regex(
      regexEmail,
      "Le mot de passe n'est pas conforme, il doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre. Les espaces sont interdits.",
    ),
});
//

function SignUp({ setIsSignup }) {
  const [message, setMessage] = useState();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const handleSubmitRegister = async (data) => {
    try {
      const signupRes = await axios.post('/users/signup', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setMessage(signupRes.data.message);
    } catch (e) {
      setError('root', {
        message: e.response.data.error,
      });
    }
  };

  const handleClickSignin = () => {
    setIsSignup(false);
  };

  return (
    <IconContext.Provider
      value={{ size: '20px', className: 'react-icons react-icons__auth' }}
    >
      <form className="relative" onSubmit={handleSubmit(handleSubmitRegister)}>
        {isSubmitting ? (
          <LoadingBloc />
        ) : (
          <div className="form-bloc form-bloc-auth">
            <div className="form-bloc__title">
              <p>Créer un compte</p>
            </div>
            <div className="form-bloc__inputs">
              <div className="relative">
                <FaUser />
                <input
                  {...register('email')}
                  type="text"
                  autoComplete="off"
                  placeholder="E-mail"
                ></input>
                {errors.email && (
                  <div className="error error__input">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="relative">
                <FaLock />
                <input
                  {...register('password')}
                  type="password"
                  autoComplete="off"
                  placeholder="Mot de passe"
                ></input>
                {errors.password && (
                  <div className="error error__input">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>
            {errors.root && <div className="error">{errors.root.message}</div>}
            <div className="message">{message}</div>
            <div className="form-bloc__buttons">
              <button className="button" type="submit">
                Valider
              </button>
              <button className="button" onClick={handleClickSignin}>
                Se connecter
              </button>
            </div>
          </div>
        )}
      </form>
    </IconContext.Provider>
  );
}

export default SignUp;
