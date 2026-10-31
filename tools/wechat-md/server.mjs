import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {render} from './render.mjs';
const dir=path.dirname(fileURLToPath(import.meta.url));
const arg=process.argv.indexOf('--file');
const initial=arg>=0?process.argv[arg+1]:'';
const port=Number(process.env.PORT||8796);
const mime={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.webp':'image/webp'};
const server=http.createServer(async(req,res)=>{
 const send=(status,data,type='application/json')=>{res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(type==='application/json'?JSON.stringify(data):data);};
 try {
 if(req.headers.host!==`127.0.0.1:${port}` && req.headers.host!==`localhost:${port}`)return send(403,{error:'不允许的访问地址'});
 if(req.headers.origin && ![`http://127.0.0.1:${port}`,`http://localhost:${port}`].includes(req.headers.origin))return send(403,{error:'不允许跨站访问'});
 if(req.method==='GET' && req.url==='/api/initial')return send(200,{path:initial});
 if(req.method==='POST' && ['/api/load','/api/render'].includes(req.url)){
 if(!req.headers['content-type']?.startsWith('application/json'))return send(415,{error:'需要 JSON 请求'});
 let body='';for await(const chunk of req){body+=chunk;if(body.length>2e6)return send(413,{error:'文档过大（上限 2MB）'});}
 const data=JSON.parse(body);
 if(req.url==='/api/load') {const file=path.resolve(data.path);if(!/\.md$/i.test(file))throw Error('请选择 .md 文件');const stat=await fs.stat(file);if(stat.size>2e6)throw Error('文档过大');return send(200,{source:await fs.readFile(file,'utf8'),path:file});}
 let {html,title}=render(String(data.source||''),data.options||{});const images=[];const warnings=[];
 const base=data.path?await fs.realpath(path.dirname(path.resolve(data.path))):null;
 const matches=[...html.matchAll(/<img\b[^>]*src="([^"]*)"[^>]*>/g)];
 for(const match of matches){const src=match[1];if(/^(https?:|data:)/i.test(src)){images.push({name:'文章图片',src});continue;}
 try{if(!base)throw Error('请填写 Markdown 原文件路径，以定位本地图片');const decoded=decodeURIComponent(src.replace(/&amp;/g,'&'));const file=await fs.realpath(path.resolve(base,decoded));if(file!==base&&!file.startsWith(base+path.sep))throw Error('图片需位于文章所在目录内');const type=mime[path.extname(file).toLowerCase()];if(!type)throw Error('仅支持 PNG/JPG/GIF/WebP');const stat=await fs.stat(file);if(stat.size>20e6)throw Error('图片超过 20MB');const uri=`data:${type};base64,${(await fs.readFile(file)).toString('base64')}`;html=html.replace(match[0],match[0].replace(src,uri));images.push({name:path.basename(file),src:uri});}catch(e){warnings.push(`${src}：${e.message}`);html=html.replace(match[0],'<p style="color: #a45b38;">[图片待上传]</p>');}}
 return send(200,{html,title,images,warnings});
 }
 if(req.method==='GET' && ['/','/app.js','/style.css'].includes(req.url)){const file=req.url==='/'?'index.html':req.url.slice(1);return send(200,await fs.readFile(path.join(dir,'public',file)),file.endsWith('.js')?'text/javascript; charset=utf-8':file.endsWith('.css')?'text/css; charset=utf-8':'text/html; charset=utf-8');}
 send(404,{error:'未找到'});
 }catch(e){send(400,{error:e.message});}
});
server.listen(port,'127.0.0.1',()=>console.log(`公众号排版台：http://127.0.0.1:${port}`));
