import { Simulation } from "./simulation.interface";
import { Subscription } from "./subscription.interface";

export interface User {
    id: string;
    email: string;
    password: string;
    role: 'AMAZONE' | 'ADMIN';
    createdAt: Date;
    updatedAt: Date;
    simulations: Simulation[]
    subscriptions: Subscription[]
}