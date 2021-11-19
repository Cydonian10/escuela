import { Rol } from './rol.enum';

export interface IUsuariosResponse {
    message: string;
    data: IUsuario[];
}

export interface IUsuarioResponse {
    message: string;
    data: IUsuario;
}

export interface IUsuario {
    id: number;
    name: string;
    lastName: string;
    dni: string;
    rol: Rol;
    telefono: string;
    email: string;
    password: string;
    gradoSeccion: string;
}

export interface CreateUserDto extends Omit<IUsuario, 'id'> { }
export interface UpdateUserDto extends Partial<IUsuario> { }