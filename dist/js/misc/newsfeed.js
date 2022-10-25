var newsfeed={lsKey:"newsfeed",feedUrl:"https://blog.myouri.cyou/rss-newsfeed.xml",maxItems:3,maxAge:7862400,dismissed:{},done:!1,simpleParseDate:function(e){var t={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11},n=e.match(/[a-zA-Z]*,\s(\d{2})\s([a-zA-Z]{3})\s(\d{4})\s(\d{2}):(\d{2}):(\d{2})\sGMT/);if(n&&void 0!==t[n[2]]){var s=new Date;return s.setUTCDate(n[1]),s.setUTCMonth(t[n[2]]),s.setUTCFullYear(n[3]),s.setUTCHours(n[4]),s.setUTCMinutes(n[5]),s.setUTCSeconds(n[6]),s}},formatRelativeDate:function(e){var t,n,s=3600,i=86400,d=7*i;return e<60?(t=e,n="second"):e<s?(t=Math.floor(e/60),n="minute"):e<i?(t=Math.floor(e/s),n="hour"):e<d?(t=Math.floor(e/i),n="day"):(t=Math.floor(e/d),n="week"),t+" "+n+(1!==t?"s":"")+" ago"},formatNotification:function(e){var t=e.dateDelta<=604800,n=document.createElement("a");return n.dataset.identifier=e.identifier,n.className="notification is-info",n.href=e.link,n.target="_blank",n.innerHTML='\n    <button class="delete" title="Dismiss"></button>\n    <div class="content">\n      <div class="news-title">\n        '+(e.title||"Untitled")+'\n      </div>\n      <div class="news-excerpt">\n        '+(e.description?""+("…"===e.description.slice(-1)?e.description.slice(0,-1)+" […]":e.description):"N/A")+'\n      </div>\n      <div class="news-date'+(t?" is-recent-week":"")+'">\n        <span title="'+e.parsedDate.toLocaleString()+'">'+newsfeed.formatRelativeDate(e.dateDelta)+"</span>\n      </div>\n    <div>\n  ",n},dismissNotification:function(e){if(e&&e.dataset.identifier){newsfeed.dismissed[e.dataset.identifier]=1,e.parentNode.removeChild(e);var t=Object.keys(newsfeed.dismissed);if(t.length>newsfeed.maxItems)for(var n=0;n<t.length-newsfeed.maxItems;n++)delete newsfeed.dismissed[t[n]];localStorage[newsfeed.lsKey]=JSON.stringify(newsfeed.dismissed)}},do:function(){return axios.get(newsfeed.feedUrl,{responseType:"document"}).then((function(e){if(!(e&&e.data&&e.data.documentElement instanceof Element))throw Error("response.data.documentElement is NOT an instance of Element");var t=e.data.documentElement.querySelectorAll("item");if(t.length){var n=localStorage[newsfeed.lsKey];n&&(newsfeed.dismissed=JSON.parse(n));var s=document.createElement("section");s.id="newsfeed",s.className="section",s.innerHTML='\n          <div class="columns is-gapless">\n            <div class="column is-hidden-mobile"></div>\n            <div class="column is-hidden-mobile"></div>\n            <div class="column has-text-right"></div>\n          </div>\n        ';for(var i=s.querySelector(".columns > .column:last-child"),d=0;d<Math.min(newsfeed.maxItems,t.length);d++){var a=t[d].querySelector("title"),o=t[d].querySelector("description"),r=t[d].querySelector("pubDate"),l=t[d].querySelector("link"),c=a?a.textContent:"",f=o?o.textContent:"",m=r?r.textContent:"",u=l?l.textContent:"",v=c+"|"+f+"|"+m+"|"+u;if(!newsfeed.dismissed[v]){var p=newsfeed.simpleParseDate(m),w=Math.round((+new Date-p)/1e3);if("number"==typeof newsfeed.maxAge&&w<=newsfeed.maxAge){var h=newsfeed.formatNotification({title:c,description:f,pubDate:m,link:u,identifier:v,parsedDate:p,dateDelta:w}),g=h.querySelector(".delete");g&&g.addEventListener("click",(function(){event.preventDefault(),newsfeed.dismissNotification(event.target.parentNode)})),i.appendChild(h)}}}document.body.appendChild(s)}})).catch(console.error)},onloaded:function(){"undefined"!=typeof page&&page.apiChecked&&!newsfeed.done&&newsfeed.do()}};"interactive"===document.readyState||"complete"===document.readyState?newsfeed.onloaded():window.addEventListener("DOMContentLoaded",(function(){return newsfeed.onloaded()}));
//# sourceMappingURL=newsfeed.js.map
