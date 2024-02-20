import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import useAuth from '../../hooks/useAuth';

import { getCompany, updateCompany } from '../../store/company/companySlice';

import LoadingBloc from '../../components/LoadingBloc';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const schema = z.object({
  name: z.string().min(1, 'Vous devez saisir un nom'),
  address_line: z.string().min(1, 'Vous devez saisir une adresse'),
  address_postcode: z.string().min(1, 'Vous devez saisir un code postal'),
  address_city: z.string().min(1, 'Vous devez saisir une ville'),
  address_country: z.string().min(1, 'Vous devez saisir un pays'),
  email: z.string().email('Vous devez saisir un e-mail valide'),
  telephone: z
    .string()
    .regex(phoneRegex, 'Vous devez siasir un numéro de téléphone valide'),
  website: z.string().min(1, 'Vous devez saisir un site internet'),
});

function Company() {
  const [message, setMessage] = useState();
  const { auth } = useAuth();

  const dispatch = useDispatch();
  const companyId = useSelector((state) => state.company.companyId);
  const company = useSelector((state) => state.company.company);
  const loaded = useSelector((state) => state.company.loaded);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    dispatch(getCompany({ companyId, token: auth.token })).then(
      (resCompany) => {
        setMessage(resCompany.payload.message);
        reset({
          name: resCompany.payload.data.name,
          address_line: resCompany.payload.data.address_line,
          address_postcode: resCompany.payload.data.address_postcode,
          address_city: resCompany.payload.data.address_city,
          address_country: resCompany.payload.data.address_country,
          telephone: resCompany.payload.data.telephone,
          email: resCompany.payload.data.email,
          website: resCompany.payload.data.website,
        });
      },
    );
  }, [companyId]);

  const handleSubmitCompany = async (data) => {
    dispatch(updateCompany({ companyId, data, token: auth.token })).then(
      (resCompany) => {
        setMessage(resCompany.payload.message);
      },
    );
  };

  const isInputEnabled = !auth.admin ? 'disabled' : '';

  return (
    <>
      <h1>ENTREPRISE</h1>
      <form
        className="form-table relative"
        onSubmit={handleSubmit(handleSubmitCompany)}
      >
        {isSubmitting ? (
          <LoadingBloc />
        ) : (
          <div className="form-bloc form-bloc-table">
            <div className="form-bloc__inputs">
              <div className="relative">
                <input
                  {...register('name')}
                  type="text"
                  autoComplete="off"
                  placeholder="Nom"
                  className="disabled"
                  disabled={isInputEnabled}
                ></input>
                {errors.name && (
                  <div className="error error__input">
                    {errors.name.message}
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  {...register('address_line')}
                  type="text"
                  autoComplete="off"
                  placeholder="Adresse"
                  disabled={isInputEnabled}
                ></input>
                {errors.address_line && (
                  <div className="error error__input">
                    {errors.address_line.message}
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  {...register('address_postcode')}
                  type="text"
                  autoComplete="off"
                  placeholder="Code postale"
                  disabled={isInputEnabled}
                ></input>
                {errors.address_postcode && (
                  <div className="error error__input">
                    {errors.address_postcode.message}
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  {...register('address_city')}
                  type="text"
                  autoComplete="off"
                  placeholder="Ville"
                  disabled={isInputEnabled}
                ></input>
                {errors.address_city && (
                  <div className="error error__input">
                    {errors.address_city.message}
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  {...register('address_country')}
                  type="text"
                  autoComplete="off"
                  placeholder="Pays"
                  disabled={isInputEnabled}
                ></input>
                {errors.address_country && (
                  <div className="error error__input">
                    {errors.address_country.message}
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  {...register('telephone')}
                  type="text"
                  autoComplete="off"
                  placeholder="Téléphone"
                  disabled={isInputEnabled}
                ></input>
                {errors.telephone && (
                  <div className="error error__input">
                    {errors.telephone.message}
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  {...register('email')}
                  type="text"
                  autoComplete="off"
                  placeholder="E-mail"
                  disabled={isInputEnabled}
                ></input>
                {errors.email && (
                  <div className="error error__input">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  {...register('website')}
                  type="text"
                  autoComplete="off"
                  placeholder="Site internet"
                  disabled={isInputEnabled}
                ></input>
                {errors.website && (
                  <div className="error error__input">
                    {errors.website.message}
                  </div>
                )}
              </div>
            </div>
            <div className="message">{message}</div>
            <div className={!auth.admin ? 'no-display' : 'form-bloc__buttons'}>
              <button className="button" type="submit">
                Enregistrer
              </button>
            </div>
          </div>
        )}
        {loaded === 0 ? <LoadingBloc /> : null}
      </form>
    </>
  );
}

export default Company;
