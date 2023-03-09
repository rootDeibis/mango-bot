import { Client, Routes } from "discord.js";
import { InvalidBotTokenException } from "./exceptions/InvalidBotTokenException";
import { IDiscordCommand } from "./interfaces/IDiscordCommand";
import { IDiscordEvent } from "./interfaces/IDiscordEvent";


import path from 'path';
import search from "../utils/file-search";

export class Bot {


    private token: Readonly<string>
    private commands: Array<IDiscordCommand>
    private command_prefix: string | undefined
    private client: Client

    constructor(token: string) {
        

        if(token.length < 10) throw new InvalidBotTokenException("Invalid bot token > " + token); 


        this.token = token;
        this.commands = [];

        this.client = new Client({intents: ["GuildMessages", "MessageContent", "GuildMembers", "Guilds", "GuildMessageReactions", "GuildMessageTyping"]});

        search<IDiscordEvent>(path.resolve(__dirname, "default-events"))
        .then(modules => modules.forEach(event => this.registerEvent(event)))

        search<IDiscordCommand>(path.resolve(__dirname, "default-commands"))
        .then(modules => modules.forEach(cmd => this.registerCommand(cmd)))
        
    }

    public setCommandPrefix(prefix: string) {
        this.command_prefix = prefix;
    }

    public getCommandPrefix(): string | undefined {
        return this.command_prefix;
    }

    public getCommands(): IDiscordCommand[] {
        return this.commands;
    }

    public getCommand(name: string): IDiscordCommand | undefined {
        return this.commands.find(command => command.data.name == name);

    }

    public registerCommand(command: IDiscordCommand): void {
        this.commands.push(command); 
    }

    public registerEvent(event: IDiscordEvent) {
        

        if(event.type == "on")
            this.client.on(<string>event.name, (d) => event.handle(d, this));
        else
            this.client.once(<string>event.name,(d) => event.handle(d, this));
    }


    public login(): void {

        this.client.login(this.token);
    }

    

}