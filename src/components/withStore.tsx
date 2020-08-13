import React, { ReactElement, ElementType } from 'react';
import useStore from './useStore';
import { Selector, obj } from 'gin';

export type WithStore = (
  selector?: Selector,
) => (Component: ElementType) => (props: obj<any>) => ReactElement;

const withStore: WithStore = selector => Component => props => {
  const { cargo, deeds } = useStore(selector);

  return <Component {...{ ...props, cargo, deeds }} />;
};

export default withStore;
