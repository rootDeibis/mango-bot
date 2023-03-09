import { GlobalVariableException } from "../../app/exceptions/GlobalVariableException";
import { IEnv } from "../../app/interfaces/IEnv";



import { config as env } from 'dotenv';
import { IDiscordEvent } from "../../app/interfaces/IDiscordEvent";
import { Message } from "discord.js";

env();

const app_process: any = process;


export const config: IEnv = app_process.env;


export function declare(name: string, value: any) {

    if(!('global' in app_process)) app_process['global'] = {};

    app_process.global[name] = value;

    return get<any>(name);
}


export function get<T>(name: string): T {
    if('global' in app_process && name in app_process.global) {
        return <T> app_process.global[name];
    } else {
        throw new GlobalVariableException("Invalid variable name: " + name);
    }
}