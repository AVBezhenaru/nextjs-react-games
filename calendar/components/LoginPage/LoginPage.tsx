import { useSupabaseClient } from '@supabase/auth-helpers-react';

import st from './LoginPage.module.scss';

export const LoginPage = () => {
  const supabase = useSupabaseClient();

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',

        // redirectTo: 'http://localhost:3000',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) {
      alert('error login in to Google');
      console.log(error);
    }
  }

  return (
    <div className={st['login-wrapper']}>
      <h1 className={st.title}>You need to login to create an event</h1>
      <button
        onClick={() => googleSignIn()}
        type="button"
        className={`${st['sign-in-button']} ${st.buttons}`}
      >
        Sign In With Google
      </button>
    </div>
  );
};
