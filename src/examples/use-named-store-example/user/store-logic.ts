/* istanbul ignore file */
import { deed, Deed } from 'gin';

// Define your cargo object
export const initialCargo = {
  username: '',
};

// Define your deeds
export const deeds: Deed[] = [
  deed.action // First is an action deed called setValue
    .called('setUsername')
    .thatDoes((extras, event) => ({
      username: event.target.value,
    })),
];
