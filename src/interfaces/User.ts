export interface User {
    email: string;
    password: string;
    telefone?: string;
    imagem?: string;
    nome?: string;
    nickname?: string;
    endereço?: Endereço;
    tipoDeUser?: String;
    meusEventos?: [];
}

export interface Endereço {
    cidade: String;
    estado: String;
}

export interface Evento {
    eventoId: string;
    donoId: string;
    eventoNome: string;
    numParticipantes?: number;
    participantes: User[],
    imagem?: string;
    dataInicio: Date;
    etapas: Etapas[]
}

export interface Etapas {
    mesas: Mesas[];
    nome: string;

}

export interface Mesas {
    player1Id: string;
    player2Id: string;
    winnerId: string;
    loserId: string;
    duration: string;
}
