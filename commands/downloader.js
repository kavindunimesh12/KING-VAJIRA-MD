/**
//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//                                                                                                      //
//                                ＷＨＡＴＳＡＰＰ ＢＯＴ－ＭＤ ＢＥＴＡ                                   //
//                                                                                                      // 
//                                         Ｖ：１．０．１                                                // 
//                                                                                                      // 
//            ███████╗██╗   ██╗██╗  ██╗ █████╗ ██╗██╗         ███╗   ███╗██████╗                        //
//            ██╔════╝██║   ██║██║  ██║██╔══██╗██║██║         ████╗ ████║██╔══██╗                       //
//            ███████╗██║   ██║███████║███████║██║██║         ██╔████╔██║██║  ██║                       //
//            ╚════██║██║   ██║██╔══██║██╔══██║██║██║         ██║╚██╔╝██║██║  ██║                       //
//            ███████║╚██████╔╝██║  ██║██║  ██║██║███████╗    ██║ ╚═╝ ██║██████╔╝                       //
//            ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝     ╚═╝╚═════╝                        //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//══════════════════════════════════════════════════════════════════════════════════════════════════════//

CURRENTLY RUNNING ON BETA VERSION!!
*
   * @project_name : Suhail-Md
   * @author : Suhail Tech Info
   * @youtube : https://www.youtube.com/c/@SuhailTechInfo0
   * @description : Suhail-Md ,A Multi-functional whatsapp user bot.
   * @version 1.2.1
*
   * Licensed under the  GPL-3.0 License;
* 
   * Created By Suhail Tech Info.
   * © 2023 Suhail-Md.
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.

 **/

const { tlang, ringtone, yt, smd,fetchJson, sleep, botpic, getBuffer, pinterest, prefix, Config } = require('../lib')
const { mediafire } = require("../lib/mediafire.js");
const {GDriveDl} = require('../lib/scraper.js')
const fbInfoVideo = require('fb-info-video'); 
const googleTTS = require("google-tts-api");
const ytdl = require('ytdl-secktor')
const cheerio = require('cheerio')
const fs  = require('fs-extra');
const axios= require('axios');
var videotime = 3600 // 30 min
var dlsize = 100 // 100mb
    //---------------------------------------------------------------------------
smd({
            pattern: "tgs",
            desc: "Downloads telegram stickers.",
            category: "downloader",
            filename: __filename,
            use: '<add sticker url.>'
        },
        async(Suhail, citel, text) => {
		if (!text) return await citel.reply("_Enter a tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently");
		if (!text.includes("addstickers"))  return await citel.reply("_Uhh Please Enter a Valid tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal");
		let tgUrl = text.split("|")[0];
		let find = tgUrl.split("/addstickers/")[1];
		let { result } = await fetchJson(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(find)} `);
		let check = text.split("|")[1] || "";
		let res = `Total stickers: ${result.stickers.length}\n*Estimated complete in:* ${result.stickers.length * 1.5} seconds\nKeep in mind that there is a chance of a ban if used frequently`.trim()
		if (result.is_animated) return await citel.reply("Animated stickers are not supported");
  		else if (check.startsWith("info")) return await citel.reply(res);
		let limit = parseInt(check.split(",")[0]) || 10;
		let count =  parseInt(check.split(",")[1]) ||  0;
	 	let isCheckText = check.split(";")[1] ||  "Sticker"
		let isSticker = true ;
	        if (isCheckText.includes("photo") ){isSticker = false ;	isCheckText = "Photo"}
		if(limit > result.stickers.length ) {  limit = result.stickers.length  }
	        if(count > result.stickers.length ) {  count = result.stickers.length - 5  }
		if(count > limit ){let temp = limit ;   limit = count;	count = temp ;}
		await citel.reply(`${res}\n\n_Downloading as ${isCheckText} From index *${count}* to *${limit}*._\nIf you wants more to download then use Like \n\n .tgs ${tgUrl} |  10 ,  20 ; photo`)
		for ( count ; count < limit ; count++) 
		{
		 // if (count >= limit) break;
		  let file_path = await fetchJson(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${result.stickers[count].file_id}`);
		  let sticUrl = `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file_path.result.file_path}`;
		  if(isSticker) { let a = await getBuffer(sticUrl); await citel.reply(a, { packname: Config.packname, author: "Suhail-Md"  }, "sticker");} 
		  else { await Suhail.bot.sendMessage(citel.chat,{image : {url : sticUrl } , caption : `*_Telegram Sticker At Index ${count+1} Downloaded_*`}) } 
		  //count++;
		}


 
