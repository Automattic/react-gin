/* istanbul ignore file */
import React from 'react';
import { useStore } from '../..';

const SubmitButton = () => {
  const { deeds } = useStore(); // Subscribe to the Store
  return (
    <button type="button" onClick={deeds.submitForm}>
      {/* When button is clicked, call our 'submitForm' deed */}
      Submit
    </button>
  );
};

export default SubmitButton;
