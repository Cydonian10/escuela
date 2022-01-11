import { Rol } from './rol.enum';
import { IUsuario } from './usuarios.interface';
export interface IAsitenciaResponse {
    message: string;
    data: IAsistencia;
}

export interface IAsitenciasResponse {
    message: string;
    data: IAsistencia[];
}

export interface IAsistencia {
    id: number,
    horaSalida: Date,
    horaEntrada: Date,
    fecha: Date,
    asistio: number,
    description: string,
    descriptionSalida: string,
    //   createAt: "2021 - 11 - 17T19: 06: 25.546Z",
    //   updateAt: "2021 - 11 - 17T19: 06: 25.546Z",
}

export interface CreateAsistenciaDto {
    usuarioId: number;
    horaEntrada: Date;
    description: string;
}

export interface UpdateAsisteciaDto {
    horaSalida?: Date,
    horaEntrada?: Date,
    fecha?: Date,
    asistio?: number,
    description?: string,
    descriptionSalida?: string,
}

export interface IAsitenciaLocalStorage {
    name: string;
    lastName: string;
    id: number,
    horaSalida: Date,
    horaEntrada: Date,
    fecha: Date,
    asistio: number,
    description: string,
    descriptionSalida: string,
}

//!Asistencia por usuario

export interface IAsistenciaNuevo {
    name: string;
    lastName: string;
    id: number,
    horaSalida: Date,
    horaEntrada: Date,
    fecha: Date,
    asistio: number,
    description: string,
    descriptionSalida: string,
}

export interface IResponseAsistenciaByUsuario {
    data: IAsistenciaNuevo[];
}