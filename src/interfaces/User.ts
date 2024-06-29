export interface Player {
    email: string; 
    password: string;
    phone?: string; //
    image?: string; //
    name: string; 
    username: string;
    nickname?: string;
    role?: string;
    address?: Endereço; // 
    winrate?: number; 
    deckId?: string;
    eventPoints?: number;
    appliedEventsId?: string[];
    opponentIds?: string[];
    historicoEventos?: Event[];
    opponentsMatchWinrate?: number;
}

export interface Manager {
    email: string; 
    password: string;
    role?: string;
    phone?: string; //
    image?: string; //
    name: string; 
    username: string;
    nickname?: string;
    address?: Endereço; //
    events?: Events[];
}

export interface Endereço {
    cidade: string;
    estado: string;
}

export interface Events {
    id?: string;
    managerId: string;
    name: string;
    location: string;
    numberOfParticipants?: number;
    playerIds?: string[],
    imagePath?: string;
    date?: Date;
    description?: string; //
    rules?: string; //
    tags?: string[]; //
    numberOfRounds: number;
    currentRound?: number;
    hasStarted?: boolean;
    finished?: boolean;
    pairings?: Pairing[];
}



export interface Pairing {
    playerOneId: string;
    playerTwoId: string;
    result?: number;
}

export interface EventResult {
    id: string;
    eventId: string;
    playersResult: PlayerResult[];
}

export interface PlayerResult{
    playerId: string;
    eventPoints: number;
    winrate: number;
    opponentsIds: string[];
    deckId: string;
}

export interface Deck {
    id: string;
    deckName: string;
    deckList: string;
    positionFrequencies: Map<number, number>;
}



