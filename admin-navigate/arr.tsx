import Statistics from '../statistics/components/Statistics/Statistics';
import App from '../users/components/App/App';

import { SectionType } from './types';

// example arr of sections data.
// images from public folder.
// name only lowerCase string!
// path to your page will be generic by split(' ').join('-')!

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
    body: <p>usersusersusersusersusersusersusersusers</p>,
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
];
