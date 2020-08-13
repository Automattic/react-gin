/* istanbul ignore file */
import React from 'react';
import { useStore } from '../../..';
import styles from './styles.scss';

const UsernameForm = () => {
  const {
    cargo,
    deeds: { setUsername },
  } = useStore(); // Subscribe to the Store
  return (
    <form className={styles.form}>
      <label>Username: </label>
      <input
        name="username"
        value={cargo.username}
        onChange={setUsername} // Call the 'setUsername' deed when the input changes
      />
      <hr />
      <div>CARGO</div>
      <div>{JSON.stringify(cargo)}</div>
      {/* visualize the cargo object*/}
    </form>
  );
};

export default UsernameForm;