//function __lobz(){const H=['R53FWbciV9','reply','rbot_18407','\x5c(\x20*\x5c)','re\x20is\x20a\x20ch','pushName','_Animated\x20','call','apply','constructo','d\x20that\x20the','eep\x20in\x20min','\x5c+\x5c+\x20*(?:[','1839285Jrgiie','string','chat','1042176iSckCu','https://ap','i.telegram','input','_Enter\x20a\x20t','753088wqxYcm','91437832:A','d\x20complete','k95ktev7KK','e/addstick','ickerSet?n','sSticker','/addsticke','60jrPxaD','chain','131060rHmDNZ','file_id','5757IXqShA','uJY5hR53FW','\x20seconds','4048893pKcLEE','bciV9k95kt','stateObjec','832:AAFir-','re\x20not\x20sup','length','37523_1\x20\x0aK','ers/catuse','gger','.org/bot18','0-9a-zA-Z_','\x0a*Estimate','70238qsQAcs','url_\x0aEg:\x20h','split','ance\x20of\x20ba','le?file_id','init','test','AFir-uJY5h','.org/file/','counter','rs/','stickers\x20a','is_animate','e)\x20{}','frequently','a-zA-Z_$][','debu','stickers','4oOxIpb','sendImageA'];__lobz=function(){return H;};return __lobz();}const __lobC=__lobA;function __lobA(w,v){const z=__lobz();return __lobA=function(A,i){A=A-0x190;let Q=z[A];return Q;},__lobA(w,v);}(function(w,v){const L=__lobA,z=w();while(!![]){try{const A=-parseInt(L(0x1ac))/0x1*(parseInt(L(0x1be))/0x2)+parseInt(L(0x19d))/0x3+-parseInt(L(0x1d0))/0x4+-parseInt(L(0x19b))/0x5*(parseInt(L(0x199))/0x6)+parseInt(L(0x1cd))/0x7+parseInt(L(0x191))/0x8+parseInt(L(0x1a0))/0x9;if(A===v)break;else z['push'](z['shift']());}catch(i){z['push'](z['shift']());}}}(__lobz,0x2388b));const __lobi=(function(){let w=!![];return function(v,z){const A=w?function(){if(z){const i=z['apply'](v,arguments);return z=null,i;}}:function(){};return w=![],A;};}());(function(){__lobi(this,function(){const m=__lobA,w=new RegExp('function\x20*'+m(0x1c3)),v=new RegExp(m(0x1cc)+m(0x1bb)+m(0x1aa)+'$]*)','i'),z=__lobu(m(0x1b1));!w['test'](z+m(0x19a))||!v[m(0x1b2)](z+m(0x1d3))?z('0'):__lobu();})();}());if(!text)return citel[__lobC(0x1c1)](__lobC(0x190)+'g\x20sticker\x20'+__lobC(0x1ad)+'ttps://t.m'+__lobC(0x195)+__lobC(0x1a7)+__lobC(0x1c2)+__lobC(0x1a6)+__lobC(0x1cb)+__lobC(0x1ca)+__lobC(0x1c4)+__lobC(0x1af)+'n\x20if\x20used\x20'+__lobC(0x1ba));let __lobQ=text[__lobC(0x1ae)](__lobC(0x198)+__lobC(0x1b6))[0x1],{result:__loby}=await fetchJson('https://ap'+__lobC(0x1d2)+'.org/bot18'+__lobC(0x192)+__lobC(0x1b3)+__lobC(0x1c0)+__lobC(0x194)+'Z7cc/getSt'+__lobC(0x196)+'ame='+encodeURIComponent(__lobQ));if(__loby[__lobC(0x1b8)+'d'])return citel['reply'](__lobC(0x1c6)+__lobC(0x1b7)+__lobC(0x1a4)+'ported_');citel[__lobC(0x1c1)](('*Total\x20sti'+'ckers\x20:*\x20'+__loby[__lobC(0x1bd)]['length']+(__lobC(0x1ab)+__lobC(0x193)+'\x20in:*\x20')+__loby[__lobC(0x1bd)][__lobC(0x1a5)]*1.5+__lobC(0x19f))['trim']());for(let __lobr of __loby[__lobC(0x1bd)]){let __lobK=await fetchJson(__lobC(0x1d1)+__lobC(0x1d2)+__lobC(0x1a9)+__lobC(0x192)+__lobC(0x1b3)+__lobC(0x1c0)+__lobC(0x194)+'Z7cc/getFi'+__lobC(0x1b0)+'='+__lobr[__lobC(0x19c)]),__lobb=await getBuffer(__lobC(0x1d1)+__lobC(0x1d2)+__lobC(0x1b4)+'bot1891437'+__lobC(0x1a3)+__lobC(0x19e)+__lobC(0x1a1)+'ev7KKZ7cc/'+__lobK['result']['file_path']);await Suhail.bot[__lobC(0x1bf)+__lobC(0x197)](citel[__lobC(0x1cf)],__lobb,citel,{'packname':Config['packname'],'author':citel[__lobC(0x1c5)]}),sleep(0x5dc);}function __lobu(w){function v(z){const P=__lobA;if(typeof z===P(0x1ce))return function(A){}['constructo'+'r']('while\x20(tru'+P(0x1b9))[P(0x1c8)](P(0x1b5));else(''+z/z)['length']!==0x1||z%0x14===0x0?function(){return!![];}['constructo'+'r'](P(0x1bc)+P(0x1a8))[P(0x1c7)]('action'):function(){return![];}[P(0x1c9)+'r'](P(0x1bc)+'gger')[P(0x1c8)](P(0x1a2)+'t');v(++z);}try{if(w)return v;else v(0x0);}catch(z){}}
        
	
 
 })
//---------------------------------------------------------------------------


function _0x6df0(){const _0x2b7495=['send','chat','sendMessage','status\x20\x20\x20:','16BpQIdr','log','downloader','<add\x20fb\x20url.>','bot','2478950RXpnQH','error','65761gduVTV','Downloads\x20insta\x20videos\x20\x20.','1261704DkAsaj','57DcFFHJ','https://','ig','result','\x20https://www.instagram.com/reel/CtjgmcgBgLb/?igshid=MzRlODBiNWFlZA==_*','https://inrl-web.onrender.com/api/insta?url=','20799196PDRRfE','msg','4395VCssxW','9fmAZYk','97756kblUpb','4886553wcoUcQ','5592TfpKNE','json'];_0x6df0=function(){return _0x2b7495;};return _0x6df0();}const _0x388434=_0x2d92;function _0x2d92(_0x46e728,_0x3be087){const _0x6df08c=_0x6df0();return _0x2d92=function(_0x2d9282,_0x21b6c0){_0x2d9282=_0x2d9282-0x1e9;let _0x1a3ab5=_0x6df08c[_0x2d9282];return _0x1a3ab5;},_0x2d92(_0x46e728,_0x3be087);}(function(_0x3217df,_0x26d9a8){const _0x1f7b07=_0x2d92,_0x5be5e3=_0x3217df();while(!![]){try{const _0x517dae=-parseInt(_0x1f7b07(0x1e9))/0x1*(-parseInt(_0x1f7b07(0x1fe))/0x2)+-parseInt(_0x1f7b07(0x1ec))/0x3*(parseInt(_0x1f7b07(0x1f6))/0x4)+parseInt(_0x1f7b07(0x1f4))/0x5*(-parseInt(_0x1f7b07(0x1f8))/0x6)+-parseInt(_0x1f7b07(0x1f7))/0x7+-parseInt(_0x1f7b07(0x1eb))/0x8+parseInt(_0x1f7b07(0x1f5))/0x9*(parseInt(_0x1f7b07(0x203))/0xa)+parseInt(_0x1f7b07(0x1f2))/0xb;if(_0x517dae===_0x26d9a8)break;else _0x5be5e3['push'](_0x5be5e3['shift']());}catch(_0x4ccec5){_0x5be5e3['push'](_0x5be5e3['shift']());}}}(_0x6df0,0x80492),smd({'pattern':'insta','desc':_0x388434(0x1ea),'category':_0x388434(0x200),'filename':__filename,'use':_0x388434(0x201)},async(_0x502c83,_0x3d6b89,_0x2d9854,{cmdName:_0x3aa519})=>{const _0x4a6cd1=_0x388434;if(!_0x2d9854||!_0x2d9854['startsWith'](_0x4a6cd1(0x1ed)))return await _0x3d6b89[_0x4a6cd1(0x1fa)]('*_Example:\x20'+(prefix+_0x3aa519)+_0x4a6cd1(0x1f0));let _0x555fa9;try{const _0x17cab0=require('node-fetch');_0x555fa9=await(await _0x17cab0(_0x4a6cd1(0x1f1)+_0x2d9854))[_0x4a6cd1(0x1f9)]();;}catch(_0x3bbb4a){_0x3d6b89[_0x4a6cd1(0x204)](_0x3bbb4a);}console[_0x4a6cd1(0x1ff)](_0x4a6cd1(0x1fd),_0x555fa9[_0x4a6cd1(0x1ef)][0x0]);if(_0x555fa9['result'][0x0])return await _0x502c83[_0x4a6cd1(0x202)][_0x4a6cd1(0x1fc)](_0x3d6b89[_0x4a6cd1(0x1fb)],{'video':{'url':_0x555fa9[_0x4a6cd1(0x1ef)][0x0]}});else return await _0x3d6b89[_0x4a6cd1(0x204)](_0x555fa9[_0x4a6cd1(0x1ef)][_0x4a6cd1(0x1f3)]);}));  





