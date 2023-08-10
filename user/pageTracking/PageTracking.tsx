import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import { setLogInLocalStorage } from './setLogInLocalStorage';

export function PageTracking() {
  const router = useRouter();
  const { pathname, query } = router;
  const currentUser = useCookies(['user'])[0]?.user?.username;
  if (!currentUser) return;

  setLogInLocalStorage(currentUser, pathname, query);
}
