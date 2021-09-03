import { Link } from 'react-router-dom';
import { menus } from './data';

export const Menu = (): JSX.Element => (
    <div id="menu-component" className="box">
        {menus.map((menu) => (
            <Link key={`menu-${menu.id}`} to={menu.to}>
                {menu.label}
            </Link>
        ))}
    </div>
);
