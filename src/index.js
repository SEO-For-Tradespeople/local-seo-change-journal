import {array,text,date,unique,escape,issue,issuesHTML,list} from './util.js';
export const guide='Supply business, asOf, changes [{id,date,url,change_type,reason,evidence_ref,owner,status,follow_up_date}] and observations [{source,period,value,note}]. status is planned/implemented/verified/rolled back. Verified needs check_ref. Observations never become causal claims.';
export function analyse(input){
 text(input.business,'business');date(input.asOf,'asOf');const issues=[];
 const changes=unique(array(input.changes,'changes'),'id').map(row=>{
  date(row.date,'date');for(const key of ['url','change_type','reason','owner'])text(row[key],key);
  if(!['planned','implemented','verified','rolled back'].includes(row.status))throw Error('Invalid change status');
  if(row.status==='verified'&&!row.check_ref)throw Error('Verified change requires check_ref');
  if(['implemented','verified','rolled back'].includes(row.status)&&!row.evidence_ref)throw Error('Completed work needs evidence_ref');
  if(row.follow_up_date){date(row.follow_up_date,'follow_up_date');if(row.follow_up_date<=input.asOf&&row.status!=='rolled back')issues.push(issue('follow-up','Follow-up review is due; status is unchanged',row.id));}
  return {...row};
 }).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
 const observations=array(input.observations||[],'observations').map(o=>{text(o.source,'observation source');text(o.period,'observation period');if(o.value!==null&&typeof o.value!=='number'&&typeof o.value!=='string')throw Error('Observation needs a number, text or null');return {source:o.source,period:o.period,value:o.value,note:o.note||'No causal attribution established'};});
 return {title:input.business+' change journal',summary:'Work records and observations are separate. A follow-up date does not complete or verify work.',changes,observations,issues,markdown:changes.map(c=>'- '+c.date+' | '+c.status+' | '+c.change_type+' | '+c.reason).join('\n')+'\n\n## Observations\n\n'+observations.map(o=>'- '+o.source+' ('+o.period+'): '+(o.value??'Not measured')+'. '+o.note).join('\n')};
}
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p><div class="timeline">'+r.changes.map(c=>'<article><span class="badge">'+escape(c.status)+'</span><h3>'+escape(c.date+' / '+c.change_type)+'</h3><p>'+escape(c.reason)+'</p><p><strong>Evidence:</strong> '+escape(c.evidence_ref||'Not implemented')+'</p><p><strong>Verification:</strong> '+escape(c.check_ref||'Not verified')+'</p></article>').join('')+'</div><h3>Separate observations</h3>'+list(r.observations.map(o=>o.source+' ('+o.period+'): '+(o.value??'Not measured')+'. '+o.note))+issuesHTML(r.issues);
