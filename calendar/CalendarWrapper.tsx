import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Provider } from 'react-redux';

import { store } from '../store';

import { Calendar } from './components/Calendar/Calendar';

const supabase = createClient(
  'https://fkzmhpndkojnsglrawxq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrem1ocG5ka29qbnNnbHJhd3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY5Mjc1MTgsImV4cCI6MjAwMjUwMzUxOH0.FzjuMugYqDadZG2nA9c2RG0O8NSHOJYXiLBelK0gbMI',
);

export const CalendarWrapper = () => (
  <Provider store={store}>
    <SessionContextProvider supabaseClient={supabase}>
      <Calendar />
    </SessionContextProvider>
  </Provider>
);
