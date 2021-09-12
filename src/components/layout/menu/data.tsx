import { MdHome, MdPets, MdStar } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';

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
        icon: <MdHome size="1.5rem" />,
        label: 'Dashboard',
    },
    {
        id: 1,
        to: '/pets',
        icon: <MdPets size="1.5rem" />,
        label: 'Pets',
    },
    {
        id: 2,
        to: '/features',
        icon: <MdStar size="1.5rem" />,
        label: 'Características',
    },
    {
        id: 3,
        to: '/admins',
        icon: <FaUsers size="1.5rem" />,
        label: 'Administradores',
    },
];
