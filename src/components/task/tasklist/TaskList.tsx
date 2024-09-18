import React, { useContext, useEffect, useState } from 'react'
import Task from '../../../models/Task';
import CardTask from '../cardtask/CardTask';
import { buscar } from '../../../services/Service';
import { AuthContext } from '../../../contexts/AuthContext';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { useNavigate } from 'react-router-dom';



function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([])
    const { usuario, handleLogout } = useContext(AuthContext);
    let navigate = useNavigate();
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
          ToastAlerta('Você precisa estar logado', "info");
          navigate('/');
        }
      }, [token]);

    async function buscarTask() {
        try {
            await buscar('/tarefas', setTasks, {
                headers: {
                    Authorization: token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerta('O token expirou, favor logar novamente', "info")
                handleLogout()
            }
        }
    }

    useEffect(() => {
        buscarTask();
    }, [tasks.length]);
    return (
        <>
            <div>
                {tasks.map((task) => (
                    <CardTask key={task.id} task={task} />
                ))}
            </div>
        </>
    );
}

export default TaskList