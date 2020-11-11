import { User } from './user.model';
export class Entretien {
    _id: string;
    sender: User;
    description: string;
    date: string;
    comments: number;
}