/* istanbul ignore file */
import React from 'react';
import { cargo, deeds } from './store-logic';
import Store from '../../';
import Flow from './flow.sub';

const FlowStore = () => (
  <Store cargo={cargo} deeds={deeds}>
    <Flow />
  </Store>
);

export default FlowStore;
