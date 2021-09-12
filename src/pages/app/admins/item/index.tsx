import { AdminData } from '../../../../types/admin';

interface AdminItemProps {
    item: AdminData;
    header?: boolean;
}

export const AdminItem = ({
    item,
    header = false,
}: AdminItemProps): JSX.Element => (
    <li>
        <button type="button" className="unstyled">
            <h4>{header ? 'Email' : item.email}</h4>
            <span>{header ? 'Senha' : '*********'}</span>
        </button>
    </li>
);
