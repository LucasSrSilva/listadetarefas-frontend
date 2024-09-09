import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { cadastrarUsuario } from '../../services/Service';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { RotatingLines } from 'react-loader-spinner';

function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmaSenha, setConfirmaSenha] = useState<string>('');
    const [usuario, setUsuario] = useState<User>({
        id: 0,
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    });

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar();
        }
    }, [usuario]);

    function retornar() {
        navigate('/login');
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    function handleConfirmaSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value);
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
            setIsLoading(true);
            try {
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
                ToastAlerta('Usuário cadastrado com sucesso!', "sucesso");
            } catch (error) {
                ToastAlerta('Erro ao cadastrar o usuário!', "erro");
            }
        } else {
            ToastAlerta("Dados estão inconsistentes! Verifique os dados do usuário.", "info");
            setUsuario({ ...usuario, senha: '' });
            setConfirmaSenha('');
        }

        setIsLoading(false);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-orange-100">
            <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 md:w-2/3 lg:w-1/2" onSubmit={cadastrarNovoUsuario}>
                <h2 className="text-center text-3xl font-bold text-orange-400 mb-6">Cadastrar</h2>
                <div className="mb-4">
                    <label htmlFor="nome" className="block text-gray-700">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                        value={usuario.nome}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="sobrenome" className="block text-gray-700">Sobrenome</label>
                    <input
                        type="text"
                        id="sobrenome"
                        name="sobrenome"
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                        value={usuario.sobrenome}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                        value={usuario.email}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="senha" className="block text-gray-700">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                        value={usuario.senha}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmarSenha" className="block text-gray-700">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                        value={confirmaSenha}
                        onChange={handleConfirmaSenha}
                    />
                </div>
                <div className="flex justify-between gap-4">
                    <button type="button" className="w-1/2 bg-red-400 hover:bg-red-700 text-white py-2 rounded-md" onClick={retornar}>
                        Cancelar
                    </button>
                    <button type="submit" className="w-1/2 bg-indigo-400 hover:bg-indigo-900 text-white py-2 rounded-md flex justify-center items-center">
                        {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : 'Cadastrar'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
