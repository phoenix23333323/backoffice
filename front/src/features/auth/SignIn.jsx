import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

import LoadingBloc from '../../components/LoadingBloc';

const schema = z.object({
  email: z.string().email('Vous devez saisir un e-mail valide !'),
  password: z.string().min(1, 'Vous devez saisir un mot de passe !'),
});

function SignIn({ setIsSignup }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmitLogin = async (data) => {
    try {
      const signinRes = await axios.post('/users/signin', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const admin = signinRes?.data?.admin;
      const token = signinRes?.data?.token;
      const userId = signinRes?.data?.userId;
      setAuth({ admin, token, userId });
      navigate('/', { replace: true });
    } catch (e) {
      if (!e?.response) {
        setError('root', {
          message: 'Le serveur ne réponds pas',
        });
      } else if (e.response.data.error) {
        setError('root', {
          message: e.response.data.error,
        });
      } else {
        setError('root', {
          message: e.response.request.statusText,
        });
      }
    }
  };

  const handleClickSignup = () => {
    setIsSignup(true);
  };

  return (
    <IconContext.Provider
      value={{ size: '20px', className: 'react-icons react-icons__auth' }}
    >
      <form className="relative" onSubmit={handleSubmit(handleSubmitLogin)}>
        {isSubmitting ? (
          <LoadingBloc />
        ) : (
          <div className="form-bloc form-bloc-auth">
            <div className="form-bloc__title">
              <p>Connexion</p>
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
            <div className="form-bloc__buttons">
              <button className="button" type="submit">
                Valider
              </button>
              <button className="button" onClick={handleClickSignup}>
                Créer un compte
              </button>
            </div>
          </div>
        )}
      </form>
    </IconContext.Provider>
  );
}

export default SignIn;
