/* istanbul ignore file */
import React from 'react';
import Store from '../../../';
import Settings from '../settings';
import { deeds, initialCargo } from './store-logic';
import UsernameForm from './username-form.sub';
import { USER_STORE } from 'constants/store-names';

const Parent = () => (
  <Store name={USER_STORE} cargo={initialCargo} deeds={deeds}>
    <h3>User-Store</h3>
    <UsernameForm />
    <br />
    <Settings />
  </Store>
);

export default Parent;
