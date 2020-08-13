/* istanbul ignore file */
import React from 'react';
import Store from '../../';
import LookupForm from './lookup-form.sub';
import { initialCargo, deeds } from './store-logic';
// First initialize our cargo and deeds ^

// Then pass them to our Store
const Parent = () => (
  <Store cargo={initialCargo} deeds={deeds}>
    <LookupForm />
  </Store>
);

export default Parent;
