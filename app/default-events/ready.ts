import { Client, ActivityType } from "discord.js";
import { Bot } from "../bot";
import { IDiscordEvent } from "../interfaces/IDiscordEvent";


const event: IDiscordEvent = {
    name: "ready",
    type: "on",
    handle: function (event: Client, bot: Bot) {

        console.log("Bot ready!");
        event.user?.setPresence({
            activities: [{name: "In development", type: ActivityType.Competing}]
        })


       bot.getCommands().forEach(command => {
        event.application?.commands.create(command.data)
       })
        
    }
}


export default event;