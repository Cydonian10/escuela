export interface TramiteResponse {
    message: string;
    data: ITramite[];
}

export interface CreateTramiteReponse {
    message: string;
    data: ITramite;
}

export interface ITramite {
    id: number;
    apellidos: string;
    name: string;
    dni: string;
    email: string;
    descriptcionPadre: string;
    tramiteNombre: string;
    telefono: string;
    fecha: Date;
    archivoPadre: string;

    archivoDescargarAdmin?: string;
    descriptcionRecepcionista?: string;
    tramiteEstado?: string;
    visto?: boolean;
    updateAt?: Date;
}

export interface CreateTramiteDto extends Omit<ITramite, 'id'> { }

export interface UpdateTramiteDto extends Partial<CreateTramiteDto> { }

/**
 * !Tramites estado
 */

export enum ITramiteNombre {
    matricula = "matricula",
    notas = "notas",
    permiso = "permiso",
    vacante = "vacante",
    otro = "otro"
}

export enum ITramiteEstado {
    pendiente = "pendiente",
    proceso = "proceso",
    rechazado = "rechazado",
    aprobado = "aprobado"
}
