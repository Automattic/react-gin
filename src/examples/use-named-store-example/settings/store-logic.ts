/* istanbul ignore file */
import { deed, Deed } from 'gin';

// Define your cargo object
export const initialCargo = {
  isChecked: false,
};

// Define your deeds
export const deeds: Deed[] = [
  deed.action // First is an action deed called setValue
    .called('toggleCheckbox')
    .thatDoes(({ cargo }) => ({
      isChecked: !cargo.isChecked,
    })),
];
