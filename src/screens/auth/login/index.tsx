import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useContext } from 'react';
import { Layout } from '../../../components/layout';
import { LoginData } from '../../../types/session';
import { Input } from '../../../components/input';
import { SessionContext } from '../../../context/session';
import { sessionServices } from '../../../services/session';

const formSchema: yup.SchemaOf<LoginData> = yup.object().shape({
    email: yup
        .string()
        .required('Preencha o campo')
        .email('Deve ser um e-mail válido'),
    password: yup.string().required('Preencha o campo'),
});

export const LoginPage = (): JSX.Element => {
    const { handleLogin } = useContext(SessionContext);

    const { _login } = sessionServices();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleForm = useCallback<SubmitHandler<LoginData>>(
        async (values) => {
            try {
                const { token } = await _login(values);

                handleLogin(token);
            } catch (err) {
                console.log(err);
            }
        },
        [_login, handleLogin],
    );

    return (
        <Layout title="Login">
            <main id="login-page">
                <form className="form" onSubmit={handleSubmit(handleForm)}>
                    <img src="miaujuda.png" alt="Logo Miaujuda" />
                    <Controller
                        render={({ field }) => (
                            <Input
                                type="email"
                                title="E-mail"
                                placeholder="E-mail"
                                error={errors.email}
                                {...field}
                            />
                        )}
                        control={control}
                        name="email"
                    />
                    <Controller
                        render={({ field }) => (
                            <Input
                                type="password"
                                title="Senha"
                                placeholder="Senha"
                                error={errors.password}
                                autoComplete="current-password"
                                {...field}
                            />
                        )}
                        control={control}
                        name="password"
                    />
                    <button type="submit">Confirmar</button>
                </form>
            </main>
        </Layout>
    );
};
