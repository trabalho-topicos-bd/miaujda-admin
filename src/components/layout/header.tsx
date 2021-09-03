import { useContext } from 'react';
import { SessionContext } from '../../context/session';

export const Header = (): JSX.Element => {
    const { handleLogout } = useContext(SessionContext);

    return (
        <div id="header-component" className="box">
            <img src="miaujuda.png" alt="Logo Miaujuda" />
            <div>
                <button type="button" onClick={handleLogout}>
                    <span>Sair</span>
                </button>
            </div>
        </div>
    );
};
