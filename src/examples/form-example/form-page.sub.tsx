/* istanbul ignore file */
import React from 'react';
import { useStore } from '../..';
import SubmitButton from './submit-button.sub';

const Child = () => {
  const { cargo, deeds } = useStore(); // Subscribe to the Store
  return (
    <form>
      <label>Username: </label>
      <input
        name="username"
        value={cargo.username}
        // tslint:disable-next-line: jsx-no-lambda
        onChange={e => deeds.setValue(e, 'username')} // Call the 'setValue' deed when the input changes
      />
      <br />
      <label>Password: </label>
      <input
        name="password"
        value={cargo.password} // Use the cargo value
        // tslint:disable-next-line: jsx-no-lambda
        onChange={e => deeds.setValue(e, 'password')} // Call the 'setValue' deed when the input changes
      />
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

export default Child;
