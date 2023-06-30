import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

import { DateTimePickers } from '../DateTimePickers/DateTimePickers';
import { EventList } from '../EventList/EventList';
import { getCalendarId } from '../../store/asyncActions/getCalendarId';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { CreateEventButton } from '../CreateEventButton/CreateEventButton';
import { CalendarInputFields } from '../CalendarInputFields/CalendarInputFields';
import { LoginPage } from '../LoginPage/LoginPage';
// import { doRefreshToken } from '../../store/asyncActions/doRefreshToken';
import { CalendarTableNew } from '../CalendarTableNew/CalendarTableNew';
import { EventAnimation } from '../EventAnimation/EventAnimation';

import st from './Calendar.module.scss';

export const Calendar = () => {
  const dispatch = useAppDispatch();
  const animation = useAppSelector((state) => state.calendar.calendarReducer.animationVisibility);

  // tokens, when session exists we have a user
  const session = useSession();
  // talk to supabase
  const supabase = useSupabaseClient();

  async function signOut() {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    if (session && session.provider_token) dispatch(getCalendarId(session.provider_token));
    else if (session) signOut();
  }, [session]);

  const { isLoading } = useSessionContext();
  if (isLoading) return <div />;

  const eventDetails = (
    <div className={st.authorizated}>
      <h2 className={st.title}>Field for creating an event</h2>
      <div className={`${st.row} ${st.date}`}>
        <DateTimePickers />
      </div>
      <CalendarInputFields />
      <CreateEventButton />
    </div>
  );

  return (
    <div className={st.wrapper}>
      <div className={st.content}>
        {session ? (
          <>
            <h1 className={st.title}>Welcome, {session.user.email}</h1>
            <CalendarTableNew />
            <div className={st.parts}>
              {eventDetails}
              <EventList />
            </div>
            {animation && <EventAnimation />}

            <button onClick={signOut} type="button" className={st.buttons}>
              Sign Out
            </button>
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    </div>
  );
};
