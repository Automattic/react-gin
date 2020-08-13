/* istanbul ignore file */
import { deed, Deed } from 'gin';

// Define your cargo object
export const initialCargo = {};

// Define your deeds
export const deeds: Deed[] = [
  // First is an action deed called setValue
  deed.action.called('setValue').thatDoes((extras, e, inputName) => {
    const value = e.target.value;
    return { [inputName]: value };
  }), // Second is a request deed called submitForm that GETS to /admin/lookup
  deed.request
    .called('submitForm')
    .hits('/search')
    .withVerb('GET')
    .withQueryParams(({ cargo }) => {
      // Take our cargo and convert it to query params
      return { search: cargo.search };
    })
    .thenDoes(res => {
      const searchResult = [res];
      return { searchResult };
    })
    .catchError(({ deeds }, error) => {
      // When fetch errors, handle it here
      deeds.setValue({ target: { value: error.message } }, 'error');
    }),
];
