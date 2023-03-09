import { ClientEvents, ApplicationCommandPermissionsUpdateData } from "discord.js";
import { Bot } from "../bot";

type eventType = "on" | "once";


export interface IDiscordEvent {
    name: keyof ClientEvents
    type: eventType
    handle: (event: any, bot: Bot) => any
}