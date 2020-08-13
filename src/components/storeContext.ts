import { createContext } from 'react';

interface StoreContext {
  name: string;
}

export const storeContext: StoreContext = {
  name: '',
};

export const StoreContext = createContext(storeContext);
