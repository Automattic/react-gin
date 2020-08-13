/* istanbul ignore file */
import React from 'react';
import { useStore } from '../..';

const IncrementForm = () => {
  const { cargo, deeds } = useStore(); // Subscribe to the Store
  return (
    <form>
      <span>Current Count = {cargo.count}</span>
      <br />
      {/* Call the 'increment' deed when the button is clicked*/}
      <button type="button" onClick={deeds.increment}>
        CLICK ME
      </button>
      <br />
      <hr />
      <span>CARGO</span>
      <div>{JSON.stringify(cargo)}</div>
      {/* visualize the cargo object*/}
    </form>
  );
};

export default IncrementForm;

/*
  Using withStore instead of useStore:
  import React from "react";
import { withStore } from "../..";

const IncrementForm = ({cargo, deeds}) => {
  return (
    <form>
      <span>Current Count = {cargo.count}</span>
      <br />
      {/* Call the 'increment' deed when the button is clicked}
      <button type="button" onClick={deeds.increment}>
        CLICK ME
      </button>
      <br />
      <hr />
      <span>CARGO</span>
      <div>{JSON.stringify(cargo)}</div>
      {/* visualize the cargo object}
    </form>
  );
};

export default withStore()(IncrementForm);

*/
