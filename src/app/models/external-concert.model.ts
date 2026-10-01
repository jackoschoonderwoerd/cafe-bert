import { Timestamp } from 'firebase/firestore';
import { ConcertArtistEntry } from './concert-artist-entry.model';

export interface ExternalConcert {
    id: string;
    startAt: Timestamp;
    endAt: Timestamp;
    artistEntries: ConcertArtistEntry[];
}
