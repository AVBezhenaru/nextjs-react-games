import React from 'react';

import { TransactionForm } from '../TransactionForm/TransactionForm';

import { Panel, Title, Form } from './TransactionPanelStyle';

export const TransactionPanel: React.FC = () => (
  <Panel>
    <Title>Transaction Panel</Title>
    <Form>
      <TransactionForm />
    </Form>
  </Panel>
);
