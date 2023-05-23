import Layout from './layout/layout.tsx';
import { sectionsArr } from './arr';

// add your section to 'sectionsArr' in obedience to type 'SectionType'
// and add icon of your section to src/public/img/
const AdminNavigate = <Layout sectionsArr={sectionsArr} />;

export default AdminNavigate;
