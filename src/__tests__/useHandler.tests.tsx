import { shallow, mount } from 'enzyme';
import React from 'react';
import { useHandler } from '../helpers';

// tslint:disable-next-line: no-unnecessary-initializer
const TC = ({ handler, externalValue, keepInSync = false }) => {
  const [value, updater] = useHandler(handler, externalValue, keepInSync);
  return <input value={value} onChange={updater} />;
};

describe('useStore', () => {
  const testFn = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('handles externalValue', () => {
    const wrapper = shallow(<TC externalValue="test" handler={testFn} />);
    expect(wrapper.find('input').prop('value')).toEqual('test');
  });

  it('handles change', () => {
    const wrapper = shallow(<TC externalValue="" handler={testFn} />);
    wrapper.simulate('change', { target: { value: 'test' } });

    expect(wrapper.find('input').prop('value')).toEqual('test');
  });

  it('handles external sync', () => {
    const wrapper = mount(<TC externalValue="init" handler={testFn} keepInSync={true} />);

    expect(wrapper.find('input').prop('value')).toEqual('init');

    wrapper.simulate('change', { target: { value: 'test' } });
    expect(wrapper.find('input').prop('value')).toEqual('test');

    wrapper.setProps({ externalValue: 'foo' });
    wrapper.update();

    expect(wrapper.find('input').prop('value')).toEqual('foo');
  });
});
