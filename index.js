const {
	WAConnection,
	Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    MessageType,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    GroupSettingChange,
    waChatKey,
    mentionedJid,
    processTime
} = require("@adiwajshing/baileys")
const hx = require('hxz-api')
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const { exec } = require('child_process')
const { fetchJson, color, bgcolor } = require('./lib/fetcher')
const { y2mate } = require('./lib/y2mate');
const { y2mateA, y2mateV } = require('./lib/y2mate.js')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const { wikiSearch } = require('./lib/wiki.js')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, success, close } = require('./lib/function')

const fetch = require('node-fetch')
const get = require('got')
const speednye = require('performance-now')
const fs = require('fs')
const os = require('os')
const qrcode = require('qrcode-terminal')
const brainly = require('brainly-scraper')
const moment = require('moment-timezone')
const welkom = JSON.parse(fs.readFileSync('./lib/group/welcome.json'))
const yts = require('yt-search')
const request = require('request')
const pebz = new WAConnection()
const {
	OwnerNumber,
	prefix,
	lol
} = require('./lib/config.json')

fake = '```ARULGANZ```\n*Status : Online*'
let gambar = "" || fs.readFileSync('./media/gambar/biasa.png')
self = false
blocked = []

// SYSTEM QRCODE
pebz.ReconnectMode = 2
pebz.logger.level = 'warn'
pebz.version = [2, 2143, 12];
pebz.browserDescription = ['ArulBot', 'Safari', '3.0']
console.log(start)
console.log('>', '[',color('Berhasil Tersambung Ke Perangkat','lime'),']','FEBSELF')
pebz.on('qr', qr => {
qrcode.generate(qr, { small : true })
console.log(color(`[ BOT ] SCAN QR DI ATAS BRO`,'white'))
})

