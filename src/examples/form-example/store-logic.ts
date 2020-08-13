/* istanbul ignore file */
import { deed, Deed } from 'gin';
// Define your cargo object
export const initialCargo = {
  username: '',
  password: '',
  error: '',
};

// Define your deeds
export const deeds: Deed[] = [
  // First is an action deed called setValue
  deed.action.called('setValue').thatDoes((extras, e, inputName) => {
    const value = e.target.value;
    return {
      [inputName]: value,
    };
  }),

  // Second is a request deed called submitForm that POSTS to /api
  deed.request
    .called('submitForm')
    .hits('/api')
    .withVerb('POST')
    .withQueryParams(({ cargo }) => {
      // Take our cargo and convert it to query params
      return {
        username: cargo.username,
        password: cargo.password,
      };
    })
    .catchError(({ deeds }, error) => {
      // When fetch errors, handle it here
      deeds.setValue({ target: { value: error.message } }, 'error');
    }),
];
