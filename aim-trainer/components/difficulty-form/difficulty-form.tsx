import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Form, Modal } from 'antd';

import { DifficultyLevel } from '../../utils/types/difficulty';
import {
  selectGameDifficulty,
  setCustomDifficulty,
  setGameDifficulty,
} from '../../reducers/difficulty-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { DifficultyLevels } from '../../utils/enums/difficulty-levels';

export type InputData = {
  name: string;
  label: string;
  component: ReactNode;
};

type Props = {
  defaultValues: DifficultyLevel;
  formData: InputData[];
};

export const DifficultyForm = (props: Props) => {
  const { defaultValues, formData } = props;

  const dispatch = useAppDispatch();
  const gameDifficultyType = useAppSelector(selectGameDifficulty);

  const [form] = Form.useForm();
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
    form.setFieldsValue(defaultValues);
  }, []);

  const onCloseHandler = useCallback(() => {
    setOpen(false);
    dispatch(setGameDifficulty(DifficultyLevels.Normal));
  }, []);

  const onSubmitHandler = useCallback((values: DifficultyLevel) => {
    dispatch(setCustomDifficulty(values));

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
      open={open}
      onCancel={onCloseHandler}
      footer={[
        <Button
          type="primary"
          size="large"
          form="challengeDifficulty"
          key="submit"
          htmlType="submit"
        >
          Save
        </Button>,
        <Button type="text" size="large" onClick={onResetHandler}>
          Reset
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        onFinish={onSubmitHandler}
        name="challengeCustomDifficultForm"
        initialValues={defaultValues}
        form={form}
        id="challengeDifficulty"
      >
        {formItems}
      </Form>
    </Modal>
  );
};
