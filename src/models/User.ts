import Task from "./Task";

export default interface usuario {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    tarefa?: Task | null
}