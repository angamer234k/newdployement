(async()=>{
    // default imports
    const events = require('events');
    const { exec } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const { 
        MessageEmbed, 
        MessageButton, 
        MessageActionRow, 
        Intents, 
        Permissions, 
        MessageSelectMenu 
    }= require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    let https = require("https")
    const Database  = require("easy-json-database")
    
    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire:null,
        joiningMember:null,
        reply:null,
        player:null,
        manager:null,
        Inviter:null,
        message:null,
        notifer:null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord.js'] = '^13.16.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.16.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord-logs'] = '^2.0.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION", 
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function (err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    

    // blockly code
    var a, gss;
    
    
    s4d.client.on('ready', async () => {
      s4d.client.user.setPresence({status: "idle",activities:[{name:'[FETCHING] game session(s)',type:"WATCHING"}]});
      console.clear()
          if (!database.has(String('activesessions'))) {
        database.set(String('activesessions'), 0);
      }
      s4d.client.user.setPresence({status: "idle",activities:[{name:(String(database.get(String('activesessions'))) + ' game session(s)'),type:"PLAYING"}]});
      gss = 0;
      console.log('BOT ONLINE');
      s4d.client.channels.cache.find((channel) => channel.name === 'scp-sl-rr').send({
                      content:String('Successfully booted up.'),
                      allowedMentions: {
    
    
                      }
              });
    
              os.cpuUsage(async function(v){
      	      var obj = v * 100
                s4d.client.channels.cache.find((channel) => channel.name === 'scp-sl-rr').send({
                        content:String((String('Bot CPU Usage:' + String(obj)) + '%')),
                        allowedMentions: {
    
    
                        }
                });
                    s4d.client.channels.cache.find((channel) => channel.name === 'scp-sl-rr').send({
                        content:String((String(String(String('Allowed memory usage:' + String(os.totalmem())) + 'kb. Free memory:') + String(os.freemem())) + 'kb')),
                        allowedMentions: {
    
    
                        }
                });
    
      });
    
    });
    
    s4d.client.on('guildMemberAdd', async (param1) => {
    s4d.joiningMember = param1;
    s4d.joiningMember = null
    });
    
    const database = new Database('./gamesessionscached.json')
    await s4d.client.login((process.env[String('token')])).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
            if (s4dmessage.author.bot) {
                return;
            }
              if ((s4dmessage.content).indexOf('<@1369965264279568405>') + 1 == 1) {
        s4dmessage.reply({content:String('Hi!'), allowedMentions: {
                repliedUser: false
            }});
      } else if ((s4dmessage.content).indexOf('!dumpjson') + 1 == 1) {
      } else if ((s4dmessage.content).indexOf('!shutdown') + 1 == 1) {
        if ((s4dmessage.author.id) == '1131451961942749206') {
          s4d.client.user.setPresence({status: "offline",activities:[{name:'',type:"LISTENING"}]});
          s4d.client.destroy();
        }
      }
    
        });
    
    return s4d
})();