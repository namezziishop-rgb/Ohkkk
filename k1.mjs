import baileys from "@whiskeysockets/baileys"

const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  isJidGroup,
  Browsers
} = baileys
import P from "pino"
import QRCode from "qrcode-terminal"
import fs from "fs"
import path from "path"
import readline from "readline"

const logger = P({ level: "silent" })

// ================== CONFIG & DATA ==================
const SESSIONS_DIR = "./sessions"
const DATA_FILE = "./data.json"

if (!fs.existsSync(SESSIONS_DIR)) fs.mkdirSync(SESSIONS_DIR)

let globalData = {
  owners: ["272653617213624@lid"],
  admins: [],
  delayncName: "delaync",
  delayncValue: 0.05
}

if (fs.existsSync(DATA_FILE)) {
  try {
    globalData = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
  } catch (e) {}
}

const saveData = () => fs.writeFileSync(DATA_FILE, JSON.stringify(globalData, null, 2))
const credit = "\n\n🤍 This bot made by Wahab god 🤍"
const emojis = ["🍀","🌷","☘️","🤍","🥀","💐","🌺","🌿","⚡","✨"]

const whncEmojis = {
  1: ["🤺","🎀","⚔️","🧸","🔥","💎","🥷","🌸"],
  2: ["🐉","🦋","🎯","🍭","🌪️","🎵","🛡️","🎁"],
  3: ["👑","💍","🎈","🍀","🎲","🕊️","🍒","🌟"],
  4: ["🚀","🧠","🎮","🎨","📌","⚡","🧩","🎧"],
  5: ["🦁","🐼","🐺","🐰","🐯","🐨","🐻","🐸"],
  6: ["❤️","💛","💚","💙","💜","🖤","🤍","💗"],
  7: ["🌞","🌜","⭐","☁️","❄️","🌧️","🌩️","🌈"],
  8: ["📱","💻","🖥️","⌨️","🖱️","📡","🔋","🧲"],
  9: ["🍕","🍔","🍟","🌭","🍿","🥤","🍩","🍪"],
  10: ["🏀","⚽","🎾","🏏","🏈","🥊","🏓","⛳"],
  11: ["😈","👻","💀","🤡","👹","🕷️","🦇","🎃"],
  12: ["🌹","🥀","🌷","🌻","🌼","🍂","🍃","🌿"],
  13: ["🐬","🐳","🦈","🐟","🐠","🦀","🐙","🪼"],
  14: ["🎤","🎼","🎷","🎸","🥁","🎹","🎺","🎧"],
  15: ["🥇","🏆","🎖️","🏅","🥈","🥉","🎯","⭐"],
  16: ["💰","🪙","💵","💳","🏦","📦","🛒","🎁"],
  17: ["🧪","⚗️","🔬","🧬","💉","🩺","📚","🧠"],
  18: ["🛩️","🚁","⛴️","🚗","🚲","🚄","🚀","🏍️"],
  19: ["⚡","🔥","🌪️","❄️","💧","☄️","🌋","🌊"],
  20: ["🤖","👾","🛸","💫","🌌","✨","⚙️","🔮"],
  21: ["🧕","👳","🥷","🧙","🧚","🧛","🧜","🧝"],
  22: ["🎀","💝","🎁","🧸","🍭","🌸","💗","🌷"],
  23: ["🏴‍☠️","⚔️","🗡️","🛡️","🧿","💀","🔥","🥷"],
  24: ["🐝","🕷️","🦋","🐞","🦗","🦂","🐌","🐜"],
  25: ["🌟","💫","✨","⚡","🔥","💎","🚀","🎯"],
  26: ["🥀","🍂","🕊️","🪶","☁️","🌧️","❄️","🌙"],
  27: ["🎮","👾","🕹️","💻","⌨️","📌","⚙️","🤖"],
  28: ["❤️","🔥","💍","👑","💎","🌹","✨","🎀"],
  29: ["🌸","🌼","🌿","🍃","🍀","🌷","🌹","🌻"],
  30: ["⚔️","🤺","🥷","🔥","💀","🧿","🛡️","👑"]
}

// ================== UTILS ==================
const log = (msg) => console.log(`[${new Date().toLocaleTimeString()}] ${msg}`)
const sleep = ms => new Promise(r => setTimeout(r, ms))

// ================== BOT MANAGER ==================
const sockets = {}
const nameLoops = {}

async function startBot(sessionId = "main") {
  const sessionPath = path.join(SESSIONS_DIR, sessionId)
  const { state, saveCreds } = await useMultiFileAuthState("temp")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger,
    auth: state,
    browser: Browsers.ubuntu("Chrome"),
    syncFullHistory: false,
    printQRInTerminal: true,
    connectTimeoutMs: 60000,
    keepAliveIntervalMs: 30000
  })

  sockets[sessionId] = sock

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update
    
    const number = "91XXXXXXXXXX" // apna number daal

