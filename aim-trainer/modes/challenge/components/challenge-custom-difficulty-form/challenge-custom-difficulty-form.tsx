import { Button, Form, InputNumber, Modal, Slider } from 'antd';
import { useCallback } from 'react';

import { DifficultyLevel } from '../../../../utils/types/difficulty';

type Props = {
  open: boolean;
  onSubmit: (values: DifficultyLevel) => void;
  onClose: () => void;
  currentDifficulty: DifficultyLevel;
};

export const ChallengeCustomDifficultyForm = (props: Props) => {
  const { open, onSubmit, onClose, currentDifficulty } = props;

  const [form] = Form.useForm();

  const resetHandler = useCallback(() => {
    form.setFieldsValue(currentDifficulty);
  }, []);

  return (
    <Modal
      open={open}
      onCancel={onClose}
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
        <Button type="text" size="large" onClick={resetHandler}>
          Reset
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        onFinish={onSubmit}
        name="challengeCustomDifficultForm"
        initialValues={currentDifficulty}
        form={form}
        id="challengeDifficulty"
      >
        <Form.Item label="Target lifetime (ms)" name="lifetime">
          <Slider max={20000} min={2000} step={100} />
        </Form.Item>
        <Form.Item label="Target Size (px)" name="targetSize">
          <Slider min={20} max={200} step={10} />
        </Form.Item>
        <Form.Item label="Max Target Count" name="maxTargetCount">
          <InputNumber min={3} max={30} />
        </Form.Item>
        <Form.Item label="Lives Count" name="lives">
          <InputNumber min={1} max={7} step={1} />
        </Form.Item>
        <Form.Item label="Targets per second" name="defaultSpeed">
          <InputNumber min={1} max={10} step={0.01} />
        </Form.Item>
        <Form.Item label="Increase speed every second by" name="speedIncrementPerSecond">
          <InputNumber min={0.01} max={1} step={0.01} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
