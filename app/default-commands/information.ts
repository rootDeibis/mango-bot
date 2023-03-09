import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { config } from "../../utils/global";
import { IDiscordCommand } from "../interfaces/IDiscordCommand";



const SlashCommand = new SlashCommandBuilder()
          .setName("info")
          .setDescription("Information command")
          


const command: IDiscordCommand = {
    data: SlashCommand,
    permissions: ["Administrator"],
    executor(event: ChatInputCommandInteraction) {

        const embed = new EmbedBuilder()
            .setTitle("Mango Chan Bot Information")
            .setDescription("Mango Chan is a multitasking discord bot, you can find more information on our website.")
            .addFields({
                name: "CPU Consume",
                value: `[MB] ${(process.cpuUsage().system / 1000) / 1000}  - [KB] ${process.cpuUsage().system / 1000}`,
                inline: true
            })
            .addFields({
                name: "Servers",
                value: `${event.client.guilds.cache.size}`,
                inline: true
            })
            .addFields({
                name: "Members",
                value: `${event.client.guilds.cache.map(guild => guild.memberCount).reduce((p,n) => p + n)}`,
                inline: true
            })
            .addFields({
                name: "Mango Verison",
                value: `${config.VERSION}`,
                inline: true
            })
            .setColor("Random")
            .setFooter({text: "Mango Chan is developed and maintained by rootDeibis", iconURL: 'https://cdn.discordapp.com/avatars/781487348382302250/4250162ea135c1bd1dcc1d23a5145c0f.webp?size=80'})
            .setTimestamp(Date.now())
            .setThumbnail("https://cdn.discordapp.com/avatars/1060744182504894495/4eded1daec1cc8d33dc362e8cf65c5f7.webp?size=1024")




            if(event.user.id == "781487348382302250") {

                
                event.channel?.sendTyping()
                .then(() => {
                    event.reply({embeds: [embed]});
                });


            }

      
        
    }
}


export default command;