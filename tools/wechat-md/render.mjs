import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
const md = new MarkdownIt({html:true,breaks:true,linkify:true});
export function render(source, options={}) {
 const accent = ({green:'#287568',blue:'#356aa0',ink:'#333333'})[options.theme] || '#287568';
 const size = [15,16,17,18].includes(Number(options.size)) ? Number(options.size) : 16;
 let html = md.render(source);
 const title = source.match(/^#\s+(.+)$/m)?.[1]?.replace(/\*\*/g,'') || '未命名文章';
 if(options.hideTitle) html=html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/,'');
 const refs=[];
 html=sanitizeHtml(html,{
 allowedTags:['p','br','h1','h2','h3','h4','h5','h6','strong','em','del','s','blockquote','ul','ol','li','a','img','pre','code','hr','table','thead','tbody','tr','th','td','span','sup','sub'],
 allowedAttributes:{'*':['style'],a:['href','title'],img:['src','alt','title'],ol:['start']},
 allowedSchemes:['http','https','mailto'],allowedSchemesByTag:{img:['http','https','data']},allowProtocolRelative:false,
 allowedStyles:{'*':{'color':[/^#[\da-f]{3,8}$/i,/^[a-z]+$/i,/^rgb\([\d\s,]+\)$/], 'font-weight':[/^(bold|normal|[1-9]00)$/], 'font-style':[/^(italic|normal)$/], 'text-decoration':[/^(underline|line-through)$/]}},
 transformTags:{a:(tag,attrs)=>{if(options.linkNotes && /^https?:/i.test(attrs.href||'')){let i=refs.indexOf(attrs.href);if(i<0){refs.push(attrs.href);i=refs.length-1;}return {tagName:'span',attribs:{style:`color: ${accent};`},text:undefined};}return {tagName:tag,attribs:attrs};}}
 });
 if(refs.length) html+='<h3>链接资料</h3>'+refs.map((url,i)=>`<p>${i+1}. ${sanitizeHtml(url,{allowedTags:[],allowedAttributes:{}})}</p>`).join('');
 const styles={p:'margin: 0 0 20px; text-align: justify; overflow-wrap: break-word;',h1:`font-size: 25px; line-height: 1.5; margin: 12px 0 28px; color: #202b29;`,h2:`font-size: 21px; line-height: 1.6; margin: 38px 0 22px; padding: 0 0 9px; border-bottom: 2px solid ${accent}; color: ${accent};`,h3:`font-size: 18px; margin: 28px 0 16px; color: ${accent};`,h4:'font-size: 17px; margin: 24px 0 14px;',strong:`font-weight: bold; color: ${accent};`,blockquote:`margin: 24px 0; padding: 16px 18px 1px; border-left: 3px solid ${accent}; background-color: #f3f6f5; color: #56625f;`,ul:'padding-left: 26px; margin: 16px 0 24px;',ol:'padding-left: 26px; margin: 16px 0 24px;',li:'margin: 9px 0;',a:`color: ${accent}; text-decoration: underline; overflow-wrap: anywhere;`,img:'display: block; max-width: 100%; height: auto; margin: 24px auto;',pre:'background-color: #f3f5f6; padding: 16px; white-space: pre-wrap; overflow-wrap: anywhere; font-size: 13px; line-height: 1.7; margin: 24px 0;',code:'font-family: Menlo, Consolas, monospace; font-size: 0.9em; background-color: #f3f5f6;',table:'border-collapse: collapse; width: 100%; font-size: 13px; margin: 24px 0; table-layout: fixed;',th:'border: 1px solid #d8e0dd; padding: 9px; background-color: #edf3f0; overflow-wrap: anywhere;',td:'border: 1px solid #d8e0dd; padding: 9px; overflow-wrap: anywhere;',hr:'border: 0; border-top: 1px solid #dde3e0; margin: 32px 0;'};
 html=html.replace(/<([a-z1-6]+)([^>]*)>/g,(all,tag,attrs)=>{if(!styles[tag])return all;const existing=attrs.match(/ style="([^"]*)"/);attrs=attrs.replace(/ style="[^"]*"/,'');return `<${tag}${attrs} style="${styles[tag]} ${existing?.[1]||''}">`;});
 return {title,html:`<section style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; font-size: ${size}px; line-height: 1.85; letter-spacing: 0.5px; color: #303936; padding: 8px 8px;">${html}</section>`};
}
