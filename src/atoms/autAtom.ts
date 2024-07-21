import { atom } from "jotai";
import { User } from "../interfaces";



export const loginAtom = atom(false);
export const tokenAtom = atom<string | null>(null);
export const userDetailsAtom = atom<User | null>(null);
