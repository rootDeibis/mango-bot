import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Bot } from "../bot";
import { IDiscordCommand } from "../interfaces/IDiscordCommand";
import { IDiscordEvent } from "../interfaces/IDiscordEvent";

const event: IDiscordEvent = {
    name: "interactionCreate",
    type: "on",
    handle: function (interaction: ChatInputCommandInteraction, bot: Bot) {
        
        if(!interaction.isCommand()) return;


        const SlashCommand: IDiscordCommand | undefined = bot.getCommand(interaction.commandName);


        if(SlashCommand) {
            if(interaction.member) {
                if(SlashCommand.permissions?.every(perm => interaction.memberPermissions?.has(perm))) {
                    SlashCommand.executor(interaction, bot);
                } else {

                    const NecesaryPermissions = SlashCommand.permissions?.filter(perm => !interaction.memberPermissions?.has(perm)) || [];

                    const PermissionEmbed = new EmbedBuilder()
                    
                    .setTitle("You cannot execute this command because you need the following permissions:")
                    .setDescription( NecesaryPermissions.join(", "))
                    .setColor("Red")
                    .setFooter({text: "Mango Chan Developed by rootDeibis"})
                    .setTimestamp(Date.now());

                    interaction.reply({embeds: [PermissionEmbed]})

                }
           }
        }


    }
}

export default event;