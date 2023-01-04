import { Stack } from './StackStyle';

export const StackCards = ({ id, isReady }) => <Stack id={id}>{isReady && <div />} </Stack>;
