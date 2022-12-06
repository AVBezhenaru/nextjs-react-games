import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { RootState } from '../src/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
