import usuario from "./User";

export default interface Task {
    id: number;
    titulo: string;
    descricao: string;
    data: Date;
    usuario: usuario | null;
}