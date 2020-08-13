import { DeedCalls, obj } from 'gin';
import { useContext } from 'react';
import { StoreContext } from './storeContext';
import useNamedStore, { defaultSelector } from './useNamedStore';

function useStore<T = obj<any>, X extends Record<string, any> = { [key: string]: any }>(
  selector = defaultSelector,
): {
  cargo?: T extends (args: any) => any ? ReturnType<T> : T & obj<any>;
  deeds?: DeedCalls<X>;
} {
  const { name } = useContext(StoreContext);
  return useNamedStore<T, X>(name, selector);
}

export default useStore;
