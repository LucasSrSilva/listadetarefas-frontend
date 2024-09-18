import { useContext, useEffect } from 'react'
import Task from '../../../models/Task'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletar } from '../../../services/Service'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { AuthContext } from '../../../contexts/AuthContext'

interface TaskProps {
    task: Task
}

function CardTask({ task }: TaskProps) {
    let navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado", "info")
            navigate('/login')
        }
    }, [token])

    async function deletarTarefa() {
        try {
            await deletar(`/tarefas/${task.id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Tarefa apagada com sucesso', "sucesso")

        } catch (error) {
            ToastAlerta('Erro ao apagar a Tarefa', "erro")
        }
    }
    return (
        <>
            <div className="bg-orange-200 border border-black p-4 rounded-lg shadow-md w-80 m-1">
                <div className="mb-4">
                    <h3 className="text-lg font-bold">{task.titulo}</h3>
                    <p className="text-sm text-gray-700">{task.descricao}</p>
                    <p className="text-xs text-gray-600 mt-2">
                        {new Intl.DateTimeFormat(undefined, {
                            dateStyle: 'full',
                            timeStyle: 'medium',
                        }).format(new Date(task.data))}
                    </p>
                </div>
                <div className="flex justify-between">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                        <Link to={`/editarTarefa/${task.id}`}>Editar</Link>
                    </button>
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={deletarTarefa}
                    >
                        Deletar tarefa
                    </button>
                </div>
            </div>
        </>
    )
}

export default CardTask