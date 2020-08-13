/* istanbul ignore file */
import React from 'react';
import { useStore } from '../..';

const IncrementForm = () => {
  const { cargo } = useStore(); // Subscribe to the Store

  return (
    <form>
      <span>Counter Store CARGO:</span>
      <div>{JSON.stringify(cargo)}</div>
    </form>
  );
};

export default IncrementForm;
