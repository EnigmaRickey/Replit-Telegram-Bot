//the code is funtional now

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const token = process.env.TELEGRAM_TOKEN;
const scrape = require("./index")
const axios = require("axios")
const cron = require('node-cron');
let titleArr = []
let globalChatId = 1283346014


// Create a bot instance
const bot = new TelegramBot(token, { polling: true });


// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  globalChatId = chatId
  // console.log(chatId)
  bot.sendMessage(chatId, 'Welcome to my bot!');
});


cron.schedule('0 * * * *',()=>{
  scrape().then((res)=>{
    data = titleArr[titleArr.length-1]
    console.log(data)
    console.log(res.title)
    if(res.title != data){
      console.log("we should text now")
      const message = `
      -Title ==> ${res.title}\n
-Bounty ==> ${res.price}\n
-Time left ==> ${res.time_remaining}\n
-Status ==> ${res.status}\n
-Post time ==> ${res.time_posted}\n
-Number of Applicants ==> ${res.number_of_applicants}\n
-Descriptions ==> "${res.description}"\n
-url ==> ${res.url}\n
`
      bot.sendMessage(globalChatId,message)
      titleArr.push(res.title)
      if(titleArr.length==10){
        titleArr = []
        titleArr.push(data)
      }
      
    }
    else{
      console.log("not the right time")
    }
  })
})
  
  




const link_to_site = `https://replit-bounty.onrender.com`


cron.schedule('0 */14 * * * *', () => {

axios.get(link_to_site, { 
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
})
    .then((req,res) => {console.log(`hit`)})
    .catch((err)=>{
    // console.log(err)
    })

});


