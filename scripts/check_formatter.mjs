import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createServer} from 'node:net';
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const probe=createServer();probe.listen(0,'127.0.0.1');await once(probe,'listening');
const port=probe.address().port;await new Promise(r=>probe.close(r));
const temp=await mkdtemp(path.join(tmpdir(),'wechat-format-'));
const child=spawn(process.execPath,['server.mjs'],{cwd:path.join(root,'tools/wechat-md'),env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']});
let output='';child.stdout.on('data',d=>output+=d);child.stderr.on('data',d=>output+=d);
const base=`http://127.0.0.1:${port}`;
async function post(url,data,headers={}){return fetch(base+url,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(data)});}
try{
  let ready=false;
  for(let i=0;i<80;i++){
    if(child.exitCode!==null)throw Error(`Server exited: ${output}`);
    try{const r=await fetch(base+'/api/initial');if(r.ok){ready=true;break;}}catch{}
    await new Promise(r=>setTimeout(r,50));
  }
  assert.ok(ready,'server starts');
  assert.equal((await fetch(base+'/')).status,200);
  const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aRZkAAAAASUVORK5CYII=','base64');
  await writeFile(path.join(temp,'image.png'),png);
  const source='# 合成测试文章\n\n## 测试\n\n**重点**\n\n![示意](image.png)\n\n<script>alert(1)</script>';
  const doc=path.join(temp,'demo.md');await writeFile(doc,source);
  const loaded=await (await post('/api/load',{path:doc})).json();assert.equal(loaded.source,source);
  const rendered=await (await post('/api/render',{source,path:doc,options:{}})).json();
  assert.deepEqual(rendered.warnings,[]);assert.match(rendered.html,/data:image\/png;base64/);assert.doesNotMatch(rendered.html,/<script>/);
  const escape=await (await post('/api/render',{source:'![bad](../outside.png)',path:doc})).json();assert.equal(escape.warnings.length,1);
  assert.equal((await post('/api/render',{source:'x'},{Origin:'https://example.invalid'})).status,403);
  console.log('PASS: formatter startup, static page, Markdown load, local image embedding, HTML sanitization, missing-image warning and cross-origin rejection.');
}finally{
  const ended=child.exitCode===null?once(child,'exit'):Promise.resolve();child.kill('SIGTERM');await ended;await rm(temp,{recursive:true,force:true});
}
