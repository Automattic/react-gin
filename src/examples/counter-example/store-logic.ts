/* istanbul ignore file */

import { deed, Deed } from 'gin';
// Define your cargo object
export const initialCargo = {
  count: 0,
};

// Define your deeds
export const deeds: Deed[] = [
  deed.action // First is an action deed called increment
    .called('increment')
    // tslint:disable-next-line: ter-prefer-arrow-callback only-arrow-functions
    .thatDoes(function({ cargo }) {
      return {
        count: cargo.count + 1,
      };
    }),
];
