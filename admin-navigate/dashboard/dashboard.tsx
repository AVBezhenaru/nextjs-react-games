import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SectionType } from '../types';

import slasses from './dashboard.module.scss';

const Dashboard = (props: { arr: SectionType[] }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { arr } = props;
  let adminPath = 'home';
  if (arr.filter(({ name }) => name === pathname.replace('/admin/', '')).length > 0) {
    adminPath = pathname.replace('/admin/', '');
  }

  const [pagestyle, setPagestyle] = useState(adminPath);
  const [childStyle, setChildStyle] = useState('');

  function activeHandler(name: string) {
    setPagestyle(name);
    navigate(`admin/${name.split(' ').join('-')}`);
  }
  function activeChild(name: string) {
    setChildStyle(name);
    navigate(`admin/${name.split(' ').join('-')}`);
  }
  const sections = arr.map((section: SectionType) => {
    const isChildren = () => {
      if (section.sectionChildren) {
        const children = section.sectionChildren.map((child) => (
          <li
            key={child.name}
            className={slasses.section_child}
            onClick={() => activeChild(child.name)}
            style={
              childStyle === child.name
                ? { backgroundColor: '#4a5161', borderRadius: 50 }
                : undefined
            }
          >
            {child.name}
          </li>
        ));
        return (
          <div
            className={slasses.section_children}
            style={
              pagestyle === section.name
                ? { height: 57 * section.sectionChildren.length }
                : undefined
            }
          >
            {children}
          </div>
        );
      }
    };
    return (
      <div
        key={section.name}
        className={slasses.dashboard_section}
        onClick={() =>
          section.sectionChildren
            ? isChildren
            : navigate(`admin/${section.name.split(' ').join('-')}`)
        }
      >
        <label htmlFor={section.name}>
          <div
            className={slasses.section_name}
            style={pagestyle === section.name ? { backgroundColor: '#DC3545' } : undefined}
          >
            <img src={section.icon} alt="" />
            <input
              id={section.name}
              style={{ display: 'none' }}
              onChange={() => activeHandler(section.name)}
              type="radio"
              name="page"
            />
            {section.name}
            <div
              className={slasses.section_unwrap}
              style={pagestyle === section.name ? { transform: 'rotate(-225deg)' } : undefined}
            >
              {section.sectionChildren ? '∟' : null}
            </div>
          </div>
        </label>
        <ul> {isChildren()} </ul>
      </div>
    );
  });

  return (
    <div className={slasses.dashbord}>
      <div className={slasses.dashbord_logo}>
        <img src="img/logo.png" height={41} width={145} alt="go home" />
      </div>
      <span className={slasses.dashbord_title}>Dashboard</span>
      {sections}
    </div>
  );
};

export default Dashboard;
