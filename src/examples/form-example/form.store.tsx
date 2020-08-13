/* istanbul ignore file */
import React from 'react';
import Store from '../../';
import FormPage from './form-page.sub';
import { initialCargo, deeds } from './store-logic';
// First initialize our cargo and deeds ^

// Then pass them to our Store
const Parent = () => (
  <Store cargo={initialCargo} deeds={deeds}>
    <FormPage />
  </Store>
);

export default Parent;
