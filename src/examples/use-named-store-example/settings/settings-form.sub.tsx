/* istanbul ignore file */
import React from 'react';
import { useStore, useNamedStore } from '../../..';
import styles from './styles.scss';
import { USER_STORE } from 'constants/store-names';

const SettingsForm = () => {
  const {
    cargo: { username },
  } = useNamedStore(USER_STORE); // Subscribe to  user-store
  const {
    cargo: { isChecked },
    deeds: { toggleCheckbox },
  } = useStore(); // Subscribe to the Store
  return (
    <form className={styles.form}>
      <h6>Connected to user-store & settings-store</h6>
      <div>Editing settings for {username}</div>
      <label>Enable Push Notifications? </label>
      <input
        role="checkbox"
        aria-checked={isChecked}
        type="checkbox"
        value={isChecked}
        onChange={toggleCheckbox}
      />
      <hr />
      <div>CARGO</div>
      <div>{JSON.stringify({ username, isChecked })}</div>
      {/* visualize the cargo object*/}
    </form>
  );
};

export default SettingsForm;
