import format from 'date-fns/format';

export const setLogInLocalStorage = (currentUser: string, pathname: string, query: object) => {
  let storage = JSON.parse(localStorage.getItem(`${currentUser}-activity`));
  if (!storage) {
    storage = {};
  }
  const date = new Date();
  const day = format(date, 'y-MM-d');
  const dayData = storage[day] || [];
  const logItem = {
    time: format(date, 'HH:mm:ss'),
    pathname,
    query,
  };
  dayData.push(logItem);
  storage[day] = dayData;
  localStorage.setItem(`${currentUser}-activity`, JSON.stringify(storage));
};

export const setNewUsernameInLocalStorage = (currentUser: string, newUsername: string) => {
  const storage = JSON.parse(localStorage.getItem(`${currentUser}-activity`));
  localStorage.removeItem(`${currentUser}-activity`);
  localStorage.setItem(`${newUsername}-activity`, JSON.stringify(storage));
};
