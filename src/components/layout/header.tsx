import { useContext } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { SessionContext } from '../../context/session';

export const Header = (): JSX.Element => {
    const { handleLogout } = useContext(SessionContext);

    return (
        <div id="header-component" className="box">
            <img src="miaujuda.png" alt="Logo Miaujuda" />
            <div>
                <button type="button" onClick={handleLogout}>
                    <BiLogOut size="16px" />
                    <span>Sair</span>
                </button>
            </div>
        </div>
    );
};
