/* istanbul ignore file */
import React from 'react';
import Store from '../../../';
import SettingsForm from './settings-form.sub';
import { deeds, initialCargo } from './store-logic';

const NestedParent = () => {
  return (
    <Store cargo={initialCargo} deeds={deeds}>
      <h3>Settings-Store</h3>
      <SettingsForm />
    </Store>
  );
};

export default NestedParent;
