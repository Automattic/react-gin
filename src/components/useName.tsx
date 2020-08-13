import { useContext } from 'react';
import { StoreContext } from './storeContext';

function useName(): string {
  const { name } = useContext(StoreContext);
  return name;
}

export default useName;
