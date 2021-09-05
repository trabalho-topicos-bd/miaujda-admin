import { Link, useLocation } from 'react-router-dom';
import { menus } from './data';

export const Menu = (): JSX.Element => {
    const { pathname } = useLocation();

    return (
        <div id="menu-component" className="box">
            {menus.map((menu) => (
                <Link
                    key={`menu-${menu.id}`}
                    to={menu.to}
                    className={pathname === menu.to ? 'active' : ''}>
                    <span>{menu.icon}</span>
                    <span>{menu.label}</span>
                </Link>
            ))}
        </div>
    );
};
