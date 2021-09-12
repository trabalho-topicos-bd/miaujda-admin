import { useCallback, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { Layout } from '../../../components/layout';
import { adminServices } from '../../../services/admin';
import { AdminData } from '../../../types/admin';
import { AdminItem } from './item';
import loadingLottie from '../../../assets/lottie/loading.json';
import noneFoundLottie from '../../../assets/lottie/none-found.json';
import { getLottieOptions, showToast } from '../../../utils/helpers';

export const AdminsPage = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [admins, setAdmins] = useState<AdminData[]>([]);

    const { _getAll } = adminServices();

    const handleGetData = useCallback(async () => {
        try {
            const data = await _getAll();

            setAdmins(data);
        } catch (err) {
            showToast(err, 'error');
        } finally {
            setLoading(false);
        }
    }, [_getAll]);

    useEffect(() => {
        handleGetData();
    }, [handleGetData]);

    return (
        <Layout title="Administradores" isLogged>
            <div id="admins-page">
                <div className="row">
                    <h1>Administradores</h1>
                </div>
                {admins.length > 0 ? (
                    <ul>
                        <AdminItem item={null} header />
                        {admins.map((admin) => (
                            <AdminItem key={`admin-${admin.id}`} item={admin} />
                        ))}
                    </ul>
                ) : loading ? (
                    <div className="flex-container">
                        <Lottie
                            options={getLottieOptions(loadingLottie)}
                            height={300}
                            width={400}
                        />
                        <h3>Carregando...</h3>
                    </div>
                ) : (
                    <div className="flex-container">
                        <Lottie
                            options={getLottieOptions(noneFoundLottie)}
                            height={300}
                            width={300}
                        />
                        <h3>Nenhum administrador cadastrado</h3>
                    </div>
                )}
            </div>
        </Layout>
    );
};
