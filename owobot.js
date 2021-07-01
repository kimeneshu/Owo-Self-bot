// This code was written by https://github.com/kimene1337 All responsibility belongs to the user using the command.
// Discord.JS V11 must be used. As DM is received by oWo, the processes are stopped and after verifying, turn the node.js off and on.

const Discord = require("discord.js");
const chalk = require('chalk');
const client = new Discord.Client();

const spent = ""; // Enter Amount to Spend
const coinflipcooldown = "16000"; // 16 Sec. Cooldown
const praycooldown = "300000"; // 5 Min. Cooldown


const channelid = ""; // Write down the channel ID that can be played oWo.
const commandchannel = ""; // Type the channel ID where the transactions will be started. Write only once, if you write more than once, the process will multiply. (No matter what you write, write only once!)
const userid = ""; // Type your user id.
const prayuser = ""; // Write the user ID to be given Pray.
const owoid = "324130263036723200"; // oWo ID. Do not change!!

const token = ""; // Write User Token
const blacklist = []; // This is blacklist array (Do not change)

function isEmpty(str) {
    return (!str || str.length === 0 );
}

if(token == null || token == undefined || isEmpty(token) || !token) return console.log(`[${chalk.bold.red('ERROR')}] No token entered in the file!`)
if(spent == null || spent == undefined || isEmpty(spent) || isNaN(spent)) return console.log(`[${chalk.bold.red('ERROR')}] Amount to Spend was not entered or contains characters other than numbers!`)
if("11" > Discord.version) return console.log(`[${chalk.bold.red('ERROR')}] It has to be Discord.JS V11! (npm i discord.js@11)`)

client.on("ready", () => {

        console.log(`[${chalk.bold.blue('DISCORD')}] Successfully Connected to Discord.`)
        
        setTimeout(() => {
            console.log(`[${chalk.bold.yellow('SYSTEM')}] Waiting for the process to start.`)
        }, 1000)

        const messagechannel = client.channels.get(channelid)
        
        var coinflipmessage;
        var praymessage;

        /** */
        function pray() {
            praymessage = setInterval(() => {
                messagechannel.send(`owo pray <@${prayuser}>`)
            }, praycooldown);
        }
        /** */
        function coinflip() {
            coinflipmessage = setInterval(() => {
                messagechannel.send(`owo coinflip ${spent}`)
            }, coinflipcooldown);
        }
        /** */
        function slots() {
            coinflipmessage = setInterval(() => {
                messagechannel.send(`owo slots ${spent}`)
            }, coinflipcooldown);
        }
        /** */

client
    .on("message", async msg => {
        if(blacklist == "gg") return;
        if(msg.channel.type == "dm" && msg.channel.recipient.id == owoid) {
                const user = client.users.get(userid);
                user.send("**WARNING!:** DM Received by OwO, operations stopped completely.")
                console.log(`[${chalk.bold.red('WARNING')}] OwO DM Detected.`)
                blacklist.push("gg")
                clearInterval(coinflipmessage);
                clearInterval(praymessage);
            } else { undefined; }
    })

    .on("message", async msg => {
        if(msg.channel.id == channelid) {
            if(msg.content.includes("If you have trouble solving the captcha, please ask us in our support guild!")) {
                if(msg.member.id == owoid) {
                const user = client.users.get(userid);
                user.send(`**WARNING!:** OwO detected a Verification request on channel <#${channelid}>, operations stopped completely.`)
                console.log(`[${chalk.bold.red('WARNING')}] OwO Verification Detected.`)
                blacklist.push("gg")
                clearInterval(coinflipmessage);
                clearInterval(praymessage);
                }
            }
        }
    })

    .on("message", async msg => {
        if(blacklist == "gg") {
            return console.log(`[${chalk.bold.red('ERROR')}] Message could not be sent! (blacklist)`);
        } 
        if(msg.channel.id == commandchannel) {
            console.log(`[${chalk.bold.green('SUCCESSFUL')}] Initialization request received successfully, operation started!`)
            pray();
        } else { undefined; }
    })
})

client.login(token)
