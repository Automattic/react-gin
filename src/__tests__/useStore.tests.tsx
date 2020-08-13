import { mount } from 'enzyme';
import React from 'react';
import { useNamedStore, useStore } from '../';
import { StoreContext } from '../components/storeContext';

jest.mock('../components/useNamedStore');
// tslint:disable-next-line: no-unnecessary-initializer
const TC = ({ selector = undefined }) => {
  useStore(selector);
  return null;
};

describe('useStore', () => {
  const testFn = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('gets name from context', () => {
    // @ts-ignore
    useNamedStore.mockImplementationOnce((name, selector) => {
      testFn(name);
    });
    const wrapper = mount(
      <StoreContext.Provider value={{ name: 'name' }}>
        <TC />
      </StoreContext.Provider>,
    );
    expect(testFn).toHaveBeenCalledWith('name');
  });

  it('handles selector', () => {
    // @ts-ignore
    useNamedStore.mockImplementation((name, selector) => testFn(selector));
    const wrapper = mount(
      <StoreContext.Provider value={{ name: 'name' }}>
        <TC selector={'selector'} />
      </StoreContext.Provider>,
    );
    expect(testFn).toHaveBeenCalledWith('selector');
  });
});
