import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useContext } from 'react';
import Lottie from 'react-lottie';
import { BiLogIn } from 'react-icons/bi';
import { Layout } from '../../../components/layout';
import { LoginData } from '../../../types/session';
import { Input } from '../../../components/form/input';
import { SessionContext } from '../../../context/session';
import { sessionServices } from '../../../services/session';
import submittingLottie from '../../../assets/lottie/submitting.json';
import { getLottieOptions, showToast } from '../../../utils/helpers';

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
        formState: { errors, isSubmitting },
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
                showToast(err, 'error');
            }
        },
        [_login, handleLogin],
    );

    return (
        <Layout title="Login">
            <main id="login-page">
                <form className="box form" onSubmit={handleSubmit(handleForm)}>
                    <img src="miaujuda.png" alt="Logo Miaujuda" />
                    <Controller
                        render={({ field }) => (
                            <Input
                                type="email"
                                title="E-mail"
                                placeholder="E-mail"
                                error={errors.email}
                                autoComplete="email"
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
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Lottie
                                options={getLottieOptions(submittingLottie)}
                                height={32}
                                width={196}
                            />
                        ) : (
                            <>
                                <BiLogIn size="1rem" />
                                <span>Confirmar</span>
                            </>
                        )}
                    </button>
                </form>
            </main>
        </Layout>
    );
};