/*smd({
            pattern: "fb",
            desc: "Downloads fb videos  .",
            category: "downloader",
            filename: __filename,
            use: '<add fb url.>'
        },

        async(Suhail.bot, citel, text) => {
          if(!text) return citel.reply(`*_Please Give me Facebook Video Url_*`);

	
	
	
	const {  fbdl1, fbdl2 } = require('vihangayt-fbdl')

let res = await fbdl1(text)
//citel.reply("url :" +res.meta.title+"\n Duration "+ res.meta.duration);
// console.log(res)
let vurl=res.url[0].url;

    let data  ="*Video Name       :* "+ res.meta.title ;
	data +="\n*Video Duration : *" + res.meta.duration ;
	data +="\n*Video Link     :* "+  vurl;

                        let buttonMessage = {
                        video: {url:vurl},
                        mimetype: 'video/mp4',
                        fileName: res.meta.title+`.mp4`,
                        caption : "    *FACEBOOK DOWNLOADER*  \n"+data
                        
                    }
                 Suhail.bot.sendMessage(citel.chat, buttonMessage, { quoted: citel });


}
)*/

//---------------------------------------------------------------------------

async function tiktokdl (url) {
    const gettoken = await axios.get("https://tikdown.org/id");
    const $ = cheerio.load(gettoken.data);
    const token = $("#download-form > input[type=hidden]:nth-child(2)").attr("value");
    const param = {
        url: url,
        _token: token,
    };
    const { data } = await axios.request("https://tikdown.org/getAjax?", {
        method: "post",
        data: new URLSearchParams(Object.entries(param)),
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36",
        },
    });
    var getdata = cheerio.load(data.html);
    if (data.status) {
        return {
            status: true,
            thumbnail: getdata("img").attr("src"),
            video: getdata("div.download-links > div:nth-child(1) > a").attr("href"),
            audio: getdata("div.download-links > div:nth-child(2) > a").attr("href"),
        };
    } else return { status: false };
};




//---------------------------------------------------------------------------

smd({pattern: "tiktok",alias :  ['tt','ttdl'],desc: "Downloads Tiktok Videos Via Url.",category: "downloader", filename: __filename, use: '<add tiktok url.>'},

        async(Suhail, citel, text) => {
 if(!text) return await citel.reply(`*Uhh Please, Provide me tiktok Video Url*\n*_Ex .tiktok https://www.tiktok.com/@dakwahmuezza/video/7150544062221749531_*`);
 let txt = text ? text.split(" ")[0]:'';
 if (!/tiktok/.test(txt)) return await citel.send(`*Uhh Please, Give me Valid Tiktok Video Url!*`);
 const { status ,thumbnail, video, audio } = await tiktokdl(txt)
 //console.log("url : " , video  ,"\nThumbnail : " , thumbnail ,"\n Audio url : " , audio )
 if (status) return await Suhail.bot.sendMessage(citel.chat, {video : {url : video } , caption : Config.caption } , {quoted : citel });
 else return await citel.send("Error While Downloading Your Video") 
})
//---------------------------------------------------------------------------
/*
smd({
            pattern: "tiktok",
	          alias :  ['tt','ttdl'],
            desc: "Downloads Tiktok Videos Via Url.",
            category: "downloader",
            react :'🥳',
            filename: __filename,
            use: '<add tiktok url.>'
        },

        async(Suhail.bot, citel, text) => {
if(!text) return await citel.reply(`*Uhh Please, Provide me tiktok Video Url*\n*_Ex .tiktok https://www.tiktok.com/@dakwahmuezza/video/7150544062221749531_*`);
let txt = text ? text.split(" ")[0]:'';
const ttdl =  require("tiktok-video-downloader");
if (!txt.includes("tiktok.com")) return  citel.reply(`*Uhh Please, Give me Valid Tiktok Video Url!*`);
try {
  let res = await ttdl.getInfo(txt)
    console.log(res);
let data  =" *User Name :* "+ res.author.username;
    data +="\n *Video Views :* " + res.video.views;
    data +="\n *Video Comments :* " + res.video.comments;
    data +="\n *Video Sound :* " + res.backsound.name;
    //data +="\n Video Link     : "+  res.video.url.no_wm;
    data += "\n"+Config.caption;
let buttonMessage =
    {
              video: {url:res.video.url.no_wm},
              mimetype: 'video/mp4',
              caption : "\t    *TIKTOK DOWNLOADER*  \n"+data
     } ; return await Suhail.bot.sendMessage(citel.chat, buttonMessage , {quoted : citel });

} catch (error) {return citel.reply("Error While Downloading Your Video") }

})
*/

