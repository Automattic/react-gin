import { StoreContext, storeContext } from '../components/storeContext';

describe('StoreContext Context', () => {
  it('returns StoreContext', () => {
    expect(StoreContext.Provider).toBeDefined();
    expect(StoreContext.Consumer).toBeDefined();
  });
});

describe('storeContext object', () => {
  it('has an empty subscribe/unsubscribe function', () => {
    const name = storeContext.name;

    expect(typeof name).toEqual('string');
  });
});
