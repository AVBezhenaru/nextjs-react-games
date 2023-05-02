import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { DifficultyLevel } from '../../utils/types/difficulty';
import {
  selectGameDifficulty,
  setCustomDifficulty,
  setGameDifficulty,
} from '../../reducers/difficulty-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { DifficultyLevels } from '../../utils/enums/difficulty-levels';
import { Modal } from '../modal/modal';
import { Button, ButtonSizes, ButtonTypes } from '../button/button.styles';
import { Form } from '../form/form';

export type InputData = {
  name: string;
  label: string;
  component: ReactNode;
};

type Props = {
  defaultValues: DifficultyLevel;
  formData: InputData[];
  onFinish?: (values: DifficultyLevel) => void;
};

export const DifficultyForm = (props: Props) => {
  const { defaultValues, formData, onFinish } = props;

  const dispatch = useAppDispatch();
  const gameDifficultyType = useAppSelector(selectGameDifficulty);

  const form = useForm<DifficultyLevel>({
    defaultValues,
  });

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (gameDifficultyType === DifficultyLevels.Custom) {
      setOpen(true);
    }
  }, [gameDifficultyType]);

  useEffect(() => {
    setOpen(false);
  }, []);

  const onResetHandler = useCallback(() => {
    form.reset();
  }, []);

  const onCloseHandler = useCallback(() => {
    setOpen(false);
    dispatch(setGameDifficulty(DifficultyLevels.Normal));
  }, []);

  const onSubmitHandler = useCallback((values: DifficultyLevel) => {
    if (onFinish) {
      onFinish(values);
    } else {
      dispatch(setCustomDifficulty(values));
    }

    setOpen(false);
  }, []);

  const formItems = useMemo(() => {
    return formData.map((el) => (
      <Form.Item label={el.label} name={el.name} key={el.name}>
        {el.component}
      </Form.Item>
    ));
  }, [formData]);

  return (
    <Modal
      title="Custom Difficulty Settings"
      open={open}
      onCancel={onCloseHandler}
      footer={[
        <Button
          buttonType={ButtonTypes.Primary}
          size={ButtonSizes.Small}
          form="challengeDifficulty"
          type="submit"
        >
          Save
        </Button>,
        <Button buttonType={ButtonTypes.Text} size={ButtonSizes.Small} onClick={onResetHandler}>
          Reset
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={onSubmitHandler}
        name="challengeCustomDifficultForm"
        initialValues={defaultValues}
        id="challengeDifficulty"
      >
        {formItems}
      </Form>
    </Modal>
  );
};
