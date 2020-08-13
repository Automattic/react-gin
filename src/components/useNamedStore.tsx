import { useEffect, useState, useRef } from 'react';
import { Selector, Subscriber, DeedCalls, obj } from 'gin';

export const defaultSelector: Selector = cargo => cargo;
const empty = {};

function useNamedStore<T = obj<any>, X extends Record<string, any> = { [key: string]: any }>(
  storeName: string | string[],
  selector = defaultSelector,
): {
  cargo?: T extends (args: any) => any ? ReturnType<T> : T & obj<any>;
  deeds?: DeedCalls<X>;
} {
  const subscriberRef = useRef({
    sub: {} as Subscriber,
    isInitial: true,
  });

  const ref = subscriberRef.current;
  if (ref.isInitial) {
    subscriberRef.current.sub = new Subscriber({
      selector,
      storeNames: Array.isArray(storeName) ? storeName : [storeName],
    });
    ref.sub.subscribe();
  }

  useEffect(() => {
    return () => {
      ref.sub.unsubscribeAll();
      delete ref.sub;
    };
  }, []);

  const [cargo, setCargo] = useState(ref.sub.cargo as any);

  if (ref.isInitial) {
    ref.sub.on('update', setCargo);
    ref.isInitial = false;
  }

  return { cargo: cargo || empty, deeds: ref.sub.deeds as any };
}

export default useNamedStore;
