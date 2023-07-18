import { CalendarWrapper } from '../calendar/CalendarWrapper';
import Statistics from '../statistics/components/Statistics/Statistics';
import App from '../users/components/App/App';

import { SectionType } from './types';

// example arr of sections data.
// images from public folder.
// name only lowerCase string!
// path to your page will be generic by split(' ').join('-')!

// to add menu item as page
// navigate to pages folder and add
// pageName.tsx, where pageName is name of your page
// with content:
// import AdminNavigate from '../dashboard';
// const PageName = () => <AdminNavigate />;
// export default PageName;

export const sectionsArr: SectionType[] = [
  {
    icon: 'img/home.svg',
    name: 'home',
    body: <div>homehomehomehome</div>,
  },
  {
    icon: 'img/games.svg',
    name: 'statistics',
    body: <Statistics />,
  },
  {
    icon: 'img/users.svg',
    name: 'users',
    // use "body: false" if u need empty root page with children
    body: false,
    sectionChildren: [
      { name: 'clever users', body: <App /> },
      { name: 'big users', body: <p>bigusers</p> },
    ],
  },
  {
    icon: 'img/games.svg',
    name: 'games',
    body: <p>gamesgamesgamesgamesgamesgamesgamesgames</p>,
    sectionChildren: [
      { name: 'simple games', body: <div>simples</div> },
      { name: 'hard games', body: <div>hardgaaaaames</div> },
    ],
  },
  {
    icon: 'img/home.svg',
    name: 'gogogo',
    body: <p>gogogogogogogogogo</p>,
  },
  {
    icon: 'img/calendar.svg',
    name: 'calendar',
    body: <CalendarWrapper />,
  },
];
