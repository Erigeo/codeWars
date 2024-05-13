export interface User {
    email: string;
    password: string;
    telefone?: string;
    imagem?: string;
    nome?: string;
    nickname?: string;
    endereço?: Endereço;
    tipoDeUser?: String;
    //eventos?: []; jsonserver é limitado, nao consigo add novos eventos a um array.
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
    etapas?: [],
    descricao?: string;
    local: string;
    regras?: string
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
