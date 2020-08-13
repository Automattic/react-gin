import React from 'react';
import Store from 'gin';
import StoreComponent from '../';
import { mount } from 'enzyme';

jest.mock('gin', () => ({
  __esModule: true,
  default: jest.fn(),
  checkEqualOneLevelDeep: () => false,
}));

describe('store', () => {
  const mockUpdateFn = jest.fn();
  const mockDcFn = jest.fn();
  const mockGetName = jest.fn();
  const mockCargoUpdate = jest.fn();

  // @ts-ignore
  Store.namedStores = {
    has: () => true,
  };
  it('handles flow', () => {
    Store.mockImplementation(() => ({
      updateCurrentProps: mockUpdateFn,
      getName: mockGetName,
      disconnect: mockDcFn,
    }));
    const wrapper = mount(
      <StoreComponent deeds={[]} cargo={{}}>
        <div />
      </StoreComponent>,
    );
    expect(mockGetName).toHaveBeenCalled();
    wrapper.setProps({ foo: 'bar' });
    expect(mockUpdateFn).toHaveBeenCalledWith({
      cargo: {},
      children: <div />,
      deeds: [],
      foo: 'bar',
    });
    wrapper.unmount();
    expect(mockDcFn).toHaveBeenCalled();
  });

  it('handles sync', () => {
    Store.mockImplementation(() => ({
      updateCurrentProps: mockUpdateFn,
      updateCargo: mockCargoUpdate,
      getName: mockGetName,
      disconnect: mockDcFn,
    }));
    const wrapper = mount(
      <StoreComponent deeds={[]} cargo={{ foo: '' }} sync={{ foo: '' }}>
        <div />
      </StoreComponent>,
    );

    wrapper.setProps({ foo: 'bar' });
    expect(mockUpdateFn).toHaveBeenCalledWith({
      cargo: { foo: '' },
      children: <div />,
      deeds: [],
      foo: 'bar',
      sync: {
        foo: '',
        current: expect.any(Object),
      },
    });

    wrapper.unmount();
    expect(mockDcFn).toHaveBeenCalled();
  });

  it('handles reconnection', () => {
    // @ts-ignore
    Store.namedStores = {
      has: jest
        .fn()
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true),
    };
    Store.mockImplementation(() => ({
      updateCurrentProps: mockUpdateFn,
      updateCargo: mockCargoUpdate,
      getName: mockGetName,
      disconnect: mockDcFn,
    }));

    const ErrComponent = () => {
      return <div />;
    };

    const wrapper = mount(
      <StoreComponent deeds={[]} cargo={{ foo: '' }} sync={{ foo: '' }}>
        <ErrComponent />
      </StoreComponent>,
    );
    const spy = jest.spyOn(wrapper.instance(), 'init');

    wrapper.find(ErrComponent).simulateError();
    wrapper.unmount();
    expect(mockDcFn).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });
});
