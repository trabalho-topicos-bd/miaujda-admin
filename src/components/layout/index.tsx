import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from './header';
import { Menu } from './menu';

interface LayoutProps {
    title: string;
    isLogged?: boolean;
    children: React.ReactNode;
}

export const Layout = (props: LayoutProps): JSX.Element => {
    const { title, isLogged = false, children } = props;

    const layoutClasses = useMemo(() => (isLogged ? 'logged' : ''), [isLogged]);

    return (
        <>
            <Helmet>
                <title>Miaujuda Admin - {title}</title>
            </Helmet>
            <div id="layout-component" className={layoutClasses}>
                {!isLogged ? (
                    children
                ) : (
                    <>
                        <Header />
                        <div className="row">
                            <Menu />
                            <div id="page-content" className="box">
                                {children}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
