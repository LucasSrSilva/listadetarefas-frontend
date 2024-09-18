import React, { useState } from 'react'
import TaskList from '../../components/task/tasklist/TaskList'
import FormTask from '../../components/task/formtask/FormTask'
import Popup from 'reactjs-popup'

function Tarefas() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const abrirPopup = () => {
        setIsPopupOpen(true);
    };

    const fecharPopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <div className='w-full bg-orange-300 flex flex-col items-center gap-2 border border-black'>
                <button onClick={abrirPopup}>Criar tarefa</button>
                <Popup
                    open={isPopupOpen}
                    onClose={fecharPopup}
                    position={'bottom center'} 
                    modal 
                    nested 
                    closeOnEscape >
                    <FormTask fecharPopup={fecharPopup}/>
                </Popup>
                <TaskList />
            </div>
        </>
    )
}

export default Tarefas