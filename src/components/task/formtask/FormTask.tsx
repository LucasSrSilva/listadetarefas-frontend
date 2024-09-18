import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import Task from '../../../models/Task'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { atualizar, buscar, cadastrar } from '../../../services/Service'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { RotatingLines } from 'react-loader-spinner'

interface FormTaskProps {
    fecharPopup: () => void;  // Definindo o tipo da prop fecharPopup
}

function FormTask({ fecharPopup }: FormTaskProps) {
    const [task, setTask] = useState<Task>({} as Task)
    const { id } = useParams<{ id: string }>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarTaskPorId(id: string) {
        try {
            await buscar(`/tarefas/${id}`, setTask, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info");
            navigate('/');
        }
    }, [token])

    useEffect(() => {

        if (id !== undefined) {
            buscarTaskPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/tarefas');
    }

    async function gerarNovaTarefa(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id != undefined) {
            try {
                await atualizar("/tarefas", task, setTask, {
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Tarefa atualizada com sucesso', "sucesso")

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar a Tarefa', "erro")
                }
            }

        } else {
            try {
                await cadastrar("/tarefas", task, setTask, {
                    headers: {
                        Authorization: token,
                    },
                })

                ToastAlerta('Tarefa cadastrada com sucesso', "sucesso");

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar a Tarefa', "erro");
                }
            }
        }

        setIsLoading(false)
        retornar()
    }


    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 -z-10" onClick={fecharPopup}></div>

            <div className="bg-white rounded-lg shadow-lg flex flex-col items-center gap-2 pb-5 z-10">
                <div className='w-full flex justify-end px-2'>
                    <button className='absolute' onClick={fecharPopup}>X</button>
                </div>
                <h1 className="text-3xl font-bold text-center my-6 text-orange-600">
                    {id !== undefined ? 'Editar Tarefa' : 'Criar Tarefa'}
                </h1>

                <form className="w-full space-y-6 px-10" onSubmit={gerarNovaTarefa}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="titulo" className="text-sm font-medium text-slate-700">
                            Título da Tarefa
                        </label>
                        <input
                            type="text"
                            placeholder="Título"
                            name="titulo"
                            required
                            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={task.titulo}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="descricao" className="text-sm font-medium text-slate-700">
                            Descrição da Tarefa
                        </label>
                        <input
                            placeholder="Descrição"
                            name="descricao"
                            required
                            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-28"
                            value={task.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <button
                        type='submit'
                        className='rounded bg-orange-600 hover:bg-orange-700 text-white font-semibold w-full py-3 flex justify-center items-center transition-all duration-200'
                        disabled={isLoading}
                        onClick={fecharPopup}
                    >
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                        ) : (
                            <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                        )}
                    </button>
                </form>
            </div>
        </>

    )
}

export default FormTask