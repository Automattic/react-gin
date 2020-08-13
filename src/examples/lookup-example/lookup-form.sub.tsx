/* istanbul ignore file */
import React from 'react';
import { useStore } from '../..';
import SubmitButton from './submit-button.sub';

const LookupForm = () => {
  const { cargo, deeds } = useStore(); // Subscribe to the Store
  const setValue = fieldName => e => deeds.setValue(e, fieldName);
  return (
    <form>
      <label>Search: </label>
      <input name="search" value={cargo.search} onChange={setValue('search')} />
      <br />
      <SubmitButton />
      <br />
      <hr />
      <span>CARGO</span>
      <div>{JSON.stringify(cargo)}</div>
      {/* visualize the cargo object*/}
    </form>
  );
};

export default LookupForm;
