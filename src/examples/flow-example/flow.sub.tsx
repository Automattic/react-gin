/* istanbul ignore file */
import React from 'react';
import { useStore } from '../../';

const Flow = () => {
  const { cargo, deeds } = useStore();
  const incAll = () => deeds.incrementAllAtOnce(1);
  const incInOrder = () => deeds.incrementInOrder(1);
  const incPassThrough = () => deeds.incrementPassThrough(1);

  return (
    <form>
      <button type="button" onClick={incAll}>
        All at Once
      </button>
      <div />
      <button type="button" onClick={incInOrder}>
        In Order
      </button>
      <div />
      <button type="button" onClick={incPassThrough}>
        Processed from previous value
      </button>
      <hr />
      <span>CARGO</span>
      <div>{JSON.stringify(cargo)}</div>
      {/* visualize the cargo object*/}
    </form>
  );
};

export default Flow;
