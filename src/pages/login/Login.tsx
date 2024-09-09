import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';
import UsuarioLogin from '../../models/LoginUser';

function Login() {
    const navigate = useNavigate();
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/tarefas');
        }
    }, [usuario, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-orange-100">
            <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 md:w-2/3 lg:w-1/2" onSubmit={login}>
                <h2 className="text-center text-3xl font-bold text-orange-400 mb-6">Entrar</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm"
                        value={usuarioLogin.email || ''}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="senha" className="block text-sm font-medium text-slate-700">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm"
                        value={usuarioLogin.senha || ''}
                        onChange={atualizarEstado}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-700 flex justify-center"
                >
                    {isLoading ? <RotatingLines strokeColor="white" width="24" visible={true} /> : 'Entrar'}
                </button>

                <hr className="my-4 border-slate-300" />

                <p className="text-center text-sm">
                    Ainda não tem uma conta?{' '}
                    <Link to="/cadastro" className="text-indigo-800 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
