/* istanbul ignore file */
import React, { useRef } from 'react';
import { useStore } from '../..';

const IncrementForm = () => {
  const { cargo, deeds } = useStore(cargo => ({ countB: cargo.countB })); // Subscribe to the Store
  const updateCount = useRef(0);
  updateCount.current += 1;
  return (
    <form>
      <div>B Incrementer</div>
      <div>Times Re-Rendered: {updateCount.current - 1}</div>
      <div>CARGO</div>
      <div>{JSON.stringify(cargo)}</div>
      <hr />
      <button type="button" onClick={deeds.incrementB}>
        UPDATE B
      </button>
    </form>
  );
};

export default IncrementForm;
