/* istanbul ignore file */
import React from 'react';
import Store from '../../';
import IncrementForm from './increment-form.sub';
import { initialCargo, deeds } from './store-logic';

const Parent = () => (
  <Store cargo={initialCargo} deeds={deeds}>
    <IncrementForm />
  </Store>
);

export default Parent;
