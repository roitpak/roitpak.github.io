import {createContext} from 'react';
import {ModalContextType} from './Types';
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);