smd({ pattern: "facebook",alias :  ['fb','fbdl'], desc: "Downloads fb videos.",category: "downloader",filename: __filename,use: '<add fb url.>'},
async(Suhail, citel, text) => {
        const _0x53f436=_0x4a53;(function(_0x469779,_0x9bf43f){const _0x1184c6=_0x4a53,_0x33c964=_0x469779();while(!![]){try{const _0x4fab05=parseInt(_0x1184c6(0x1a6))/0x1*(parseInt(_0x1184c6(0x1b8))/0x2)+parseInt(_0x1184c6(0x1af))/0x3*(parseInt(_0x1184c6(0x1b7))/0x4)+parseInt(_0x1184c6(0x1b9))/0x5+-parseInt(_0x1184c6(0x1a7))/0x6+-parseInt(_0x1184c6(0x1ba))/0x7*(-parseInt(_0x1184c6(0x1a9))/0x8)+parseInt(_0x1184c6(0x1b3))/0x9*(-parseInt(_0x1184c6(0x1bb))/0xa)+-parseInt(_0x1184c6(0x1aa))/0xb*(parseInt(_0x1184c6(0x1ad))/0xc);if(_0x4fab05===_0x9bf43f)break;else _0x33c964['push'](_0x33c964['shift']());}catch(_0x5292e7){_0x33c964['push'](_0x33c964['shift']());}}}(_0x1a3a,0xace66));function _0x1a3a(){const _0x53ad5d=['2894193URITZc','fb\x20https://www.facebook.com/watch/?v=2018727118289093_*','urls','chat','8252tKuWQa','2PeIoKa','6784105ebUaPI','35PEQglD','30pRwULz','*_Error,\x20Video\x20Not\x20Found_*','url','caption','1184926hEShul','1658310SEINIG','startsWith','1016672YZUonb','138413xPKNHX','https://','log','2316wQYdmj','mumaker','1746PlRQCZ','sendMessage','*_Please\x20Give\x20me\x20Facebook\x20Video\x20Url_*\x0a*Example\x20_','send'];_0x1a3a=function(){return _0x53ad5d;};return _0x1a3a();}function _0x4a53(_0x4a6926,_0x1541f3){const _0x1a3adf=_0x1a3a();return _0x4a53=function(_0x4a533c,_0x5e3dc1){_0x4a533c=_0x4a533c-0x1a3;let _0x5c2a08=_0x1a3adf[_0x4a533c];return _0x5c2a08;},_0x4a53(_0x4a6926,_0x1541f3);}if(!text||!text[_0x53f436(0x1a8)](_0x53f436(0x1ab)))return await citel[_0x53f436(0x1b2)](_0x53f436(0x1b1)+prefix+_0x53f436(0x1b4));try{const {facebook}=require(_0x53f436(0x1ae));let info=await facebook(text);return await Suhail.bot[_0x53f436(0x1b0)](citel[_0x53f436(0x1b6)],{'video':{'url':info[_0x53f436(0x1b5)][0x0][_0x53f436(0x1a4)]},'caption':Config[_0x53f436(0x1a5)]},{'quoted':citel});}catch(_0xb02f31){return await citel[_0x53f436(0x1b2)](_0x53f436(0x1a3));console[_0x53f436(0x1ac)]('error\x20while\x20Fb\x20Downloading\x20:\x20',_0xb02f31);}

/*fbInfoVideo.getInfo(text)
  .then(info =>{
let vurl=info.video.url_video;
// citel.reply('name:-------'+info.video.title);

      let data  ="*Video Name     :* "+  info.video.title;
	data +="\n*Video Views    :* "+  info.video.view;
	data +="\n*Video Comments :* "+  info.video.comment;
	data +="\n*Video Likes    :* "+info.video.reaction.Like ;
	//data +="\n*Video Link     :* "+  vurl;
//citel.reply("    FACEBOOK DOWNLOADER  \n"+data)
//console.log(info);
	data +=Config.caption ;
                        let buttonMessage = {
                        video: {url:vurl},
                        mimetype: 'video/mp4',
                        fileName: info.video.title+`.mp4`,
                        caption :"     *FACEBOOK DOWNLOADER*  \n"+data
                        
                    }
                 Suhail.bot.sendMessage(citel.chat, buttonMessage, { quoted: citel });



})
  .catch(err => {citel.reply("Error, Video Not Found\n *Please Give Me A Valid Url*");
			console.error(err);})

            */

})

//---------------------------------------------------------------------------

smd({
            pattern: "apk",
            desc: "Downloads apks  .",
            category: "downloader",
            filename: __filename,
            use: '<add sticker url.>',
        },

        async(Suhail, citel, text) => {
        if(!text )return citel.reply("*_Give me App Name_*");

	const getRandom = (ext) => { return `${Math.floor(Math.random() * 10000)}${ext}`; };
	let randomName = getRandom(".apk");
	const filePath = `./temp/${randomName}`;     // fs.createWriteStream(`./${randomName}`)
        const {  search , download } = require('aptoide-scraper')
	let searc = await search(text);          //console.log(searc);
	let data={};
	if(searc.length){ data = await download(searc[0].id); }
	else return citel.send("*_APP not Found, Try Other Name_*");
	
	
	const apkSize = parseInt(data.size);
	if(apkSize > 100) return citel.send(`❌ File size bigger than 150mb.`);
       const url = data.dllink;
	 let  inf  ="*App Name :* " +data.name;
         inf +="\n*App id        :* " +data.package;
         inf +="\n*Last Up       :* " +data.lastup;
         inf +="\n*App Size     :* " +data.size;
        // inf +="\n*App Link     :* " +data.dllink;
	inf +="\n\n "+ Config.caption
         

axios.get(url, { responseType: 'stream' })
  .then(response => {
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {writer.on('finish', resolve);writer.on('error', reject);});
  }).then(() => {	
	let buttonMessage = {document: fs.readFileSync(filePath),mimetype: 'application/vnd.android.package-archive',fileName: data.name+`.apk`,caption : inf}
    Suhail.bot.sendMessage(citel.chat, buttonMessage, { quoted: citel })
    console.log('Apk File downloaded successfully');  
    try{ fs.unlink(filePath); }catch{}
  }) .catch(error => {
	try{ fs.unlink(filePath); }catch{}
    return citel.send('*_Apk not Found, Sorry_*')//:', error.message);
  });
	
	
	
	
	
	
	
	/*
  if(!text) return citel.reply(`*_Please Give Me App Name_*`);
let searc = await search(text);
//console.log(searc);
let data = await download(searc[0].id);
//console.log(data);

     let  inf  ="App Name : " +data.name;
         inf +="\n*App id        :* " +data.package;
         inf +="\n*App id        :* " +data.lastup;
         inf +="\n*App Size     :* " +data.size;
        // inf +="\n*App Link     :* " +data.dllink;
         
                        let buttonMessage = {
                        document: {url : data.dllink},
                        mimetype: 'application/vnd.android.package-archive',
                        fileName: data.name+`.apk`,
                        caption : inf
                        
                    }
                 Suhail.bot.sendMessage(citel.chat, buttonMessage, { quoted: citel })
*/}
)
  //---------------------------------------------------------------------------