if (connection === "connecting" && sessionId === "main") {
    setTimeout(async () => {
        try {
            let code = await sock.requestPairingCode(number)
            console.log("\nPAIRING CODE:", code)
        } catch (e) {
            console.log("Retrying pairing...")
        }
    }, 5000)
}
    if (connection === "close") {
      const statusCode = (lastDisconnect?.error)?.output?.statusCode
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut
      log(`🔄 [${sessionId}] Connection closed (${statusCode}). Reconnecting: ${shouldReconnect}`)
      
      if (shouldReconnect) {
        setTimeout(() => startBot(sessionId), 5000)
      } else {
        log(`❌ [${sessionId}] Logged out. Delete session folder to restart.`)
      }
    } else if (connection === "open") {
      log(`✅ [${sessionId}] Connected successfully!`)
    }
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      const msg = messages[0]
      if (!msg?.message || msg.key.fromMe) return

      const from = msg.key.remoteJid
      const sender = msg.key.participant || from
      const isGroup = isJidGroup(from)
      const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
      if (!text.startsWith(".")) return

      const args = text.slice(1).trim().split(/\s+/)
      const cmd = args.shift()?.toLowerCase()
      const isOwner = globalData.owners.includes(sender)
      const isAdmin = isOwner || globalData.admins.includes(sender)

      // .admin command
      if (cmd === "admin") {
        if (globalData.admins.length === 0) {
          globalData.admins.push(sender)
          saveData()
          await sock.sendMessage(from, { text: `👑 You are the first to use .admin, you are now the permanent admin.${credit}` })
        } else {
          if (globalData.admins.includes(sender)) {
            await sock.sendMessage(from, { text: `✅ You are already an admin.${credit}` })
          } else {
            await sock.sendMessage(from, { text: `❌ Admin is already set.${credit}` })
          }
        }
        return
      }

      // .menu command (Merged)
      if (cmd === "menu") {
        const menuText = `🌿WAHAB MENU 🌿
━━━━━━━━━━━━━━━━━━━━━━━━
👑 *वहाब BOT. 🎀💐*
.admin - Claim permanent admin (First person only)
.refresh - Restart all bot sessions
.add [number] - Create a new bot session
.bots - Show all active bot sessions
.delaync [0.05] - Set group name delay
.stop - Stop all bot activities

🎨 *NAME CHANGE*
.nc [text] - Start emoji name loop
.stopname - Stop name change loop
.spamname [text] - Spam group name
.gcloop [text] - Pattern emoji loop
.whnc1 to .whnc30 [text] - Custom emoji name loop

⚡ *INFO*
.ping - Test bot response speed
━━━━━━━━━━━━━━━━━━━━━━━━
${credit}`
        await sock.sendMessage(from, { text: menuText })
        return
      }

      // .refresh command
      if (cmd === "refresh" && isAdmin) {
        await sock.sendMessage(from, { text: `🔄 Refreshing all bot sessions...${credit}` })
        process.exit(0) // Workflow will auto-restart
        return
      }

      // .bots command
      if (cmd === "bots" && isAdmin) {
        const activeBots = Object.keys(sockets).filter(id => sockets[id]?.ws?.readyState === 1)
        const botList = activeBots.map((id, i) => `${i + 1}. ${id === "main" ? "Main Bot" : id.replace("bot_", "")}`).join("\n")
        const text = `🤖 *ACTIVE BOTS (${activeBots.length})* 🤖\n━━━━━━━━━━━━━━━━━━━━━━━━\n${botList || "No active bots"}\n━━━━━━━━━━━━━━━━━━━━━━━━\n${credit}`
        await sock.sendMessage(from, { text })
        return
      }

      // .add [number]
      if (cmd === "add" && isOwner) {
        const num = args[0]?.replace(/\D/g, "")
        if (!num) return sock.sendMessage(from, { text: "❌ Usage: .add [number]" })
        
        const newId = `bot_${num}`
        await sock.sendMessage(from, { text: `🤖 Bot created. Generating pairing code for ${num}...` })
        
        const tempSessionPath = path.join(SESSIONS_DIR, newId)
        const { state: tState, saveCreds: tSaveCreds } = await useMultiFileAuthState(tempSessionPath)
        const tSock = makeWASocket({ auth: tState, logger, browser: Browsers.ubuntu("Chrome") })
        
        tSock.ev.on("creds.update", tSaveCreds)
        
        try {
          // Wait for connection to be ready enough to request code
          const getCode = () => new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error("Timeout")), 30000)
            tSock.ev.on("connection.update", async (up) => {
              if (up.qr || up.connection) {
                try {
                  let code = await tSock.requestPairingCode(num)
                  clearTimeout(timeout)
                  resolve(code)
                } catch (e) {}
              }
            })
          })

          let code = await getCode()
          await sock.sendMessage(from, { text: `✅ Pairing code for ${num}: *${code}*` })
          
          // Keep it running as a separate bot
          startBot(newId)
        } catch (e) {
          await sock.sendMessage(from, { text: `❌ Error: ${e.message}` })
          try { tSock.ws.close() } catch {}
        }
        return
      }

      // .delaync
      if (cmd === "delaync" && isAdmin) {
        const val = parseFloat(args[0])
        if (!isNaN(val)) {
          globalData.delayncValue = val
          saveData()
          await sock.sendMessage(from, { text: `✅ ${globalData.delayncName} set to ${val}${credit}` })
        }
        return
      }

      // .whnc1 to .whnc30
      if (cmd?.startsWith("whnc")) {
        const numStr = cmd.replace("whnc", "")
        const num = parseInt(numStr)
        if (!isNaN(num) && num >= 1 && num <= 30) {
          if (!isGroup) return sock.sendMessage(from, { text: "❌ Group only" })
          if (!isAdmin) return
          
          if (nameLoops[from]) clearInterval(nameLoops[from])
          
          const ncText = args.join(" ") || "WHNC MODE"
          const emojiSet = whncEmojis[num] || whncEmojis[1]
          
          await sock.sendMessage(from, { text: `✨ WHNC${num} MODE STARTED: ${ncText}` })
          
          nameLoops[from] = setInterval(async () => {
            try {
              const e1 = emojiSet[Math.floor(Math.random() * emojiSet.length)]
              const e2 = emojiSet[Math.floor(Math.random() * emojiSet.length)]
              await sock.groupUpdateSubject(from, `${e1} ${ncText} ${e2}`)
            } catch {}
          }, (globalData.delayncValue || 0.05) * 1000)
          return
        }
      }

      // Group activities
      if (cmd === "nc" && isAdmin && isGroup) {
        if (nameLoops[from]) clearInterval(nameLoops[from])
        const ncText = args.join(" ") || "NC MODE"
        await sock.sendMessage(from, { text: `✨ NC MODE STARTED: ${ncText}` })
        nameLoops[from] = setInterval(async () => {
          try {
            const randomEmojis = Array.from({length: 6}, () => emojis[Math.floor(Math.random() * emojis.length)]).join("")
            await sock.groupUpdateSubject(from, `${randomEmojis} ${ncText}`)
          } catch {}
        }, (globalData.delayncValue || 0.05) * 1000)
        return
      }

      if (cmd === "stopname" && isAdmin && isGroup) {
        if (nameLoops[from]) {
          clearInterval(nameLoops[from])
          delete nameLoops[from]
          await sock.sendMessage(from, { text: `⛔ Name change stopped` })
        }
        return
      }

      if (cmd === "ping") {
        const start = Date.now()
        await sock.sendMessage(from, { text: "🏓 Pong!" })
        await sock.sendMessage(from, { text: `⚡ ${Date.now() - start}ms` })
        return
      }

      if (cmd === "stop" && isOwner) {
        Object.keys(nameLoops).forEach(key => {
          clearInterval(nameLoops[key])
          delete nameLoops[key]
        })
        await sock.sendMessage(from, { text: `⛔ All activities stopped${credit}` })
        return
      }

    } catch (e) {
      log(`Error in message handler: ${e.message}`)
    }
  })
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
async function init() {
  const mainSession = path.join(SESSIONS_DIR, "main")
  if (!fs.existsSync(path.join(mainSession, "creds.json"))) {
    rl.question("Enter your phone number for the main bot (with country code): ", async (num) => {
      const cleanNum = num.replace(/\D/g, "")
      try {
        const { state, saveCreds } = await useMultiFileAuthState(mainSession)
        const sock = makeWASocket({ 
          auth: state, 
          logger, 
          browser: Browsers.ubuntu("Chrome"),
          connectTimeoutMs: 60000
        })
        
        sock.ev.on("creds.update", saveCreds)
        sock.ev.on("connection.update", async (update) => {
          if (update.qr) {
            try {
              let mainCode = await sock.requestPairingCode(cleanNum)
              console.log(`\n========================================`)
              console.log(`YOUR PAIRING CODE: ${mainCode}`)
              console.log(`========================================\n`)
            } catch (e) {
              console.error("Pairing code error (retrying...):", e.message)
              // Retry pairing code request if connection was too fresh
              setTimeout(async () => {
                try {
                  const retryCode = await sock.requestPairingCode(cleanNum)
                  console.log(`\n========================================`)
                  console.log(`RETRY PAIRING CODE: ${retryCode}`)
                  console.log(`========================================\n`)
                } catch (re) {}
              }, 5000)
            }
          }
          if (update.connection === "open") {
            log("Main bot connected!")
          }
          if (update.connection === "close") {
             const shouldReconnect = (update.lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
             if (shouldReconnect) {
                setTimeout(() => startBot("main"), 5000)
             }
          }
        })
      } catch (e) {
        console.error("Initialization error:", e)
      }
      rl.close()
    })
  } else {
    startBot("main")
    rl.close()
  }
  
  if (fs.existsSync(SESSIONS_DIR)) {
    fs.readdirSync(SESSIONS_DIR).forEach(file => {
      if (file !== "main" && fs.lstatSync(path.join(SESSIONS_DIR, file)).isDirectory()) {
        if (fs.existsSync(path.join(SESSIONS_DIR, file, "creds.json"))) {
           startBot(file)
        }
      }
    })
  }
}

init()
