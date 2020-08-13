import { mount } from 'enzyme';
import React from 'react';
import { withNamedStore, useNamedStore } from '../';

jest.mock('../components/useNamedStore');

describe('withNamedStore', () => {
  const testFn = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('passes down data as expected', () => {
    // @ts-ignore
    useNamedStore.mockImplementation(() => ({
      cargo: 'cargo',
      deeds: 'deeds',
    }));

    const Component = withNamedStore('name')(props => {
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
