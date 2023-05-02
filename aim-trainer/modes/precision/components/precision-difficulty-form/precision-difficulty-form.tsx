import { useCallback } from 'react';

import { DifficultyForm, InputData } from '../../../../components/difficulty-form/difficulty-form';
import { normalPrecisionDifficulty } from '../../const/precision-difficulty-levels';
import { DifficultyLevel } from '../../../../utils/types/difficulty';
import { useAppDispatch } from '../../../../../hooks';
import { setCustomDifficulty } from '../../../../reducers/difficulty-slice';
import { InputNumber } from '../../../../components/input-number/input-number';

const formData: InputData[] = [
  {
    label: 'Target Size (px)',
    name: 'targetSize',
    component: <InputNumber min={8} max={30} step={1} />,
  },
  {
    label: 'Max Target Count',
    name: 'maxTargetCount',
    component: <InputNumber min={5} max={20} />,
  },
  {
    label: 'Lives Count',
    name: 'lives',
    component: <InputNumber min={1} max={7} step={1} />,
  },
  {
    label: 'Targets per second',
    name: 'defaultSpeed',
    component: <InputNumber min={1} max={10} step={0.01} />,
  },
];

export const PrecisionDifficultyForm = () => {
  const dispatch = useAppDispatch();
  const onFinish = useCallback((values: DifficultyLevel) => {
    dispatch(
      setCustomDifficulty({
        ...values,
        lifetime: 7000,
        speedIncrementPerSecond: 0,
      }),
    );
  }, []);

  return (
    <DifficultyForm
      defaultValues={normalPrecisionDifficulty}
      formData={formData}
      onFinish={onFinish}
    />
  );
};
