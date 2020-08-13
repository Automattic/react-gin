/* istanbul ignore file */

import { Deed, deed } from 'gin';
// Define your cargo object
export const initialCargo = {
  countA: 0,
  countB: 0,
};

// Define your deeds
export const deeds: Deed[] = [
  deed.action // First is an action deed called increment
    .called('incrementA')
    .thatDoes(({ cargo }) => ({
      countA: cargo.countA + 1,
    })),
  deed.action // First is an action deed called increment
    .called('incrementB')
    .thatDoes(({ cargo }) => ({
      countB: cargo.countB + 1,
    })),
];
