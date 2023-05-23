import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './dashboard.scss';
import { SectionType } from '../types';

const Dashboard = (props: { arr: SectionType[] }) => {
  const navigate = useNavigate();
  const { arr } = props;

  const [pagestyle, setPagestyle] = useState('home');

  function activeHandler(name: string) {
    setPagestyle(name);
    navigate(name.split(' ').join('-'));
  }
  const sections =
    arr.map((section: SectionType) => {
      const isChildren = () => {
        if (section.sectionChildren) {
          const children = section.sectionChildren.map((child) =>
            <li key={child.name} className='section_child' onClick={() => navigate(child.name.split(' ').join('-'))}>
              {child.name}
            </li>
          )
          return (
            <div
              className='section_children'
              style={
                pagestyle === section.name ?
                  { height: 50 * section.sectionChildren.length } :
                  undefined
              }
            >
              {children}
            </div>
          )
        }
      };
      return (
        <div
          key={section.name}
          className='dashboard_section'
          onClick={() => section.sectionChildren ? isChildren : navigate(section.name.split(' ').join('-'))}
        >
          <label htmlFor={section.name}>
            <div
              className='section_name'
              style={pagestyle === section.name ? { backgroundColor: '#DC3545' } : undefined}
            >
              <img src={section.icon} alt="" />
              <input
                id={section.name}
                style={{ display: 'none' }}
                onChange={() => activeHandler(section.name)}
                type='radio'
                name='page'
              />
              {section.name}
              <div
                className='section_unwrap'
                style={pagestyle === section.name ? { transform: 'rotate(-225deg)' } : undefined}
              >
                {section.sectionChildren ? '∟' : null}
              </div>
            </div>
          </label>
          <ul>
            {isChildren()}
          </ul>
        </div>
      )
    });

  return (
    <div className="dashbord">
      <div className='dashbord_logo'>
        <img src="img/logo.png" height={41} width={145} alt="go home" />
      </div>
      <span className='dashbord_title'>Dashboard</span>
      {sections}
    </div>
  );
}

export default Dashboard;
