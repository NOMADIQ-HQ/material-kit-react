import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/home/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Building',
    path: '/home/building',
    icon: icon('ic-notification'),
  },
];