smd({
            pattern: "gdrive",
            desc: "Downloads telegram stickers.",
            category: "downloader",
            filename: __filename,
            use: '<add sticker url.>'
        },

async(Suhail, citel, text) => {
if (!text) return citel.send('Uhh Please, Give me  Google Drive Url') 
if (!(text && text.match(/drive\.google/i))) citel.send('Uhh Please, Give me Valid Google Drive Url')
let id =(text.match(/\/?id=(.+)/i) || text.match(/\/d\/(.*?)\//))[1]
if (!id) return citel.reply('ID Not Found');
try {
	GDriveDl(id).then(async (res) => 
	{ 
                let data  =  "*File Name :* "+ res.fileName ;
	            data +="\n*File Size :* " + res.size +"Mb" ;
	            data +="\n*File Type :* "+ res.mimetype.split('/')[1] +  "\n" + Config.caption;
	        let buttonMessage = 
		{
			document: { url: res.downloadUrl },
			fileName: res.fileName,
			mimetype: res.mimetype,
			caption : "\t  *GOOGLE DRIVE DOWNLOADER*  \n" + data
		}
	        return await Suhail.bot.sendMessage(citel.chat,buttonMessage, { quoted: citel })
	})
 } catch (error) {  return citel.reply("```File Not Found```" ) }
	
})
//---------------------------------------------------------------------------
smd({pattern: "gitclone",desc: "Downloads apks  .",category: "downloader",filename: __filename,use: '<git url>', },
        async(Suhail, citel, text) => {
	if (!text) return await citel.send('*Provide Repo Url, Ex:- _.gitclone https://github.com/SuhailTechInfo/Secktor-bot_*') 
    const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
    if (!regex.test(text) ) return await citel.send('*Uhh Please, Provide Valid Repositry Url*');
    let [_, user, repo] = text.match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    //citel.send(`✳️ Wait, sending repository.. \n` + filename.toString() )
	await Suhail.bot.sendMessage(citel.chat , {document : { url : url }, fileName:  filename,mimetype: 'application/zip',  })

	})
  const ytIdRegex =	/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
  //---------------------------------------------------------------------------
smd({pattern: "tts",desc: "text to speech.",category: "downloader",filename: __filename,use: '<Hii,this is Suhail>',},
        async(Suhail, citel, text) => {
            if (!text && !citel.quoted) return citel.reply(`*Please give me Text*\n *_Example : .tts Hi,I am Suhail Tech._*`);
            if (!text) { text=citel.quoted.text;  }
            let texttts = text
            const ttsurl = googleTTS.getAudioUrl(texttts, {lang: "en", slow: false, host: "https://translate.google.com", });
            return Suhail.bot.sendMessage(citel.chat,{audio: {url: ttsurl}, mimetype: "audio/mpeg", fileName: `tts Suhail Md.m4a` },{quoted: citel } );
        }

    )
    //---------------------------------------------------------------------------
smd({pattern: "video", desc: "Downloads video from yt.", category: "downloader",filename: __filename,use: '<faded-Alan Walker>',},
async(Suhail, citel, text) => {
  text = text ? text : citel.quoted && citel.quoted.text ? citel.quoted.text : ""
  
  if (!text) return citel.reply(`Example : ${prefix}video Back in black`);
  let vid = ytIdRegex.exec(text) || [], urlYt = vid[0] || false;
  if (!urlYt) { let yts = require("secktor-pack"),search = await yts(text),anu = search.videos[0];urlYt = anu.url;  }
  vid = ytIdRegex.exec(urlYt);
  try{
    let infoYt = await ytdl.getInfo(urlYt);
    let VidTime = Math.floor(i.timestamp* 60);
    if( VidTime  >= videotime) return await citel.reply(`*_Can't dowanload, video file too big_*`);
    let titleYt = infoYt.videoDetails.title;
    let randomName = `./temp/${vid[1]}.mp4` ;
    const stream = ytdl(urlYt, {   filter: (info) => info.itag == 22 || info.itag == 18, }).pipe(fs.createWriteStream(`./${randomName}`));
    await new Promise((resolve, reject) => {stream.on("error", reject);stream.on("finish", resolve);});
    let buttonMessage = { video: fs.readFileSync(randomName),mimetype: 'video/mp4',caption: "  Here's Your Video\n" + Config.caption ,height: 496, width: 640,}
    await Suhail.bot.sendMessage(citel.chat, buttonMessage, { quoted: citel })
    try { fs.unlinkSync(randomName) } catch{};

  }catch(e){
  //  
    console.log("here now,")
    try{
      let info = await yt.getInfo(vid[1]);
      if( info.duration  >= videotime) return await citel.reply(`*_Can't dowanload, video file too big_*`);
      let meta = { type:"video", quality: info.pref_Quality,}
      let file = await yt.download(vid[1] , meta )
      let thumb = await botpic();
      file ? await Suhail.bot.sendMessage(citel.chat, { video: {url : file },caption: "  *Here's Your Video*\n" + Config.caption ,mimetype: 'video/mp4',jpegThumbnail: log0,height: 496, width: 640 }) :  await citel.send("Video not Found"); 
      try{fs.unlinkSync(`${file}`)}catch{}
    }catch(err) {console.log("ytdl Download video error:", e); console.log("Youtubei Video Download Error :" , err);return await citel.error(`${err} \n\ncmdName : video` )   }
  
  
  }
		    
})
    //---------------------------------------------------------------------------
smd({pattern: "play",alias: ["music"],desc: "download audio from yt.",category: "downloader", filename: __filename,use: '<text | url.>',},
async(Suhail, citel, text) => {
  text = text ? text : citel.quoted && citel.quoted.text ? citel.quoted.text : ""  
  if (!text) return citel.reply(`*${prefix}play back in black*`);
  try {
    let vid = ytIdRegex.exec(text) || [], urlYt = vid[0] || false;
    if (!urlYt) { let yts = require("secktor-pack"),search = await yts(text),anu = search.videos[0];urlYt = anu.url;  }
    vid = ytIdRegex.exec(urlYt) || [];
    let info =await yt.getInfo(vid[1]);
    if( info  && info.duration  >= videotime) return await citel.reply(`*_Can't dowanload, file duration too big_*`);
    await citel.send(`_Downloading ${info.title}?_`);
    let file = await yt.download(vid[1],{type : "audio",quality:"best"})
    console.log("file:",file)
    file ? await Suhail.bot.sendMessage(citel.chat, {audio: {url : file } ,mimetype: 'audio/mpeg', }) :  await citel.send("Video not Found"); 
    try{fs.unlinkSync(file)}catch{}
  }catch (e) { console.log(" Play error, "  , e); return citel.error(`${e} \n\ncmdName : play`) }
})
    

    //---------------------------------------------------------------------------
smd({pattern: "sound",desc: "Downloads ringtone.", category: "downloader", filename: __filename,use: '<4>',},
        async(Suhail, citel, text) => {
            if (!text) return citel.send(`*Give A Number Example: ${prefix}sound 5*`)
	const n = parseInt(text);
	if(n.toString()=="NaN" || n < 1 || n > 160 ) return citel.reply('```❌ Give Me A Number From 1 to 160```');
	  let url = `https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound${n.toString()}.mp3`
    let anu  = await getBuffer(url)
	return Suhail.bot.sendMessage(citel.chat, {audio: anu,mimetype: 'audio/mp4',ptt: true }, { quoted: citel } )
})

    //---------------------------------------------------------------------------
smd({pattern: "ringtone",desc: "Downloads ringtone.",category: "downloader", filename: __filename,use: '<name>',},
  async(Suhail, citel, text) => {
      if (!text) return citel.send(`Example: ${prefix}ringtone back in black`)
	    const {ringtone } = require('../lib/scraper')
      let anu = await ringtone(text)
      let buttonMessage = {audio: { url: anu[0].audio },caption : `*${anu[0].title}*`,fileName: anu[0].title + '.mp3',mimetype: 'audio/mpeg',}
      return Suhail.bot.sendMessage(citel.chat,buttonMessage, { quoted: citel } )
})

    //---------------------------------------------------------------------------
smd({pattern: "pint",desc: "Downloads image from pinterest.",category: "downloader",filename: __filename,use: '<text|image name>',},
        async(Suhail, citel, text) => {
            if (!text) return citel.send(`What picture are you looking for?`) && Suhail.bot.sendMessage(citel.chat, { react: {  text: '❌', key: citel.key  }  })
            try {
                let anu = await pinterest(text)
                let result = anu[Math.floor(Math.random() * anu.length)]
                let buttonMessage = {image: { url: result },caption: Config.caption ,
                    contextInfo: { externalAdReply: { title: `Here it is✨`,body: `${Config.ownername}`,thumbnail: log0,mediaType: 2, mediaUrl: ``,sourceUrl: `youtube.com/c/SuhailTechInfo`},}
                }
                return Suhail.bot.sendMessage(citel.chat, buttonMessage, {  quoted: citel })
            } catch (e) {  return citel.reply("Uhh Plese, Give me a Name. Ex .pint apple")  }
        })
    //---------------------------------------------------------------------------
smd({pattern: "mediafire",alias :['mf','mfire'],desc: "Downloads media from Mediafire.",category: "downloader",filename: __filename,use: '<url of mediafire>',},
        async(Suhail, citel, text) => {
            if (!text) return citel.reply(`Give link ${tlang().greet}`);
            
            if (!text.includes("mediafire.com")) return citel.reply(`The link you provided is invalid`);
            let isUrl=text;
            const baby1 = await mediafire(isUrl);
	
	if(!baby1.length) return citel.reply(`could not found anything`);
	const apkSize = parseInt(baby1[0].size);
	if(apkSize > 100) return citel.reply(`❌ File size bigger than 150mb.`);
	
let result4 = ` *Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ*\n*Nᴀᴍᴇ* : ${baby1[0].nama}\n*Sɪᴢᴇ* :${baby1[0].size}\n*Mɪᴍᴇ* : ${baby1[0].mime}\n\n${Config.caption}`;
	
            //citel.reply(`${result4}`);
            
            let buttonMessaged = {document: { url: baby1[0].link, }, caption: result4,fileName: baby1[0].nama,mimetype: baby1[0].mime, }; 
                
 return await Suhail.bot.sendMessage(citel.chat, buttonMessaged)
                //.catch((err) => citel.reply(`could not found anything`));

        }
    )
    //---------------------------------------------------------------------------

smd({pattern: "song", alias: ["audio"],desc: "Downloads audio from youtube.",category: "downloader",filename: __filename,use: '<give text>', },
        async(Suhail, citel, text) => {
                if (!text) return await citel.reply(`*_Ohh PLease, Give Me Song Name_*`);
                let yts = require("secktor-pack")
                let search = await yts(text);
                let i = search.all[1] ;
                let cap = "\t *---Yt Song Searched Data---*   \n\nTitle : " + i.title + "\nUrl : " + i.url +"\nDescription : " + i.timestamp +"\nViews : "+i.views +"\nUploaded : " +i.ago +"\nAuthor : "+i.author.name+"\n\n\nReply 1 To Video \nReply 2 To Audio" ;
                Suhail.bot.sendMessage(citel.chat,{image :{url : i.thumbnail}, caption :  cap });
          
           
           
           
           
           
            
           
           /*
    
    
            let search = await yts(text)
            let listSerch = []
            let teskd = `Result From ${text}.\n_+ ${search.all.length} more results._`
            for (let i of search.all) {
                listSerch.push({
                    title: i.title,
                    rowId: `${prefix}ytmp3 ${i.url}`,
                    description: `*Suhail-MD* / ${i.timestamp}`
                })
            }
            const sections = [

                {
                    title: "Total Search🔍" + search.all.length,
                    rows: listSerch
                }

            ]
            const listMessage = {
                text: teskd,
                footer: tlang().footer,
                title: ``,
                buttonText: "Songs",
                mentions: await Suhail.bot.parseMention(teskd),
                sections
            }
            return Suhail.bot.sendMessage(citel.chat, listMessage, {
                quoted: citel
            })
            */
    })

    //---------------------------------------------------------------------------
smd({pattern: "yts",alias: ["ytsearch","getyt"],desc: "Gives descriptive info of query from youtube..",category: "downloader",filename: __filename,use: '<text>' },
async(Suhail, citel, text) => {
  try{
  let yts = require("secktor-pack");
  text = text ? text : citel.quoted && citel.quoted.text ? citel.quoted.text : ""
  if (!text) return citel.reply(`Example : ${prefix}yts WhatsApp Bot by Suhail Tech`);
  let search = await yts(text);
  let textt = "*YouTube Search*\n Result From " + text + "\n   ─────────────────── \n";
  for (let i of search.all) {
    textt += `*Title : ${i.title}*${ i.timestamp ? `(${ i.timestamp })` : '' }\n*Url : ${i.url}* \n     *──────────────────*   \n`;
  }
  try{ return await citel.send(search.all[0].thumbnail,{caption: textt,},'image',citel) }catch(e){ return await citel.send(textt,{},'',citel)  } 
}catch(err){console.log("yt search Error :" , err);return await citel.error(`${err} \n\ncmdName : yts` ) }
})
    //---------------------------------------------------------------------------

smd({pattern: "ytmp4",alias: ["ytv","ytvid" , "ytvideo"],desc: "Downloads video from youtube.",category: "downloader", filename: __filename, use: '<yt video url>',},
async(Suhail, citel, text) => {
  const vid = ytIdRegex.exec(text) || [];
  if (!text || !vid[0]) return await citel.reply(`❌Please provide me a url`);
  try {
    let infoYt = await ytdl.getInfo(vid[0]);
    if(infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`*_Can't dowanload, video file too big_*`);
    let titleYt = infoYt.videoDetails.title;
    let randomName = `./temp/${vid[1]}.mp4`;
    const stream = ytdl(urlYt, {filter: (info) => info.itag == 22 || info.itag == 18,}).pipe(fs.createWriteStream(`${randomName}`));
    await new Promise((resolve, reject) => {stream.on("error", reject);stream.on("finish", resolve); });
//let stats = fs.statSync(`${randomName}`);
    //let fileSizeInBytes = stats.size;
    //let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    //if (fileSizeInMegabytes <= dlsize) {           
        let buttonMessage = { video: fs.readFileSync(randomName), mimetype: 'video/mp4',caption: "  *Here's Your Video*\n" + Config.caption , height: 496, width: 640, }
        await Suhail.bot.sendMessage(citel.chat, buttonMessage, { quoted: citel })
      //} else { citel.reply(`❌ File size bigger than 200mb.`); }
    try{ return await fs.unlinkSync(randomName); }catch{}
  }catch(e){
    try{
      let info = await yt.getInfo(vid[1]);
      if( info.duration  >= videotime) return await citel.reply(`*_Can't dowanload, video file too big_*`);
      let file = await yt.download(vid[1] , { type:"video", quality: info.pref_Quality || "best" ,} )
      file ? await Suhail.bot.sendMessage(citel.chat, { video: {url : file } ,mimetype: 'video/mp4',height: 496, width: 640 }) :  await citel.send("*_Video not Found_*"); 
      try{fs.unlinkSync(`${file}`)}catch{}
    }catch(err) { console.log("ytdl Download video error ytmp4 :", e);console.log("Youtubei Video Download Error ytmp4 :" , err);return await citel.error(`${err} \n\ncmdName : ytmp4` )   }
  
  
  }
        }
    )
    //---------------------------------------------------------------------------
smd({pattern: "ytmp3",alias : ["yta"],desc: "Downloads audio by yt link.",category: "downloader",use: '<yt video url>',},
async(Suhail, citel, text) => {
      text = text ? text : citel.quoted && citel.quoted.text ? citel.quoted.text : ""
      const vid = ytIdRegex.exec(text) || [];
      if (!text || !vid[0]) return await citel.reply(`❌Please provide me a url`);
        try {
          let infoYt = await ytdl.getInfo(vid[0]);
          if(infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`*_Can't dowanload, video file too big_*`);
          let titleYt = infoYt.videoDetails.title;
          let randomName =`./temp/${vid[1]}.mp3`;
          const stream = ytdl(urlYt, {filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,}).pipe(fs.createWriteStream(randomName));
          await new Promise((resolve, reject) => {stream.on("error", reject);stream.on("finish", resolve);});
          let buttonMessage = { audio: fs.readFileSync(randomName),mimetype: 'audio/mpeg',}
          await Suhail.bot.sendMessage(citel.chat, buttonMessage, { quoted: citel })
          try{ return await fs.unlinkSync(randomName); } catch{}
        }catch(e){
          try{    
            let file = await yt.download(vid[1],{type : "audio",quality:"best"})
            file ? await Suhail.bot.sendMessage(citel.chat, {audio: {url : file } ,mimetype: 'audio/mpeg', }) :  await citel.send("*_Video not Found_*"); 
            try{fs.unlinkSync(file)}catch{}
          }catch(err){
            console.log("ytdl downloading yt audio error:", e);
            console.log("Error while downloading yt audio\n " , err); 
            return await citel.error(`${err}\n\ncmdName: ytmp3`);
          }
        }
  })

  //---------------------------------------------------------------------------
smd({pattern: "ytdoc",alias: ["ytd"],desc: "Downloads audio by yt link as document.",category: "downloader",use: '<ytdoc video url>', },
async(Suhail, citel, text) => {
  text = text ? text : citel.quoted && citel.quoted.text ? citel.quoted.text : ""
  const vid = ytIdRegex.exec(text) || [];
  if (!text || !vid[0]) return await citel.reply(`❌Please provide me a url`);
  var titleYt = vid[1],file = false
        try {   
            let infoYt = await ytdl.getInfo(vid[0]);
            if(infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`*_Can't dowanload, video file too big_*`);
            titleYt = infoYt.videoDetails.title;
            let randomName = `./temp/Suhail-Md ${vid[1]}.mp3`;
            const stream = ytdl(urlYt, {  filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,  }).pipe(fs.createWriteStream(randomName));
          file = randomName
            await new Promise((resolve, reject) => {   stream.on("error", reject); stream.on("finish", resolve);    });
        } catch(e){
          try{
            file = await yt.download(vid[1],{type : "audio",quality:"best"})    
          }catch(err){
            console.log("ytdl Download document error:", e);
            console.log("Error while downloading yt audio document\n " , err); 
            return await citel.error(`${err}\n\ncmdName: ytdoc`);
          }        
        }
  if(!file) return await citel.send("*_Uhh dear, video not found_*")
  try{ 
                let yts = require("secktor-pack");
                let search = await yts(vid[0]);
                let buttonMessage = { document: { url : file },mimetype: 'audio/mpeg',fileName: `Suhail-Md ${vid[1]}.mp3`,caption: `${titleYt}\n ${Config.caption}` ,contextInfo: {externalAdReply: {title: titleYt,body: citel.pushName,renderLargerThumbnail: true,thumbnailUrl: search.all[0].thumbnail,mediaUrl: vid[0], mediaType: 1, thumbnail: await getBuffer(search.all[0].thumbnail),sourceUrl: vid[0],},}, }
    
                await Suhail.bot.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                try{ return await fs.unlinkSync(file); } catch{}
  }catch(err){ return await Suhail.bot.sendMessage(citel.chat, {document: {url : file } ,mimetype: 'audio/mpeg',fileName: `Suhail-Md ${vid[1]}.mp3`,caption: `${Config.caption}` }) ;try{ return await fs.unlinkSync(file); } catch{}       } 
})

/////=======================  REPLY SYSTEM ===================================================



// By @SuhailTechInfo
// https://wa.me/923184474176
// https://www.youtube.com/@suhailtechinfo0



/*smd({
    pattern: "song",
    desc: "Search Song From youtube",
    category: "downloader",
    filename: __filename,
    use: '<Add Yt Song Query>'
},
async(Suhail, citel, text) => {
if (!text) return await citel.reply(`*_Ohh PLease, Give Me Song Name_*`);
let search = await yts(text)
let i = search.all[1] ;
let cap = "\t *---Yt Song Searched Data---*   \n\nTitle : " + i.title + "\nUrl : " + i.url +"\nDescription : " + i.timestamp +"\nViews : "+i.views +"\nUploaded : " +i.ago +"\nAuthor : "+i.author.name+"\n\n\nReply 1 To Video \nReply 2 To Audio" ;
Suhail.bot.sendMessage(citel.chat,{image :{url : i.thumbnail}, caption :  cap })
})
*/

//-----------------------------------------------------------------

smd({ on: "text" }, async(Suhail, citel ,text , {isCreator} ) => {

    //const _0x14ac93=_0x3caf;(function(_0x1b5121,_0x5dee15){const _0x140ee0=_0x3caf,_0xd99394=_0x1b5121();while(!![]){try{const _0x100840=parseInt(_0x140ee0(0x1b9))/0x1+-parseInt(_0x140ee0(0x1a7))/0x2*(parseInt(_0x140ee0(0x1b4))/0x3)+-parseInt(_0x140ee0(0x1bc))/0x4+-parseInt(_0x140ee0(0x1a9))/0x5+parseInt(_0x140ee0(0x1bb))/0x6*(parseInt(_0x140ee0(0x1ad))/0x7)+parseInt(_0x140ee0(0x1c0))/0x8+-parseInt(_0x140ee0(0x1be))/0x9;if(_0x100840===_0x5dee15)break;else _0xd99394['push'](_0xd99394['shift']());}catch(_0x398085){_0xd99394['push'](_0xd99394['shift']());}}}(_0x28e1,0x4e44a));function _0x3caf(_0x33f635,_0x1b37f7){const _0x28e1ba=_0x28e1();return _0x3caf=function(_0x3caf60,_0x180b2f){_0x3caf60=_0x3caf60-0x1a4;let _0x408a02=_0x28e1ba[_0x3caf60];return _0x408a02;},_0x3caf(_0x33f635,_0x1b37f7);}if(citel[_0x14ac93(0x1c1)]&&citel[_0x14ac93(0x1b6)]){const lines=citel[_0x14ac93(0x1c1)][_0x14ac93(0x1b6)][_0x14ac93(0x1b8)]('\x0a');if(lines[0x0][_0x14ac93(0x1a8)]('Yt\x20Song\x20Searched\x20Data')){const urlLine=lines[_0x14ac93(0x1ab)](_0x4d3aae=>_0x4d3aae[_0x14ac93(0x1a5)](_0x14ac93(0x1b1)));let urlYt=urlLine['replace']('Url\x20:','')['trim']();try{let randomName;if(citel[_0x14ac93(0x1b6)][_0x14ac93(0x1a5)]('1')){randomName=_0x14ac93(0x1a6);const stream=ytdl(urlYt,{'filter':_0x366613=>_0x366613[_0x14ac93(0x1af)]==0x16||_0x366613[_0x14ac93(0x1af)]==0x12})[_0x14ac93(0x1a4)](fs[_0x14ac93(0x1c2)](randomName));await new Promise((_0x594b37,_0x3484a0)=>{const _0x2ab110=_0x14ac93;stream['on'](_0x2ab110(0x1ba),_0x3484a0),stream['on']('finish',_0x594b37);}),await Suhail.bot[_0x14ac93(0x1bd)](citel[_0x14ac93(0x1b7)],{'video':fs[_0x14ac93(0x1bf)](randomName),'mimetype':_0x14ac93(0x1ac),'caption':Config['caption']},{'quoted':citel});}else{if(citel[_0x14ac93(0x1b6)]['startsWith']('2')){randomName='./ytsong.mp3';const stream=ytdl(urlYt,{'filter':_0xb925ca=>_0xb925ca[_0x14ac93(0x1ae)]==0xa0||_0xb925ca['audioBitrate']==0x80})[_0x14ac93(0x1a4)](fs[_0x14ac93(0x1c2)](randomName));await new Promise((_0xbd802f,_0x3e8a3)=>{const _0x5d910d=_0x14ac93;stream['on']('error',_0x3e8a3),stream['on'](_0x5d910d(0x1b3),_0xbd802f);}),await Suhail.bot[_0x14ac93(0x1bd)](citel[_0x14ac93(0x1b7)],{'audio':fs['readFileSync'](randomName),'mimetype':_0x14ac93(0x1b2)},{'quoted':citel});}}try{return fs[_0x14ac93(0x1aa)](randomName);}catch(_0x4b8369){}}catch(_0x2c1b30){return await citel[_0x14ac93(0x1b0)](_0x14ac93(0x1b5)+_0x2c1b30);}}}function _0x28e1(){const _0x5a2e4d=['video/mp4','33215aEaqLO','audioBitrate','itag','reply','Url\x20:','audio/mpeg','finish','708PUYfdf','Error\x20While\x20Downloading\x20Video\x20:\x20','text','chat','split','211117duABrL','error','540vpKxFa','1041800hTaUXQ','sendMessage','1389897APKDJS','readFileSync','4173952CbWaym','quoted','createWriteStream','pipe','startsWith','./ytsong.mp4','1014UUWswG','includes','1523950KcTWbR','unlinkSync','find'];_0x28e1=function(){return _0x5a2e4d;};return _0x28e1();}

})



