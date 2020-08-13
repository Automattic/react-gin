import { mount } from 'enzyme';
import { StoreContext } from '../components/storeContext';
import { useNamedStore } from '../';
import { Subscriber, deed } from 'gin';
import React from 'react';

const mockFn = jest.fn();
const mockOnFn = jest.fn();
const mockUnsubFn = jest.fn();

jest.mock('gin', () => ({
  __esModule: true,
  default: {},
  Subscriber: jest.fn(() => ({
    subscribe: () => null,
    on: mockOnFn,
    cargo: 'cargo',
    deeds: 'deeds',
  })),
}));
describe('useNamedStore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handles initial flow', () => {
    // spy on all react hooks
    const refSpy = jest
      .spyOn(React, 'useRef')
      .mockImplementation(initial => ({ current: initial }));
    const effectSpy = jest.spyOn(React, 'useEffect').mockImplementation(cb => cb());
    const stateSpy = jest.spyOn(React, 'useState').mockImplementation(initial => [initial, mockFn]);

    // Call our hook
    const { deeds } = useNamedStore('storeName');

    // Assert on our spys
    expect(refSpy).toHaveBeenCalled();
    expect(Subscriber).toHaveBeenCalledWith({
      selector: expect.any(Function),
      storeNames: ['storeName'],
    });

    expect(effectSpy).toHaveBeenCalled();
    expect(stateSpy).toHaveBeenCalledWith('cargo');
    expect(mockOnFn).toHaveBeenCalled();
    expect(deeds).toEqual('deeds');
  });

  it('handles array of stores', () => {
    // Test the selector
    // @ts-ignore
    Subscriber.mockImplementationOnce(({ selector }) => {
      expect(selector('x')).toEqual('x');
      return {
        subscribe: () => null,
        on: mockOnFn,
        cargo: 'cargo',
        deeds: 'deeds',
      };
    });
    // spy on all react hooks
    const refSpy = jest
      .spyOn(React, 'useRef')
      .mockImplementation(initial => ({ current: initial }));
    const effectSpy = jest.spyOn(React, 'useEffect').mockImplementation(cb => cb());
    const stateSpy = jest.spyOn(React, 'useState').mockImplementation(initial => [initial, mockFn]);

    // Call our hook
    const { deeds } = useNamedStore(['storeName', 'store2']);

    // Assert on our spys
    expect(refSpy).toHaveBeenCalled();
    expect(Subscriber).toHaveBeenCalledWith({
      selector: expect.any(Function),
      storeNames: ['storeName', 'store2'],
    });

    expect(effectSpy).toHaveBeenCalled();
    expect(stateSpy).toHaveBeenCalledWith('cargo');
    expect(mockOnFn).toHaveBeenCalled();
    expect(deeds).toEqual('deeds');
  });

  it('handles unsubscribe', () => {
    // spy on all react hooks

    let unsub = null;
    const refSpy = jest.spyOn(React, 'useRef').mockImplementation(initial => ({
      current: { sub: { unsubscribeAll: mockUnsubFn, cargo: 'cargo' }, isInitial: false },
    }));
    const effectSpy = jest.spyOn(React, 'useEffect').mockImplementation(cb => {
      unsub = cb();
    });
    const stateSpy = jest.spyOn(React, 'useState').mockImplementation(initial => [initial, mockFn]);

    // Call our hook
    useNamedStore([], () => null);
    // Manually call the unmount effect
    unsub();

    // Assert on our spys
    expect(refSpy).toHaveBeenCalled();
    expect(Subscriber).not.toHaveBeenCalledWith({
      selector: expect.any(Function),
      storeNames: [],
    });

    expect(effectSpy).toHaveBeenCalled();
    expect(stateSpy).toHaveBeenCalledWith('cargo');
    expect(mockOnFn).not.toHaveBeenCalled();
    expect(mockUnsubFn).toHaveBeenCalled();
  });
});
