/* istanbul ignore file */
import React, { useRef } from 'react';
import { useStore } from '../..';

const IncrementForm = () => {
  const { cargo, deeds } = useStore(cargo => ({ countA: cargo.countA })); // Subscribe to the Store
  const updateCount = useRef(0);
  updateCount.current += 1;
  return (
    <form>
      <div>A Incrementer</div>
      <div>Times Re-Rendered: {updateCount.current - 1}</div>
      <div>CARGO</div>
      <div>{JSON.stringify(cargo)}</div>
      <hr />
      <button type="button" onClick={deeds.incrementA}>
        UPDATE A
      </button>
    </form>
  );
};

export default IncrementForm;
