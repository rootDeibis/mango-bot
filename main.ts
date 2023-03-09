import { Bot } from "./app/bot";
import { config, declare } from "./utils/global";

const bot: Bot = declare("bot", new Bot(config.APP_TOKEN));

bot.setCommandPrefix("!");
bot.login();


