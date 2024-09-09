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
        <div>
            <div>
                <p>{task.titulo}</p>
                <p>{task.descricao}</p>
                <p>{new Intl.DateTimeFormat(undefined, {
                    dateStyle: 'full',
                    timeStyle: 'medium',
                }).format(new Date(task.data))}</p>
            </div>
            <button><Link to={`/editarTarefa/${task.id}`}>Editar</Link></button>
            <button onClick={deletarTarefa}>Deletar tarefa</button>
        </div>
    )
}

export default CardTask