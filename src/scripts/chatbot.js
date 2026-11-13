// Chat assistant: answers from the site's own info (no backend). Set BOT_ENDPOINT to connect an AI backend.
(function(){
"use strict";
var BOT_ENDPOINT=""; // optional: your AI backend URL. POST {messages:[{role,content}]} -> {reply:"..."}
var WA="https://wa.me/8801917189096",MAIL="sujon.webflow@gmail.com";
var $=function(i){return document.getElementById(i)};
var bot=$("bot"),fab=$("botFab"),panel=$("botPanel"),msgs=$("botMsgs"),chipsEl=$("botChips"),form=$("botForm"),inp=$("botInput"),tip=$("botTip");
if(!bot)return;
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var hist=[],lead=null,greeted=false,tipDone=false,busy=false;

function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function plink(n){var a=document.querySelector('[data-m="'+n+'"]'),h=a&&a.getAttribute("href");return h&&h!=="#"?a.href:""}
function waLink(t){return WA+"?text="+encodeURIComponent(t||"Hi Sujon, I was chatting with your website assistant.")}
function mailLink(s,b){return "mailto:"+MAIL+"?subject="+encodeURIComponent(s||"Project enquiry")+"&body="+encodeURIComponent(b||"")}

/* ---------- knowledge base ---------- */
var C_GET="Get a quote",C_TALK="Talk to Sujon";
var KB=[
{k:["get a quote","quote","estimate","proposal","new project","start a project","i need a website","i want a website","build me","work on my"],f:"lead"},
{k:["price","pricing","cost","how much","rate","budget","charge","fee","hourly","fixed price","afford","expensive","cheap","package"],
 a:"Pricing depends on the number of pages, CMS, animations and integrations, so there isn’t a fixed price list. Share a few details and <b>Sujon will review them and send you a quote</b>.",n:[C_GET,"Timeline",C_TALK]},
{k:["timeline","how long","deadline","delivery","turnaround","how fast","how soon","urgent","asap","when can you start","when will it be ready","duration"],
 a:"It depends on scope — a landing page is much quicker than a multi-page CMS site. After a short chat, Sujon gives you a <b>clear timeline with milestones</b> before work starts. He is currently <b>available for new projects</b>.",n:[C_GET,"Process","Revisions"]},
{k:["revision","change request","feedback round","unlimited revision","modification","edit after delivery"],
 a:"Feedback rounds are part of the process. You and Sujon agree on the <b>scope and number of revision rounds up front</b>, so there are no surprises.",n:["Process","Payment",C_GET]},
{k:["payment","pay","invoice","paypal","escrow","milestone","upfront","deposit","advance","wise","bank transfer","credit card"],
 a:"Payment goes through <b>Fiverr or Upwork</b>, where milestones and escrow protect both sides. For direct projects, milestones are agreed before work begins.",n:["Fiverr or Upwork","Refunds",C_TALK]},
{k:["hire","order","fiverr","upwork","work with you","work together","gig","engage","how to start","get started","freelancer"],
 a:"You can start in three ways:<br>• Order on <b>Fiverr</b><br>• Hire on <b>Upwork</b> (Top Rated Plus, 100% Job Success)<br>• Work with Sujon <b>directly</b> via WhatsApp, email or a quick call",x:["fiverr","upwork","wa"],n:[C_GET,"Pricing","Reviews"]},
{k:["contact","reach","email","whatsapp","phone","call","talk","speak","meeting","book","schedule","calendly","zoom","human","real person","number"],
 a:"You can reach Sujon directly:<br>WhatsApp: <b>+880 1917 189096</b><br>Email: <b>"+MAIL+"</b><br>He is based in Bangladesh (UTC+6) and replies quickly.",x:["wa","mail","form"],n:[C_GET,"Timezone","Services"]},
{k:["service","what do you do","what can you do","offer","help with","skill","specialize","specialise","capabilities","expertise"],
 a:"Sujon offers:<br>• Figma to Webflow<br>• Custom Webflow websites<br>• CMS &amp; dynamic content<br>• Animations &amp; interactions<br>• E-commerce &amp; integrations<br>• Fixes, edits &amp; support<br>• AI-powered automation &amp; features",x:["go:#services:See services"],n:["Pricing","Process","Portfolio"]},
{k:["figma","design to webflow","convert design","psd","adobe xd","pixel perfect","sketch file","mockup"],
 a:"Sujon turns your Figma design into a <b>pixel-perfect, responsive Webflow site</b> with a clean Client-First structure. Share your Figma file when you get in touch.",n:["Timeline",C_GET,"Animations"]},
{k:["custom website","build a website","from scratch","landing page","business website","startup","redesign","website design","new website","web design","web development","portfolio website"],
 a:"Sujon designs and builds custom Webflow websites for <b>startups, agencies and local businesses</b> — sharp, fast and easy to grow. It can start from your idea or from a finished design.",n:["Process","Pricing",C_GET]},
{k:["cms","collection","blog","dynamic content","content management","editor","update content","edit myself","edit the site","manage content"],
 a:"He sets up the <b>Webflow CMS</b> — collections, filters and templates — so your team can update content without a developer, and he can walk you through editing.",n:["Handover","Services","Pricing"]},
{k:["animation","interaction","scroll effect","motion","transition","hover effect","lottie","parallax"],
 a:"He adds smooth scroll effects, hover states and page transitions that give your site polish <b>without slowing it down</b>.",n:["Portfolio","Services",C_GET]},
{k:["ecommerce","e commerce","online store","shop","stripe","checkout","sell online","sell product","webflow ecommerce","payment gateway"],
 a:"Yes — <b>Webflow Ecommerce</b>, with integrations like <b>Stripe</b>, plus Zapier, Make and Airtable to connect your tools.",n:["Integrations","Pricing",C_GET]},
{k:["ai","artificial intelligence","chatgpt","gpt","claude","gemini","openai","chatbot","chat bot","bot","llm","machine learning","ai feature","ai tool"],
 a:"Sujon works with modern AI tools: <b>AI-assisted development</b>, <b>smart automation</b> (Make/Zapier with AI steps) and <b>AI features</b> such as chatbots, AI search and content workflows. Everything is reviewed by hand.<br><br>I’m a simple assistant trained on this site — Sujon can build a full AI chatbot for yours.",x:["go:#ai:See AI section","wa"],n:["Integrations","Pricing",C_GET]},
{k:["integration","integrate","zapier","make.com","airtable","api","crm","automation","automate","connect tools","zap","workflow automation","hubspot","mailchimp"],
 a:"He connects Webflow with <b>Zapier, Make, Airtable and Stripe</b> — forms, CRM, email and automations. Need a specific tool? Tell Sujon which one and he will confirm.",n:["AI features","Pricing",C_TALK]},
{k:["fix","bug","broken","maintenance","maintain","support","not working","after launch","after the site","ongoing","issue","error","problem with my site","existing site"],
 a:"Yes — quick updates, bug fixes, template customization and <b>ongoing Webflow maintenance</b>, including after launch.",n:["Pricing",C_GET,"Process"]},
{k:["template","theme","customize","customise","customization","customisation"],
 a:"Yes — <b>template customization</b> is one of his services, from small edits to making a template match your brand.",n:["Pricing",C_GET,"Services"]},
{k:["why webflow","webflow vs","wordpress","wix","squarespace","shopify","migrate","migration","switch from","move my site","what is webflow"],
 a:"Webflow lets Sujon build custom, fast, responsive sites visually with clean code, a built-in CMS and hosting. Thinking of moving from WordPress, Wix or another platform? Share your current site and he will advise.",x:["wa"],n:["Hosting","Pricing",C_GET]},
{k:["portfolio","your project","about your project","project","example","past work","previous work","your work","case study","sample","showcase","what have you built","built before"],
 a:"A few recent projects:<br>• <b>Dental Wellness</b> — dental practice<br>• <b>Artist Republic</b> — artists &amp; performers<br>• <b>Eventech</b> — event production<br>• <b>Forever Promises</b> — proposal planning<br>• <b>Wedding Bands Nottingham</b><br>• <b>MusicLegal</b> — musicians’ rights<br>• <b>Greener Concepts</b> — design &amp; build<br>• <b>Ed Sheeran Tribute</b> show<br>Click any project card to open the live site.",x:["go:#work:See projects"],n:["Reviews",C_GET,"Services"]},
{k:["review","testimonial","rating","reputation","trust","reliable","reference","recommend","client feedback","success rate","job success"],
 a:"Clients rate Sujon <b>4.9★</b> on average. He has <b>100% Job Success</b> and <b>Top Rated Plus</b> status on Upwork, with reviews from the UK, US, UAE, Netherlands, Switzerland, Kenya, India and more.",x:["go:#reviews:Read reviews","upwork","fiverr"],n:["Portfolio",C_GET,"Hire"]},
{k:["process","how do you work","workflow","steps","how it works","how does it work","approach","what happens next","methodology"],
 a:"<b>1. Discovery</b> — goals, pages, deadlines<br><b>2. Plan &amp; design</b> — review your Figma or map the structure<br><b>3. Build &amp; review</b> — Webflow build, staging link and your feedback<br><b>4. Launch &amp; support</b> — final checks, SEO basics, go-live, handover",x:["go:#services:See process"],n:["Timeline","Pricing",C_GET]},
{k:["are you available","available for","do you have time","free for new","timezone","time zone","utc","working hours","availability","available","are you free","online now","when are you","response time","reply time","respond"],
 a:"Sujon is based in Bangladesh (<b>UTC+6</b>) and plans his day around your timezone, so clients in the US and Europe get quick replies and regular updates. He is <b>available for new projects</b> right now.",n:[C_GET,"Contact","Timeline"]},
{k:["where are you","location","country","bangladesh","dhaka","where are you from","based in"],
 a:"Sujon is based in <b>Bangladesh</b> and works with clients worldwide.",n:["Timezone","Reviews",C_GET]},
{k:["who are you","who is sujon","about sujon","about you","tell me about","introduce","background","experience","years of experience","how many years","how many projects"],
 a:"Sujon Mahmud is a <b>Webflow developer from Bangladesh</b> with <b>5+ years</b> of experience and <b>200+ projects</b> delivered. He is a Webflow Certified Partner, <b>Top Rated Plus</b> on Upwork with 100% Job Success, and holds a <b>4.9★</b> average client rating.",n:["Services","Portfolio","Reviews"]},
{k:["seo","search engine","google ranking","ranking","meta tag","sitemap","page speed","site speed","core web vitals","performance","fast loading"],
 a:"<b>SEO basics</b> are part of the launch checks, and sites are built clean and fast. For a deeper SEO strategy, ask Sujon what fits your goals.",x:["wa"],n:["Process","Pricing",C_GET]},
{k:["responsive","mobile","tablet","device","cross browser","browser","mobile friendly","phone"],
 a:"Yes — every site is built <b>responsive</b> for desktop, tablet and mobile.",n:["Process","Portfolio",C_GET]},
{k:["handover","hand over","ownership","transfer","own the site","access","training","tutorial","walk me through","learn to edit","client editor"],
 a:"At launch Sujon does a <b>handover</b> and can walk you through editing your content so you stay in control. Ask him about access and ownership details for your project.",n:["CMS","Support",C_TALK]},
{k:["hosting","domain","dns","ssl","host","webflow plan","subscription","site plan","webflow pricing"],
 a:"Hosting is provided by Webflow through its own site plans, billed by Webflow separately from development fees. Sujon will confirm the domain setup with you for your project.",x:["wa"],n:["Pricing","Handover",C_TALK]},
{k:["language","english","bangla","bengali","communicate","communication","speak english"],
 a:"Sujon communicates in <b>English</b>, and clients often mention how clear and responsive he is.",n:["Timezone","Reviews",C_GET]},
{k:["agency","white label","whitelabel","subcontract","reseller","outsource","outsourcing","partner with"],
 a:"Sujon works with <b>startups and agencies</b>. For white-label or subcontracting arrangements, message him directly so he can confirm.",x:["wa","mail"],n:["Services","Reviews",C_TALK]},
{k:["nda","confidential","contract","agreement","legal","intellectual property","ip rights","terms"],
 a:"For contracts, NDAs or IP terms, please ask Sujon directly — he can confirm what works for your project.",x:["wa","mail"],n:[C_GET,"Payment","Contact"]},
{k:["refund","guarantee","cancel","warranty","money back","dispute"],
 a:"On Fiverr and Upwork, the platform’s payment protections apply. For direct projects, terms are agreed in advance. Ask Sujon if you need specifics.",x:["wa"],n:["Payment","Revisions",C_TALK]},
{k:["privacy","personal data","my data","gdpr","cookie","tracking","data protection","store my","is my information safe","data safe"],
 a:"Privacy matters here: this site has <b>no tracking or analytics cookies</b>, and what you type in this chat is <b>only used to prepare a message</b> you choose to send by WhatsApp or email.",x:["privacy:Read Privacy Policy"],n:["Contact","Services","Get a quote"]},
{k:["thanks","thank you","thx","appreciate","cheers","great","awesome","perfect","nice"],
 a:"You’re welcome! 😊 Want to share your project so Sujon can send you a quote?",n:[C_GET,"Services",C_TALK]},
{k:["bye","goodbye","see you","later","good night"],
 a:"Thanks for stopping by! If you’d like to talk later, WhatsApp or email works any time.",x:["wa","mail"],n:[]},
{k:["hi","hello","hey","hola","good morning","good evening","good afternoon","assalamu alaikum","salam","yo","sup"],
 a:"Hi! 👋 I’m Sujon’s assistant. I can tell you about his services, process, timeline, pricing and how to get started. What would you like to know?",n:["Services","Pricing","Process",C_GET]}
];
var START=["Services","Pricing","Timeline","Process","Portfolio",C_GET,C_TALK];

/* ---------- matching ---------- */
function stem(w){return w.length>3&&w.slice(-1)==="s"&&w.slice(-2)!=="ss"?w.slice(0,-1):w}
function norm(s){return " "+s.toLowerCase().replace(/[^a-z0-9. ]/g," ").replace(/\./g," ").split(/\s+/).filter(Boolean).map(stem).join(" ")+" "}
KB.forEach(function(e){e._k=e.k.map(function(k){return norm(k)})});
function match(text){
 var t=norm(text),best=null,top=0;
 KB.forEach(function(e){var s=0;e._k.forEach(function(k){if(t.indexOf(k)>-1)s+=k.trim().split(" ").length*2+1});
  if(s>top){top=s;best=e}});
 return top>=3?best:null;
}

/* ---------- rendering ---------- */
function scrollEnd(){msgs.scrollTop=msgs.scrollHeight}
function addMsg(who,html){var d=document.createElement("div");d.className="bm "+who;d.innerHTML=html;msgs.appendChild(d);scrollEnd();return d}
function actHtml(list){
 if(!list||!list.length)return "";
 var out=[];
 list.forEach(function(x){
  if(x==="wa")out.push('<a class="bot-act" href="'+waLink(lastUser?"Hi Sujon, I was chatting with your website assistant. My question: "+lastUser:"")+'" target="_blank" rel="noopener noreferrer">WhatsApp Sujon</a>');
  else if(x==="mail")out.push('<a class="bot-act" href="'+mailLink("Question from your website",lastUser||"")+'">Email Sujon</a>');
  else if(x==="form")out.push('<button type="button" class="bot-act" data-go="#contact">Open contact form</button>');
  else if(x==="fiverr"&&plink("fiverr"))out.push('<a class="bot-act" href="'+plink("fiverr")+'" target="_blank" rel="noopener noreferrer">Order on Fiverr</a>');
  else if(x==="upwork"&&plink("upwork"))out.push('<a class="bot-act" href="'+plink("upwork")+'" target="_blank" rel="noopener noreferrer">Hire on Upwork</a>');
  else if(x.indexOf("privacy:")===0)out.push('<button type="button" class="bot-act" data-privacy="1">'+x.split(":")[1]+'</button>');
  else if(x.indexOf("go:")===0){var p=x.split(":");out.push('<button type="button" class="bot-act" data-go="'+p[1]+'">'+p[2]+'</button>')}
 });
 return out.length?'<div class="bm-acts">'+out.join("")+"</div>":"";
}
function setChips(list){
 chipsEl.innerHTML="";
 (list||[]).forEach(function(c){var b=document.createElement("button");b.type="button";b.className="bot-chip";b.textContent=c;chipsEl.appendChild(b)});
}
function say(html,o){
 o=o||{};busy=true;
 var t=addMsg("ai typing","<i></i><i></i><i></i>");
 setTimeout(function(){t.remove();addMsg("ai",html+actHtml(o.x));setChips(o.n);hist.push({role:"assistant",content:html.replace(/<[^>]+>/g," ")});busy=false;inp.disabled=false;if(!isTouch())inp.focus()},reduce?0:Math.min(900,350+html.length*1.2));
}
function isTouch(){return window.matchMedia&&matchMedia("(pointer:coarse)").matches}

/* ---------- lead flow ---------- */
function startLead(){lead={s:0,d:{}};say("Happy to help you get a quote. First, <b>what’s your name?</b>",{n:["Cancel"]})}
function leadStep(text){
 var v=text.trim();
 if(lead.s===0){if(v.length<2)return say("Please tell me your name.",{n:["Cancel"]});lead.d.name=v;lead.s=1;return say("Nice to meet you, <b>"+esc(v)+"</b>! What’s your <b>email address</b>?",{n:["Cancel"]})}
 if(lead.s===1){if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))return say("That email doesn’t look right — could you check it?",{n:["Cancel"]});lead.d.email=v;lead.s=2;return say("Great. Briefly describe your project — <b>pages, goals, deadline</b> and any links (Figma, current site).",{n:["Cancel"]})}
 if(lead.s===2){if(v.length<8)return say("A little more detail will help Sujon give a better quote.",{n:["Cancel"]});lead.d.msg=v;var d=lead.d;lead=null;
  var body="Hi Sujon,\n\nMy name is "+d.name+" ("+d.email+").\n\nProject: "+d.msg+"\n\n(Sent via your website assistant)";
  var h='Thanks, <b>'+esc(d.name)+'</b>! Here’s your request:<br><br><i>'+esc(d.msg)+'</i><br><br>Send it to Sujon with one tap:';
  var acts='<div class="bm-acts"><a class="bot-act" href="'+waLink(body)+'" target="_blank" rel="noopener noreferrer">Send via WhatsApp</a><a class="bot-act" href="'+mailLink("Project enquiry from "+d.name,body)+'">Send via email</a></div>';
  busy=true;var t=addMsg("ai typing","<i></i><i></i><i></i>");
  setTimeout(function(){t.remove();addMsg("ai",h+acts);setChips(["Timeline","Pricing","Process"]);busy=false},reduce?0:600);}
}

