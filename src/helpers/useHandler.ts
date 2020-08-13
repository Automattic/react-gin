import { useCallback, useState, useEffect, ChangeEvent } from 'react';

function useHandler<E = ChangeEvent<HTMLInputElement>, T = string>(
  handler: (event: E) => any,
  externalValue: T,
  keepInSync: boolean = false,
): [T, (event: E) => void] {
  const [value, setValue] = useState<T>(externalValue);
  const update = useCallback(
    e => {
      handler(e);
      setValue(e.target.value);
    },
    [handler],
  );
  useEffect(() => {
    if (keepInSync && externalValue !== value) {
      setValue(externalValue);
    }
  }, [externalValue, keepInSync]);
  return [value, update];
}

export default useHandler;
