import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from '../dashboard/dashboard';
import { sectionsArr } from '../arr';
import { SectionType, SectionChildType } from '../types';

import classes from './layout.module.scss';

// add your section to 'sectionsArr' in obedience to type 'SectionType'
// and add icon of your section to src/public/img/ named as your section
// add .tsx (named as your section`s name) in 'pages/admin' folder in obedience to 'admin.tsx'

const Layout = () => {
  const routChildrenArr = sectionsArr.reduce(
    (accumulator, currentValue) =>
      currentValue.sectionChildren
        ? [...accumulator, ...currentValue.sectionChildren]
        : accumulator,
    [] as SectionChildType[],
  );
  return (
    <Router>
      <div className={classes.app}>
        <Dashboard arr={sectionsArr} />
        <div className={classes.pageBody} style={{ marginLeft: 268 }}>
          <Routes>
            {sectionsArr.map((section: SectionType) => (
              <Route
                key={section.name}
                path={`/admin/${section.name.split(' ').join('-')}`}
                element={section.body}
              />
            ))}
            {routChildrenArr.map((sectionChild: SectionChildType) => (
              <Route
                key={sectionChild.name}
                path={`/admin/${sectionChild.name.split(' ').join('-')}`}
                element={sectionChild.body}
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
