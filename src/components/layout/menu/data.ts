export interface MenuData {
    id: number;
    to: string;
    label: string;
}

export const menus: MenuData[] = [
    {
        id: 0,
        to: '/dashboard',
        label: 'Dashboard',
    },
    {
        id: 1,
        to: '/pets',
        label: 'Pets',
    },
];
