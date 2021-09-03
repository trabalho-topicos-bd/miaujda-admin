import { Helmet } from 'react-helmet';

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

export const Layout = ({ title, children }: LayoutProps): JSX.Element => (
    <>
        <Helmet>
            <title>Miaujuda Admin - {title}</title>
        </Helmet>
        <div>{children}</div>
    </>
);
