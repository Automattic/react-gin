import React, { ElementType } from 'react';
import useNamedStore from './useNamedStore';
import { Selector, obj } from 'gin';

export type WithNamedStore = (
  name: string | string[],
  selector?: Selector,
) => (Component: ElementType) => (props: obj<any>) => JSX.Element;

const withNamedStore: WithNamedStore = (name, selector) => Component => props => {
  const { cargo, deeds } = useNamedStore(name, selector);
  return <Component {...{ ...props, cargo, deeds }} />;
};

export default withNamedStore;
