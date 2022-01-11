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
    created_at: Date,
    update_at: Date;
}

export interface CreateUserDto extends Omit<IUsuario, 'id'> { }
export interface UpdateUserDto extends Partial<IUsuario> { }