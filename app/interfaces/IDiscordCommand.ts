import { ChatInputCommandInteraction, PermissionsString, SlashCommandBuilder } from 'discord.js';
import { Bot } from '../bot';

export interface  IDiscordCommand {
    data: SlashCommandBuilder
    permissions?: PermissionsString[],
    executor: (event: ChatInputCommandInteraction, bot: Bot) => any
}

