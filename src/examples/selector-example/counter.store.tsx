/* istanbul ignore file */
import React from 'react';
import Store from '../../';
import IncrementFormA from './increment-form-a.sub';
import IncrementFormB from './increment-form-b.sub';
import StoreDisplay from './store-display.sub';
import { initialCargo, deeds } from './store-logic';

const Parent = () => (
  <Store cargo={initialCargo} deeds={deeds}>
    <StoreDisplay />
    <hr />
    <hr />
    <IncrementFormA />
    <hr />
    <hr />
    <IncrementFormB />
  </Store>
);

export default Parent;
