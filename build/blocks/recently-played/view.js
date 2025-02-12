(()=>{"use strict";const r=window.wp.element,e=window.wp.i18n,t=window.ReactJSXRuntime;function a({tracks:r,includeLinkToTrack:a,showTrackArtwork:s,imageStyle:c,textAlign:n}){const l=r?.length>0,o=({children:r,url:e})=>a?(0,t.jsx)("a",{href:e,target:"_blank",rel:"noreferrer",className:"track-name",children:r}):(0,t.jsx)("span",{className:"track-name",children:r});return(0,t.jsxs)("ul",{className:`tracks-list has-text-align-${n}`,children:[!l&&(0,t.jsx)("li",{className:"no-tracks-found",children:(0,e.__)("No tracks found.","lastfm-blocks")}),l&&r.map((r=>(0,t.jsxs)("li",{children:[s&&(0,t.jsx)("div",{className:`track-image ${c}`,children:(0,t.jsxs)(o,{url:r.url,children:[(0,t.jsx)("span",{className:"artwork",role:"img","aria-label":`${r.artist["#text"]} - ${r.name}`,style:{backgroundImage:`url(${r.image[1]["#text"]})`}}),"default"!==c&&(0,t.jsx)("span",{className:"format"})]})}),(0,t.jsxs)("div",{className:"track-info",children:[(0,t.jsx)(o,{url:r.url,children:r.name}),(0,t.jsx)("br",{}),(0,t.jsx)("span",{className:"artist-name",children:r.artist["#text"]})]})]},r.url)))]})}const s=document.querySelector(".wp-block-lastfm-blocks-lastfm-recently-played-block"),c=(0,r.createRoot)(s),n=s.dataset,l=n.lastfmApikey,o=n.lastfmUsername,i=n.lastfmNumberoftracks,m="true"===n.lastfmIncludelinktotrack,k="true"===n.lastfmShowtrackartwork,u=n.lastfmImagestyle,d=n.lastfmTextalign;(async function(r,t,a="1"){if(!r||!t)throw new Error("API key and username are required");const s=parseInt(a,10);if(isNaN(s)||s<1)throw new Error("Number of tracks must be a positive number");try{const a=await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${t}&api_key=${r}&format=json&limit=${s}`),c=await a.json();if(c.error)throw new Error(c.message);if("0"===c.recenttracks["@attr"]?.total)throw new Error((0,e.sprintf)(
// translators: %s: Last.fm username
// translators: %s: Last.fm username
(0,e.__)('No Last.fm tracks found from user "%s".',"lastfm-blocks"),t));return c.recenttracks.track?c.recenttracks.track.slice(0,s):[]}catch(r){throw r}})(l,o,i).then((r=>{c.render((0,t.jsx)(a,{tracks:r,includeLinkToTrack:m,showTrackArtwork:k,imageStyle:u,textAlign:d}))})).catch((r=>{console.error(r)}))})();