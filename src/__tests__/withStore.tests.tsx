import { mount } from 'enzyme';
import React from 'react';
import { withStore, useStore } from '../';

jest.mock('../components/useStore');

describe('withStore', () => {
  const testFn = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('passes down data as expected', () => {
    // @ts-ignore
    useStore.mockImplementation(() => ({
      cargo: 'cargo',
      deeds: 'deeds',
    }));

    const Component = withStore()(props => {
      testFn(props);
      return null;
    });

    mount(<Component other={true} />);

    expect(testFn).toHaveBeenCalledWith({
      cargo: 'cargo',
      deeds: 'deeds',
      other: true,
    });
  });
});