/* ---------- main handler ---------- */
var lastUser="";
function handle(text){
 text=text.trim();if(!text||busy)return;
 addMsg("me",esc(text));hist.push({role:"user",content:text});
 if(lead){if(/^cancel$/i.test(text)){lead=null;return say("No problem — I cancelled that. What else can I help with?",{n:START})}return leadStep(text)}
 if(/^cancel$/i.test(text))return say("Nothing to cancel. What would you like to know?",{n:START});
 var e=match(text);
 if(e){if(e.f==="lead")return startLead();lastUser=text;return say(e.a,{x:e.x,n:e.n})}
 lastUser=text;
 if(BOT_ENDPOINT){
  busy=true;var t=addMsg("ai typing","<i></i><i></i><i></i>");
  fetch(BOT_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:hist.slice(-10)})})
   .then(function(r){if(!r.ok)throw 0;return r.json()})
   .then(function(j){t.remove();busy=false;say(esc(j.reply||"").replace(/\n/g,"<br>"),{n:START})})
   .catch(function(){t.remove();busy=false;fallback()});
  return;
 }
 fallback();
}
function fallback(){say("I’m not sure about that one, and I don’t want to guess. <b>Sujon can answer it directly</b> — your question is pre-filled so you don’t have to retype it:",{x:["wa","mail","form"],n:["Services","Pricing",C_GET]})}