pebz.on('credentials-updated', () => {
	const authinfo = pebz.base64EncodedAuthInfo()
	console.log('session has bim save')
	fs.writeFileSync('./pebz.json', JSON.stringify(authinfo, null, '\t'))
})
   fs.existsSync('./pebz.json') && pebz.loadAuthInfo('./pebz.json')
   pebz.connect();
 
   pebz.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	}) 
	
	pebz.on("CB:Call", json => {
		let call;
		calling = JSON.parse(JSON.stringify(json))
		call = calling[1].from
		setTimeout(function(){
			pebz.sendMessage(call, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!.\nJika ingin membuka block harap chat Owner!\nhttps//wa.me/+6285849261085', MessageType.text)
			.then(() => pebz.blockUser(call, "add"))
			}, 100);
		})
		

pebz.on('group-participants-update', async (chat) => {
		try {
			const mdata = await pebz.groupMetadata(chat.jid)
			console.log(chat)
			if (chat.action == 'add') {
				num = chat.participants[0]
				try {
					ppimg = await pebz.getProfilePicture(`${chat.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `*Hallo* @${num.split('@')[0]}\nSelamat datang di group *${mdata.subject}*\nJangan rusuh ya\nJangan lupa intro @${num.split('@')[0]} ðŸ—£\nBtw Admin Disini Ganteng-Ganteng+Cantik-CantikðŸ˜‚ðŸ¤­`
				let buff = await getBuffer(ppimg)
				pebz.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
				} else if (chat.action == 'remove') {
				num = chat.participants[0]
				try {
					ppimg = await pebz.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `*Mau Tau Anak Kintill Gak? IniðŸ‘†* @${num.split('@')[0]}\n*fuck this human*`
				let buff = await getBuffer(ppimg)
				pebz.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
		
		
	    pebz.on('chat-update', async (mek) => {
		try {
			if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.blocked
			global.prefix
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
			
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const wita = moment.tz("Asia/Makassar").format("HH:mm:ss")
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
           
            const botNumber = pebz.user.jid
			const ownerNumber = ['6281229859085@s.whatsapp.net',`${OwnerNumber}@s.whatsapp.net`]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = pebz.contacts[sender] != undefined ? pebz.contacts[sender].vname || pebz.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await pebz.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const q = args.join(' ')
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
            const isWelcome = isGroup ? welkom.includes(from):false
			const isOwner = ownerNumber.includes(sender)

const sendFile = async (medya, namefile, capti, tag, vn) => {
  baper = await getBuffer(medya)
  mimi = ''
  if (namefile.includes('m4a')){
  pebz.sendMessage(from, baper, audio,{mimetype: 'audio/mp4',quoted: tag, filename: namefile, ptt: vn})
  }
  if (namefile.includes('mp4')){
  pebz.sendMessage(from, baper, video, {mimetype: 'video/mp4', quoted: tag, caption: capti, filename: namefile})
  }
  if (namefile.includes('gif')){
  pebz.sendMessage(from, baper, video, {mimetype: Mimetype.gif, caption: capti, quoted: tag, filename: namefile})
  } 
  if (namefile.includes('png')){
  pebz.sendMessage(from, baper, image, {quoted: tag, caption: capti, filename: namefile})
  }
  
  if (namefile.includes('webp')){
  pebz.sendMessage(from, baper, sticker, {quoted: tag})
  } else {
  kobe = namefile.split(`.`)[1]
  pebz.sendMessage(from, baper, document, {mimetype: kobe, quoted: tag, filename: namefile})
  }
}
const sendFileFromUrl = async(link, type, options) => {
hasil = await getBuffer(link)
pebz.sendMessage(from, hasil, type, options).catch(e => {
fetch(link).then((hasil) => {
pebz.sendMessage(from, hasil, type, options).catch(e => {
pebz.sendMessage(from, { url : link }, type, options).catch(e => {
reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
console.log(e)
})
})
})
})
}

			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				pebz.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				pebz.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? pebz.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : pebz.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			       const fakethumb = (teks, yes) => {
            pebz.sendMessage(from, teks, image, {thumbnail:fs.readFileSync('./media/gambar/biasa.png'),quoted:mek,caption:yes})
            } 
			const sendWebp = async(from, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './trash' + names + '.png', async function () {
                    console.log('selesai');
                    let ajg = './trash' + names + '.png'
                    let palak = './trash' + names + '.webp'
                    exec(`ffmpeg -i ${ajg} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${palak}`, (err) => {
                        let media = fs.readFileSync(palak)
                        pebz.sendMessage(from, media, MessageType.sticker,{quoted:mek})
                        fs.unlinkSync(ajg)
                        fs.unlinkSync(palak)
                    });
                });
            }
			const sendMedia = async(from, url, text="", mids=[]) =>{
                if(mids.length > 0){
                    text = normalizeMention(from, text, mids)
                }
                const fn = Date.now() / 10000;
                const filename = fn.toString()
                let mime = ""
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        mime = res.headers['content-type']
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, filename, async function () {
                    console.log('kelar');
                    let media = fs.readFileSync(filename)
                    let type = mime.split("/")[0]+"Message"
                    if(mime === "image/gif"){
                        type = MessageType.video
                        mime = Mimetype.gif
                    }
                    if(mime.split("/")[0] === "audio"){
                        mime = Mimetype.mp4Audio
                    }
                    pebz.sendMessage(from, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
                    fs.unlinkSync(filename)
                });
            }
            const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
                };
                download(url, './stik' + names + '.png', async function () {
                console.log('Done Kak Pebri');
                let filess = './stik' + names + '.png'
                let asw = './stik' + names + '.webp'
                exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                let media = fs.readFileSync(asw)
                pebz.sendMessage(to, media, MessageType.sticker,{quoted:mek})
                fs.unlinkSync(filess)
                fs.unlinkSync(asw)
                });
                });
                }			


        
	        mess = {
				wait: 'tunggu sebentar.......',
				success: 'Sucess âœ“â€œ',
				notxt: 'textnya mana ?',
				error: {
					stick: 'gagal saat konvensi gambar ke sticker',
					Iv: 'link nya mokd :v'
				},
				only: {
					group: 'Khusus Grup!',
					ownerB: 'Khusus Owner Bot',
					admin: 'Khusus Admin grup'
				}
			}
		   const lordpeb = {
	       key : {
           participant : '0@s.whatsapp.net'
           },
           message: {
           liveLocationMessage: {
           caption: `${pushname} ${pushname}`,
           jpegThumbnail: gambar
           }
           }
           }
        const fkontak = { 
        key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `0@s.whatsapp.net` } : {}) }, message: { 'contactMessage': { 'displayName': `Hallo Kak ${pushname}\nSilahkan Pilih Menunya`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': gambar}}}                   		
        const sendButton = async (from, context, fortext, but, mek) => {
        buttonMessages = {
        contentText: context,
        footerText: fortext,
        buttons: but,
        headerType: 1
            }
        pebz.sendMessage(from, buttonMessages, buttonsMessage, {
        quoted: fkontak
        })
        }
        const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
        const buttonMessage = {
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 1,
        };
        pebz.sendMessage(
        id,
        buttonMessage,
        MessageType.buttonsMessage,
        options
        );
        };
        const sendButImage = async (from, context, fortext, img, but, mek) => {
        jadinya = await pebz.prepareMessage(from, img, image)
        buttonMessagesI = {
        imageMessage: jadinya.message.imageMessage,
        contentText: context,
        footerText: fortext,
        buttons: but,
        headerType: 4
        }
        pebz.sendMessage(from, buttonMessagesI, buttonsMessage, {
        quoted: fkontak,
        })
        }
        async function sendButLocation(id, text1, desc1, gam1, but = [], options = {}) {
        const buttonMessages = { locationMessage: { jpegThumbnail: gam1 }, contentText: text1, footerText: desc1, buttons: but, headerType: 6 }
        return pebz.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }
const time2 = moment().tz("Asia/Makassar").format("HH:mm:ss");
    if (time2 < "24:59:00") {
      var ucapanWaktu = "GoodNight";
    }
    if (time2 < "19:00:00") {
      var ucapanWaktu = "GoodEvening";
    }
    if (time2 < "18:00:00") {
      var ucapanWaktu = "GoodEvening";
    }
    if (time2 < "15:00:00") {
      var ucapanWaktu = "GoodAfternoon";
    }
    if (time2 < "11:00:00") {
      var ucapanWaktu = "GoodMoorning";
    }
    if (time2 < "05:00:00") {
      var ucapanWaktu = "GoodNight";
    }
    function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}			
			colors = ['red','white','black','blue','yellow','green']
	     	const isMedia = (type === 'imageMessage' || type === 'videoMessage')
            const isQuotedText = type === 'extendedTextMessage' && content.includes('textMessage')
            const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
            const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
           const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mPEBSELF\x1b[1;37m]', color(pushname), 'Menggunakan Fitur', color(command), 'args :', color(args.length))
        	if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mPEBSELF\x1b[1;37m]', color(pushname), 'Memakai Fitur', color(command), 'DI Group', color(groupName), 'args :', color(args.length))        	        	
            if (self === true && !isOwner && isCmd) return
          
           
             switch(command) {
             case 'menu':
             case 'help':
             uptime = process.uptime()            
		     const hiya = await fetchJson('https://xinzbot-api.herokuapp.com/api/ucapan?apikey=XinzBot&timeZone=Asia/Jakarta', {method:'get'})
		     var p = '```'
		const tod =`
┏━━━━━━━━━━━━━━━⬣ 
┃┃✯┏━━⬣ *ARUL BOTZ*
┃┃✯┃⬡ ${p}⚜️Hai kak ${pushname}${p}		
┃┃✯┃⬡ ${p}🔣Prefix : ${prefix}${p}
┃┃✯┃⬡ ${p}🌟Runtime : ${kyun(uptime)}${p}
┃┃✯┗━━⬣
┗━━━━━━━━━━━━━━━⬣`
tod2 =`
┏━━━━━━━➤「 𝐌𝐄𝐍𝐔 𝐍𝐘𝐀」
┃┃✯${p}1. ${prefix}sticker <reply img>${p}
┃┃✯${p}2. ${prefix}sticker2 <reply img>${p}
┃┃✯${p}3. ${prefix}toimg <reply sticker>${p}
┃┃✯${p}4. ${prefix}wiki <query>${p}
┃┃✯${p}5. ${prefix}pinterest <query>${p}
┃┃✯${p}6. ${prefix}tourl <reply media>${p}
┃┃✯${p}7. ${prefix}ssweb <Url>${p}
┃┃✯┏━━⬣ 𝖮𝖶𝖭𝖤𝖱 𝖬𝖤𝖭𝖴 
┃┃✯┃⬡ ${p}1. ${prefix}bc <query>${p}                   
┃┃✯┃⬡ ${p}2. ${prefix}bc2 <query>${p}                
┃┃✯┃⬡ ${p}3. ${prefix}bcs <reply sticker>${p}     
┃┃✯┃⬡ ${p}4. ${prefix}bca <reply audio>${p}
┃┃✯┃⬡ ${p}5. ${prefix}bcv <reply gif/video>${p}
┃┃✯┗━━━━━━━━━━⬣
┃┃✯┏━━⬣ 𝖦𝖱𝖴𝖯 𝖬𝖤𝖭𝖴
┃┃✯┃⬡ ${p}1. ${prefix}setgc ${p}
┃┃✯┃⬡ ${p}2. ${prefix}tagall <query>${p}
┃┃✯┃⬡ ${p}3. ${prefix}hidetag <teks>${p}
┃┃✯┗━━━━━━━━━━⬣
┃┃✯┏━━⬣ 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖬𝖤𝖭𝖴 
┃┃✯┃⬡ ${p}1. ${prefix}play <query>${p}                   
┃┃✯┃⬡ ${p}2. ${prefix}ytdl <url>${p}                
┃┃✯┃⬡ ${p}3. ${prefix}ytmp3 <url>${p}     
┃┃✯┃⬡ ${p}4. ${prefix}ytmp4 <url>${p}
┃┃✯┃⬡ ${p}4. ${prefix}ttwm <url>${p}
┃┃✯┃⬡ ${p}5. ${prefix}ttnowm <url>${p}
┃┃✯┗━━━━━━━━━━⬣
┗━━━━━━━「 *Bot WhatsaApp by ArulGanz*」
`
           but = [
          { buttonId: `${prefix}owner`, buttonText: { displayText: '```OWNER```' }, type: 1 }, { buttonId: `${prefix}patnerbot`, buttonText: { displayText: '```PATNER BOT```' }, type: 1 }
                  ]
        sendButLocation(from, tod, tod2, gambar, but)
           break
        case 'patnerbot':
teks =
`┏━➤ 「 *Patner Bot*」
┃┃✯ *1. Aril Dwi Indra Lesmana*😎
┃┃✯ *2. Dimas Ari Saputra*😎
┃┃✯ *3. ArulGanz*😎
┃┃✯ *Kita Nob Bang Jangan Di Bully*
┃┃✯ *Udah Jago Gak Boleh Sombong*
┗━━━━━━━
┏━➤ 「 *Follow Instagram Owner Botz*」
┃┃✯ *https://bit.ly/3dT9725*
┗━━━━━━━`
gam = fs.readFileSync('./media/gambar/patner.png')
but = [
          { buttonId: `${prefix}menu`, buttonText: { displayText: 'Back To Menu' }, type: 1 }, { buttonId: `${prefix}officialgc`, buttonText: { displayText: 'Grup Bot Me' }, type: 1 },
        ]
        sendButLocation(from, teks, "©BotWhatsapp By ArulGanz", gam, but)
break
case 'officialgc':
               let pp2 =`
┏━➤ 「 *Join Grup Bang*」
┃┃✯ *https://bit.ly/3dAK8Ag*
┗━━━━━━━`
          gam = fs.readFileSync('./media/gambar/ping.png')
          but = [
          { buttonId: `.owner`, buttonText: { displayText: 'Join Ya Bang' }, type: 1 }
        ]
        sendButLocation(from, pp2, "©BotWhatsapp By ArulGanz", gam, but)
        break;        
        case 'bcsticker':
case 'bcs':
					if (!mek.key.fromMe && !isOwner && !isCreator) return reply(lang.onlyOwner())
					anu = await pebz.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedSticker) {
						const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						bc = await pebz.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							pebz.sendMessage(_.jid, bc, sticker, {quoted:mek})
						}
						fakestatus('Suksess broadcast')
					}
					break
case 'bcvideo':
case 'bcv':
					if (!mek.key.fromMe && !isOwner && !isCreator) return reply(lang.onlyOwner())
					anu = await pebz.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedVideo) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						bc = await pebz.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							pebz.sendMessage(_.jid, bc, video, {mimetype: 'video/mp4', duration: 359996400,quoted: ftoko,caption: `[ *Izin BroadCast Kak* ]\n\n${body.slice(9)}`})
						}
						fakestatus('Suksess broadcast')
					}
					break
	case 'bcaudio':
	case 'bca':
					if (!mek.key.fromMe && !isOwner && !isCreator) return reply(lang.onlyOwner())
					anu = await pebz.chats.all()
					if (isMedia && !mek.message.audioMessage || isQuotedAudio) {
						const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						bc = await pebz.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							pebz.sendMessage(_.jid, bc, audio, {mimetype :  'audio/mp4' , duration : 359996400, ptt : true,quoted: ftoko,caption: `[ *Izin BroadCast Kak* ]\n\n${body.slice(9)}`})
						}
						fakestatus('Suksess broadcast')
					}
					break
            case 'pinterest':
            if(!q) return reply('gambar apa?')
            let pin = await hx.pinterest(q)
            let ac = pin[Math.floor(Math.random() * pin.length)]
            let di = await getBuffer(ac)
            await pebz.sendMessage(from,di,image,{quoted: mek})
            break
            case 'ssweb':
             if (args.length == 0) return reply(`Example: ${prefix + command} https://nekopoi.care/`)
             reply(mess.wait)
             ini_link = args[0]
             ini_buffer = await getBuffer(`https://hardianto-chan.herokuapp.com/api/tools/ssweb?url=${ini_link}&apikey=hardianto`)
             await pebz.sendMessage(from, ini_buffer, image, { quoted: mek })
             break
       	   case 'tiktokdl':
       	   case 'tiktok':
       	   case 'tt':
       	   case 'ttdl':
 		   if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(error.lv)
 		   reply(mess.wait)
		    hx.ttdownloader(`${args[0]}`)
    		.then(result => {
    		const { wm, nowm, audio } = result
    		axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
    		.then(async (a) => {
    		me = `*Udah Gw Downloadin nih Ngab Bilang Makasih Kek!!*`
                pebz.sendMessage(from,{url:`${nowm}`},video,{mimetype:'video/mp4',quoted:mek,caption:me})
		    })
                    })
     		.catch(e => console.log(e))
     		break
           case 'simi':
           case 'p':
           case 'bot':
           if (args.length == 0) return reply(`Hallo Kak ${pushname}`)
           teksni = args.join(" ")
           get_result = await fetchJson(`https://api.lolhuman.xyz/api/simi?apikey=${lol}&text=${teksni}`)
           getresult = get_result.result
             reply(getresult)         
             break           
             case 'wiki':
            if (args.length < 1) return reply(' Yang Mau Di Cari Apa? ')
            teks = args.join(' ')
            resa = await wikiSearch(teks).catch(e => {
            return reply('_[ ! ] Error Hasil Tidak Ditemukan_') 
            }) 
result = `â’ã€Œ  *Wiki*  ã€
â”œ *Judul :* ${resa[0].judul}
â”” *Wiki :* ${resa[0].wiki}`
           sendFileFromUrl(resa[0].thumb, image, {quoted: fkontak, caption: result}).catch(e => {
           reply(result)
           })
        break
        case 'play':
        case 'youtube':
        case 'youtubdl':
        case 'yt':
        case 'ytdl':
        if (args.length < 1) return reply(`Kirim perintah *${prefix}play query`)
        reply(mess.wait)
        let yut = await yts(q)
        yta(yut.videos[0].url)             
        .then(async(res) => {
        const { thumb, title, filesizeF, filesize } = res
        const capti = `ð—¬ð—¢ð—¨ð—§ð—¨ð—•ð—˜ ð—£ð—Ÿð—”ð—¬ðŸ
		     
â€¢ðŸ’¬ Judul : ${yut.all[0].title}
â€¢ðŸŽ¥ ID Video : ${yut.all[0].videoId}
â€¢â°ï¸ Diupload Pada : ${yut.all[0].ago}
â€¢ðŸ‘ï¸ï¸ Views : ${yut.all[0].views}
â€¢â–¶ï¸ Durasi : ${yut.all[0].timestamp}
â€¢ðŸ“ Channel : ${yut.all[0].author.name}
â€¢ðŸ”— Link Channel : ${yut.all[0].author.url}`      
        ya = await getBuffer(thumb)
        py =await pebz.prepareMessage(from, ya, image)
        gbutsan = [{buttonId: `${prefix}buttonmusic ${yut.all[0].url}`, buttonText: {displayText: 'ðŸŽµAUDIO'}, type: 1},{buttonId: `${prefix}buttonvideo ${yut.all[0].url}`, buttonText: {displayText: 'ðŸŽ¥VIDEO'}, type: 1}]
        gbuttonan = {
        imageMessage: py.message.imageMessage,
        contentText: capti,
        footerText: '```®Bot WhatsApp by ArulGanz```\n\n```Â®SILAHKAN PILIH MEDIA DIBAWAH INI```',
        buttons: gbutsan,
        headerType: 4
}
        await pebz.sendMessage(from, gbuttonan, MessageType.buttonsMessage)})
        break                
        case 'buttonmusic':
        if(!q) return reply('linknya?')              
        res = await yta(`${q}`).catch(e => {
        reply('```[ ! ] Error Saat Mengirim Audio```')})
        sendMedia(from, `${res.dl_link}`,{quoted:mek})
        break         
        case 'buttonvideo':
        if(!q) return reply('linknya?')            
        res = await ytv(`${q}`).catch(e => {
        reply('```[ ! ] Error Saat Mengirim Video```')})
        sendMedia(from, `${res.dl_link}`,'Nih Kack')
        break                               
           case 'self':
           if (!isOwner) return reply(mess.only.ownerB)
           if (self === true) return 
            let pebzk = {
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
           }
           }
           }
           }
           self = true 
           let lat =`_SUCESSS_`
           pebz.sendMessage(from, lat, MessageType.text, pebzk)
           break  
           case 'status': 
           uptime = process.uptime()
           let pingnye = speednye();
           let ping = speednye() - pingnye 
           
           const { 
           os_version } = pebz.user.phone
           let akutext =`_ã€ŒSTATUSã€_
*NAMA : ${pebz.user.name}*
*BROWSER : ${pebz.browserDescription[1]}*
*HOST : ${pebz.browserDescription[0]}*
*VERSI : ${pebz.browserDescription[2]}*
*HP : ${pebz.user.phone.device_manufacturer}*
*WA : ${pebz.user.phone.wa_version}*
*RAM : ${(process.memoryUsage().heapUsed / 111 / 1029 ).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1000 / 2000 )}MB*
*OS : ${os_version} ANDROID*
*SPEED : ${ping.toFixed(4)} SECOND
*Runtime : ${kyun(uptime)}*
` 
            let faker = {
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
           }
           }
           }
           }
           pebz.sendMessage(from, akutext, text, faker) 
           break
           case 'public':
           if (!isOwner) return reply(mess.only.ownerB)
           if (self === false) return 
           let pebzganskun = {
           contextInfo: {
           participant: '0@s.whatsapp.net',
           remoteJid: 'status@broadcast',
           isForwarded: true,
           forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
          //pageCount: 0
           }
           }
           }
           }
           self = false
           let breh =`_SUCESSS_`
           pebz.sendMessage(from, breh, MessageType.text, pebzganskun)
           break
           case 'nulis':
           case 'write':
           try {
           if (args.length < 1) return reply(mess.notxt)
           reply(mess.wait)
           bo = args.join(' ')
           api = await getBuffer(`https://api.zeks.xyz/api/nulis?text=${bo}&apikey=apivinz`)
           await pebz.sendMessage(from, api, image, { quoted:mek,caption:'Done!' })
           } catch(e) { 
              reply(`${e}`)
           }
           break 
		  case 'sticker2':
		  case 's2':
		  var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedSticker)) {
ger = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
owgi = await  pebz.downloadAndSaveMediaMessage(ger)
anu = await imgbb("f0b190d67308d34811fab9c56fe8aba7", owgi)
tekks = `${anu.display_url}`
anu1 = `${tekks}`
sendStickerFromUrl(from, `${anu1}`, mess.success)
} else {
reply('Gunakan foto!')
}
break  
          case 'toimg':
			if (!isQuotedSticker) return reply('ð—¥ð—²ð—½ð—¹ð˜†/ð˜ð—®ð—´ ð˜€ð˜ð—¶ð—°ð—¸ð—²ð—¿ !')
			reply(mess.wait)
			encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
			media = await pebz.downloadAndSaveMediaMessage(encmedia)
			ran = getRandom('.png')
			exec(`ffmpeg -i ${media} ${ran}`, (err) => {
			fs.unlinkSync(media)
			if (err) return reply('Yah gagal, coba ulangi ^_^')
			buffer = fs.readFileSync(ran)
			fakethumb(buffer,'Kek Gini Bukan?')
			fs.unlinkSync(ran)
			})
			break
         case 'take':      
         case 'colong':
         case 'comot':
    		if (!isQuotedSticker) return reply('Stiker aja om')
            encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
		    media = await pebz.downloadAndSaveMediaMessage(encmedia)
            anu = args.join(' ').split('|')
            satu = anu[0] !== '' ? anu[0] : `SELF`
            dua = typeof anu[1] !== 'undefined' ? anu[1] : `BOT`
            require('./lib/fetcherr.js').createExif(satu, dua)
			require('./lib/fetcherr.js').modStick(media, pebz, mek, from)
			break
             case "sticker":
      case "stiker":
      case "sg":
      case "s":
        if (
          ((isMedia && !mek.message.videoMessage) || isQuotedImage) &&
          args.length == 0
        ) {
          const encmedia = isQuotedImage
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await pebz.downloadAndSaveMediaMessage(encmedia);
          ran = "666.webp";
          await ffmpeg(`./${media}`)
            .input(media)
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              reply("error");
            })
            .on("end", function () {
              console.log("Finish");
              pebz.sendMessage(from, fs.readFileSync(ran), sticker, {
                quoted: mek,
              });
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else if (
          ((isMedia && mek.message.videoMessage.seconds < 11) ||
            (isQuotedVideo &&
              mek.message.extendedTextMessage.contextInfo.quotedMessage
                .videoMessage.seconds < 11)) &&
          args.length == 0
        ) {
          const encmedia = isQuotedVideo
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await pebz.downloadAndSaveMediaMessage(encmedia);
          ran = "999.webp";
          reply(mess.wait);
          await ffmpeg(`./${media}`)
            .inputFormat(media.split(".")[1])
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              tipe = media.endsWith(".mp4") ? "video" : "gif";
              reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`);
            })
            .on("end", function () {
              console.log("Finish");
              pebz.sendMessage(from, fs.readFileSync(ran), sticker, {
                quoted: mek,
              });
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else {
          reply(
            `Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`
          );
        }
        break;
        case 'ttaudio': 
      case 'tiktokmusic': 
      case 'tiktokaudio':
             if (args.length == 0) return reply(`Contoh: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
             ini_link = args[0]
             get_audio = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=511fc49c7ad4edcecf8653cf&url=${ini_link}`)
             pebz.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, quoted: mek })
             break
           case 'owner1':
         members_ids = []
         for (let mem of groupMembers) {
         members_ids.push(mem.jid)
         }
         vcard2 = 'BEGIN:VCARD\n'
         + 'VERSION:3.0\n'
         + `FN:ArulGanz\n`
         + `ORG: Creator Bot ;\n`
         + `TEL;type=CELL;type=VOICE;waid=6281229859085:6281229859085\n`
         + 'END:VCARD'.trim()
         pebz.sendMessage(from, {displayName: `Creator Bot`, vcard: vcard2}, contact, 
         { quoted: fkontak, 
         })
         reply('*_Jangan Lupa Follow Instagram_*\nhttps://instagram.com/_daaa_1')
         break
         case 'bc2':
             if (!isOwner && !mek.key.fromMe) return  reply(mess.only.owner)
             if (args.length < 1) return reply('teks?')
             anu100 = await pebz.chats.all()
             if (isMedia && !mek.message.videoMessage || isQuotedImage) {
             const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
             bc100 = await pebz.downloadMediaMessage(encmedia)
             for (let _ of anu100) {
             pebz.sendMessage(_.jid, bc100, image, {caption: `* Assalamualaikum, Kak Izin Broadcast *\n\n${body.slice(4)}`})
}
             reply('Suksess broadcast')
             } else {
             for (let _ of anu100) {
             pebz.sendMessage(_.jid, 
			{"contentText": `* Assalamualaikum, Kak Izin Broadcast *\n\n${body.slice(4)}`,
			"footerText": 'ArulBotz',
			"buttons": [
			{"buttonId": `${prefix}menu`,
			"buttonText": {"displayText": "MENU"
			},"type": "RESPONSE"}
			], "headerType": 'LOCATION',
			locationMessage: { degreesLatitude: '',
			degreesLongitude: '',
			jpegThumbnail: gambar,
			}}, MessageType.buttonsMessage )
}
             reply('Suksess broadcast')
}
             break
          case 'bc':
         if (!isOwner) return reply('LU BUKAN OWNER GBLOK')
         if (args.length < 1) return reply('.......')
         anu = await pebz.chats.all()
         if (isMedia && !mek.message.videoMessage || isQuotedImage) {
         const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
         bc = await pebz.downloadMediaMessage(encmedia)
         for (let _ of anu) {
         pebz.sendMessage(_.jid, bc, image, { caption: `[ ArulBotz izin Broadcast ]\n\n${body.slice(4)}` })
         }
         reply('Suksess broadcast')
         } else {
         for (let _ of anu) {
         sendMess(_.jid, `[ *BOT BROADCAST* ]\n\n${body.slice(4)}`)
         }
         reply('Suksess broadcast')
         }
		break
		case 'hidetag':
		if (!isOwner) return reply(mess.only.ownerB)
    	var value = args.join(' ')
		var group = await pebz.groupMetadata(from)
		var member = group['participants']
		var mem = []
    	member.map(async adm => {
		mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
		})
		var optionshidetag = {
	    text: value,
		contextInfo: { mentionedJid: mem },
		quoted: mek
		}
	    pebz.sendMessage(from, optionshidetag, text, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "393470602054-1351628616@g.us" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption":'ArulGanz',"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": gambar} }  } })
					break
          default: 
          if (isCmd) {
                 reply(`Sorry bro, command *${prefix}${command}* gk ada di list *${prefix}help*`)
                    }
					if (isGroup && budy != undefined) {
				} else {
						console.log(color('[SYSTEM]','yellow'), 'PERINTAH TAK DIKENAL DARI', color(sender.split('@')[0]))
					}
                           }
                           
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
