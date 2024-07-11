import { useContext } from 'react';
import { storesContext } from '@/contexts/stores-context';

export const useStores = () => useContext(storesContext);