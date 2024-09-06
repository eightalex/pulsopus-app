import { createContext } from 'react';

import { RootStore } from '@/stores';

export const storesContext = createContext({
    rootStore: new RootStore(),
});