/* ---------- open / close ---------- */
function fit(){
 if(window.innerWidth<=560&&window.visualViewport){var v=window.visualViewport;panel.style.top=(v.offsetTop+8)+"px";panel.style.height=(v.height-16)+"px"}
 else{panel.style.top="";panel.style.height=""}
}
function openBot(){
 bot.classList.add("open");fab.setAttribute("aria-expanded","true");panel.setAttribute("aria-hidden","false");tip.hidden=true;tipDone=true;fit();
 if(!greeted){greeted=true;say("Hi! 👋 I’m <b>Sujon’s assistant</b>. Ask me about services, pricing, timeline, process or how to get started — or pick a topic below.",{n:START})}
 setTimeout(function(){scrollEnd();if(!isTouch())inp.focus()},120);
}
function closeBot(){bot.classList.remove("open");fab.setAttribute("aria-expanded","false");panel.setAttribute("aria-hidden","true");fab.focus({preventScroll:true})}
fab.addEventListener("click",function(){bot.classList.contains("open")?closeBot():openBot()});
$("botClose").addEventListener("click",closeBot);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&bot.classList.contains("open"))closeBot()});
$("botTipX").addEventListener("click",function(){tip.hidden=true;tipDone=true});
tip.addEventListener("click",function(e){if(e.target.id!=="botTipX")openBot()});
form.addEventListener("submit",function(e){e.preventDefault();var v=inp.value;if(!v.trim()||busy)return;inp.value="";handle(v)});
chipsEl.addEventListener("click",function(e){var b=e.target.closest(".bot-chip");if(b&&!busy)handle(b.textContent)});
msgs.addEventListener("click",function(e){
 if(e.target.closest("[data-privacy]")){var po=document.getElementById("privacyOpen");if(po)po.click();return}
 var b=e.target.closest("[data-go]");if(!b)return;
 var t=document.querySelector(b.getAttribute("data-go"));
 if(window.innerWidth<=560)closeBot();
 if(t)t.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
});
if(window.visualViewport){visualViewport.addEventListener("resize",fit);visualViewport.addEventListener("scroll",fit)}
window.addEventListener("resize",fit);
/* gentle teaser, once */
setTimeout(function(){if(!tipDone&&!bot.classList.contains("open")){tip.hidden=false;setTimeout(function(){if(!bot.classList.contains("open"))tip.hidden=true;tipDone=true},9000)}},7000);
})();
