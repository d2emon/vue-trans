export interface MenuItem {
  title: string;
  to?: string;
  items?: MenuItem[];
}

const mainMenu: MenuItem[] = [
  {
    title: 'Random',
    to: '/random',
  },
];

export default mainMenu;
