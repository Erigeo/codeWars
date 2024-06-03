export interface User {
    email: string;
    password: string;
    telefone?: string;
    imagem?: string;
    nome?: string;
    nickname?: string;
    endereço?: Endereço;
    tipoDeUser?: String;
    eventos?: Evento[];
}

export interface Endereço {
    cidade: String;
    estado: String;
}

export interface Evento {
    id: string;
    userId: string;
    eventoNome: string;
    numParticipantes?: number;
    participantes?: User[],
    imagem?: string;
    dataInicio: Date;
    etapas?: Etapas[],
    descricao?: string;
    local: string;
    regras?: string;
    tags?: any[];
    numEtapas?: number;
}

export interface Etapas {
    id: string;
    eventoId: string;
    nome: string;
    mesas?: Mesas[]
}

export interface Mesas {
    id: string;
    etapasId: string;
    player1Id: string;
    player2Id: string;
    winnerId: string;
    loserId: string;
    duration: string;
    status: string;
}
