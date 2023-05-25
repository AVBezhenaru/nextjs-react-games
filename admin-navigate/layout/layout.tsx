import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from '../dashboard/dashboard';
import { SectionType, SectionChildType } from '../types';

import './layout.scss';

const Layout = ({ sectionsArr }: { sectionsArr: SectionType[] }) => {
  const routChildrenArr = sectionsArr.reduce(
    (accumulator, currentValue) =>
      currentValue.sectionChildren
        ? [...accumulator, ...currentValue.sectionChildren]
        : accumulator,
    [] as SectionChildType[],
  );
  return (
    <Router>
      <div className="app">
        <Dashboard arr={sectionsArr} />
        <div className="page-body" style={{ marginLeft: 268 }}>
          <Routes>
            {sectionsArr.map((section: SectionType) => (
              <Route
                key={section.name}
                path={`/${section.name.split(' ').join('-')}`}
                element={section.body}
              />
            ))}
            {routChildrenArr.map((sectionChild: SectionChildType) => (
              <Route
                key={sectionChild.name}
                path={`/${sectionChild.name.split(' ').join('-')}`}
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
