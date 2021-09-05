import { BiHome } from 'react-icons/bi';
import { MdPets } from 'react-icons/md';

export interface MenuData {
    id: number;
    to: string;
    icon: JSX.Element;
    label: string;
}

export const menus: MenuData[] = [
    {
        id: 0,
        to: '/dashboard',
        icon: <BiHome size="1.5rem" />,
        label: 'Dashboard',
    },
    {
        id: 1,
        to: '/pets',
        icon: <MdPets size="1.5rem" />,
        label: 'Pets',
    },
];
