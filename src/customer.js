import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "SEO Enquiry Tracker & Monthly Planner",
  "short": "Keep track of the enquiries that matter",
  "audience": "For trade businesses investing in ongoing SEO",
  "summary": "Record enquiries, quotes and jobs, compare a previous month and decide what to work on next.",
  "button": "Create my monthly review",
  "filename": "monthly-enquiry-review",
  "eyebrow": "Keep the work and the results in view.",
  "time": "About 5 minutes",
  "outcome": "A simple monthly review you can save alongside your work records.",
  "layout": "journal",
  "intro": "Use counts from the same source and time period. Track each enquiry once. This is a business record, not a claim that SEO caused the result.",
  "note": "Monthly counts can change for many reasons. This tool does not connect to analytics, identify an acquisition source or attribute results to SEO.",
  "fields": [
    {
      "id": "business",
      "label": "Business name",
      "help": "",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "month",
      "label": "Month being reviewed",
      "type": "month",
      "required": true
    },
    {
      "id": "calls",
      "label": "New phone enquiries",
      "help": "Count unique enquiries, not every call.",
      "type": "number",
      "required": true,
      "min": 0,
      "max": 1000000000
    },
    {
      "id": "forms",
      "label": "Other new enquiries",
      "help": "Count website forms or other enquiries not already counted as calls.",
      "type": "number",
      "required": true,
      "min": 0,
      "max": 1000000000
    },
    {
      "id": "quotes",
      "label": "Of these enquiries, how many received a quote?",
      "help": "Use the same group of enquiries, not every quote sent this month.",
      "type": "number",
      "required": true,
      "min": 0,
      "max": 1000000000
    },
    {
      "id": "jobs",
      "label": "Of those quotes, how many became jobs?",
      "help": "Use the same group. Unresolved quotes can be updated later.",
      "type": "number",
      "required": true,
      "min": 0,
      "max": 1000000000
    },
    {
      "id": "previous",
      "label": "Previous month’s total new enquiries",
      "help": "Optional. Leave blank if the record is not comparable.",
      "type": "number",
      "required": false,
      "min": 0,
      "max": 1000000000
    },
    {
      "id": "work",
      "label": "What website or local-search work was completed?",
      "help": "One factual item per line. Optional.",
      "required": false,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    },
    {
      "id": "next",
      "label": "What needs attention next month?",
      "help": "Use tasks you can actually act on.",
      "required": true,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    }
  ],
  "example": {
    "business": "Example Heating Team",
    "month": "2026-09",
    "calls": "18",
    "forms": "12",
    "quotes": "15",
    "jobs": "8",
    "previous": "24",
    "work": "Updated the boiler repair service information.\nAdded two approved project photographs.",
    "next": "Test the enquiry form.\nFinish the approved service description."
  }
};
export function evaluate(v){const calls=number(v.calls,'phone enquiries',{integer:true}),forms=number(v.forms,'other enquiries',{integer:true}),quotes=number(v.quotes,'quotes',{integer:true}),jobs=number(v.jobs,'jobs',{integer:true}),previous=number(v.previous,'previous enquiries',{integer:true,optional:true}),total=calls+forms;if(quotes>total)throw Error('Quotes cannot exceed enquiries for the same group. Check the counts or use a consistent group.');if(jobs>quotes)throw Error('Jobs cannot exceed quoted enquiries for the same group.');if(!/^\d{4}-\d{2}$/.test(v.month)||Number(v.month.slice(5))<1||Number(v.month.slice(5))>12)throw Error('Choose a valid review month.');const comparison=previous===null?'No previous comparison supplied.':previous===0?'Previous month: zero enquiries. Absolute change: '+total+'. A percentage change from zero is not defined.':'Compared with '+previous+' previously: '+(total-previous>=0?'+':'')+(total-previous)+' enquiries ('+((total-previous)/previous*100).toFixed(1)+'%).';return report(requireText(v.business,'your business name')+': '+v.month+' enquiry review','A record of the supplied counts, not evidence of SEO attribution.',[section('Comparison',[comparison]),section('Work recorded',lines(v.work).length?lines(v.work):['No completed work recorded.']),section('Next month’s tasks',lines(requireText(v.next,'next month’s tasks'))),section('Keep the record useful',['Use the same definition of an enquiry each month and avoid double-counting.','Keep calls, forms, quotes and jobs linked to a consistent group. Update unresolved enquiries if needed.','Review where enquiries came from using your actual records. These figures alone do not show what caused the change.'])],{metrics:[{label:'New enquiries',value:String(total)},{label:'Quoted enquiries',value:String(quotes),detail:total?(quotes/total*100).toFixed(1)+'% of enquiries':'No enquiries recorded.'},{label:'Jobs from those quotes',value:String(jobs),detail:quotes?(jobs/quotes*100).toFixed(1)+'% of quotes':'No quoted enquiries recorded.'}]});}
