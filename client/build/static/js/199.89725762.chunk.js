"use strict";(self.webpackChunkrollup_tool=self.webpackChunkrollup_tool||[]).push([[199],{2082:function(e,t,n){var r=n(4554),i=(n(2791),n(184));t.Z=function(e){var t=e.children;return(0,i.jsx)(r.Z,{sx:{display:"flex",alignItems:"center",width:"fit-content","& svg":{m:1.5},"& hr":{mx:.5}},children:t})}},1782:function(e,t,n){n(2791);var r=n(7246),i=n(184);t.Z=function(e){var t=e.current,n=e.onChange;return(0,i.jsx)("div",{style:{display:"flex",gap:"5px",alignItems:"center",justifyContent:"center"},children:(0,i.jsx)(r.Z,{size:"small",component:"div",shape:"rounded",color:"primary",count:t+1,onChange:n})})}},2199:function(e,t,n){n.r(t),n.d(t,{default:function(){return pe}});var r=n(2791),i=n(4554),o=n(1889),s=n(3454),a=n(7462),l=n(3366),c=n(8182),d=n(4419),u=n(7630),x=n(1046),p=n(703),h=n(1217),f=n(5878);function Z(e){return(0,h.Z)("MuiCard",e)}(0,f.Z)("MuiCard",["root"]);var m=n(184),v=["className","raised"],j=(0,u.ZP)(p.Z,{name:"MuiCard",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(){return{overflow:"hidden"}})),b=r.forwardRef((function(e,t){var n=(0,x.Z)({props:e,name:"MuiCard"}),r=n.className,i=n.raised,o=void 0!==i&&i,s=(0,l.Z)(n,v),u=(0,a.Z)({},n,{raised:o}),p=function(e){var t=e.classes;return(0,d.Z)({root:["root"]},Z,t)}(u);return(0,m.jsx)(j,(0,a.Z)({className:(0,c.Z)(p.root,r),elevation:o?8:void 0,ref:t,ownerState:u},s))}));function g(e){return(0,h.Z)("MuiCardContent",e)}(0,f.Z)("MuiCardContent",["root"]);var w=["className","component"],y=(0,u.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(){return{padding:16,"&:last-child":{paddingBottom:24}}})),C=r.forwardRef((function(e,t){var n=(0,x.Z)({props:e,name:"MuiCardContent"}),r=n.className,i=n.component,o=void 0===i?"div":i,s=(0,l.Z)(n,w),u=(0,a.Z)({},n,{component:o}),p=function(e){var t=e.classes;return(0,d.Z)({root:["root"]},g,t)}(u);return(0,m.jsx)(y,(0,a.Z)({as:o,className:(0,c.Z)(p.root,r),ownerState:u,ref:t},s))})),k=n(890),M=n(6871),N=n(6376),P=function(e){var t=e.type,n=(0,M.s0)();return(0,m.jsx)(b,{sx:{bgcolor:(0,N.u_)(t),textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",mb:1,width:"inherit",height:"10vh"},onClick:function(){return n(t)},children:(0,m.jsx)(C,{sx:{overflow:"hidden",textOverflow:"ellipsis"},children:(0,m.jsx)(k.Z,{align:"inherit",sx:{typography:"button",padding:"2px",wordWrap:"break-word"},component:"span",display:{xs:"none",sm:"block",md:"block"},children:t})})})},R=n(4165),O=n(3433),S=n(5861),A=n(9439),I=n(9281),D=n(9310),E=n(4492),z=n(2586),G=n(8400),T=n(7522),B=n(9949),_=n(1782),F=n(5987),J=n(3767),K=n(4721),L=n(3744),q=n(2082),U=n(1415),V=["type","title","state","description"],W=function(e){var t=e.dataItem[e.field],n=JSON.parse(t),r=n.type,i=n.title,o=n.state,a=n.description,l=(0,F.Z)(n,V),c=Object.keys(l).filter((function(e){return"expanded"!==e&&"inEdit"!==e})).map((function(e){var t=l[e];return(0,m.jsx)(L.Z,{label:(0,s.E8)(e),value:t},e)})),d=(0,m.jsxs)(q.Z,{children:[(0,m.jsxs)(J.Z,{direction:"column",children:[(0,m.jsx)(L.Z,{label:"Title",value:i}),(0,m.jsx)(L.Z,{label:"Description",value:a}),(0,m.jsx)(L.Z,{label:"Type",value:r}),(0,m.jsx)(L.Z,{label:"State",value:o})]}),(0,m.jsx)(K.Z,{orientation:"vertical",flexItem:!0}),(0,m.jsx)(J.Z,{direction:"column",sx:{ml:1},children:c})]});return(0,m.jsx)("td",{colSpan:"1","aria-selected":"false",role:"gridcell",className:U.J.DEFAULT,children:d})},H=[{field:"name",title:"Object",width:"15%"},{field:"objectOldDetails",title:"Before",cell:W,width:"25%"},{field:"objectNewDetails",title:"After",cell:W,width:"25%"},{field:"createdAt",title:"Action Date",width:"10%",format:"{0:".concat("dd MMM, yyyy hh:mm","}")}],Q=n(2410),X=n(1987),Y=n(8546),$=n(4879),ee=n(1798),te=n(3644),ne=n(3496),re=n(4578),ie=n(1413),oe=n(3967),se=function(e,t,n){var i=(0,oe.Z)(),o=(0,r.useState)((0,ie.Z)((0,ie.Z)({},t),{},{theme:{mode:i.palette.mode,palette:"palette7"}})),s=(0,A.Z)(o,2),a=s[0],l=s[1],c=n.bind(undefined);return(0,r.useEffect)((function(){var t=c(null===e||void 0===e?void 0:e.state.data,"VPMReference");l((0,ie.Z)((0,ie.Z)({},a),{},{series:t,options:{theme:{mode:i.palette.mode,palette:"palette7"}}}))}),[e,i]),a},ae=n(5472),le=function(){var e=(0,r.useContext)(re.Gd),t=se(e,{series:[],options:{chart:{id:"attributeRangeChart"},plotOptions:{bar:{horizontal:!0}},title:{text:"Attribute Ranges"}}},ae.K5);return(0,m.jsx)("div",{id:"apex-chart",children:(0,m.jsx)(ne.Z,{options:t.options,series:t.series,type:"rangeBar",height:"300"})})},ce=function(){var e=(0,r.useContext)(re.Gd),t=se(e,{series:[],options:{chart:{id:"countChart"},title:{text:"Object Transactions"},xaxis:{labels:{show:!1}},plotOptions:{bar:{horizontal:!0}}}},ae.t6);return(0,m.jsx)("div",{id:"apex-chart",children:(0,m.jsx)(ne.Z,{options:t.options,series:t.series,type:"bar",height:"300"})})},de=function(){var e=(0,m.jsxs)(o.ZP,{container:!0,direction:{xs:"column",sm:"row"},spacing:{xs:1,sm:2},children:[(0,m.jsx)(o.ZP,{item:!0,xs:6.9,children:(0,m.jsx)(le,{})}),(0,m.jsx)(o.ZP,{item:!0,xs:5,children:(0,m.jsx)(ce,{})})]});return(0,m.jsx)(te.Z,{colors:[Y.Z[100],$.Z[300],ee.Z[300]],children:e})},ue=n(5655),xe=function(){var e=(0,E.a)(),t=r.useState(1),n=(0,A.Z)(t,2),o=n[0],s=n[1],a=(0,Q.Z)({field:"createdAt",dir:"desc"}),l=(0,A.Z)(a,7),c=l[0],d=l[1],u=l[3],x=l[4],p=l[5],h=l[6],f=(0,A.Z)(h,3),Z=f[0],v=f[1],j=f[2],b=H,g=r.useCallback((0,S.Z)((0,R.Z)().mark((function t(){var n,r,i;return(0,R.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,30,Z(!0),t.next=5,z.Sv(30,30*(o-1));case 5:if(n=t.sent){t.next=8;break}return t.abrupt("return");case 8:r=X.z6(n),i=(0,m.jsx)(_.Z,{current:o,onChange:function(e,t){return s(t)}}),j(r,(0,O.Z)(b),null,i),t.next=19;break;case 13:t.prev=13,t.t0=t.catch(0),console.error(t.t0),ue.Z.error(t.t0),e.logout(),M.Fg,G.Z.LOGIN;case 19:case"end":return t.stop()}}),t,null,[[0,13]])}))),[o,e]);return r.useEffect((function(){g()}),[x,g]),(0,m.jsx)(re.Gd.Provider,{value:{state:d},children:(0,m.jsxs)(i.Z,{m:1,children:[(0,m.jsx)(T.Z,{summary:(0,m.jsx)(D.Z,{color:"primary"}),children:(0,m.jsx)(de,{})}),(0,m.jsx)(T.Z,{summary:c,children:(0,m.jsx)(I.Z,{component:"div",children:(0,m.jsx)(B.Z,{state:d,setState:v,oldRows:u,loading:p,columns:b,rowActionsRequired:!1})})})]})})},pe=function(){var e=s.vK.map((function(e){return(0,m.jsx)(P,{type:e},e)}));return(0,m.jsx)(i.Z,{component:"div",className:"roll-up-home content-height-without-topbar",children:(0,m.jsx)(o.ZP,{container:!0,sx:{justifyContent:"center"},children:(0,m.jsxs)(o.ZP,{item:!0,container:!0,children:[(0,m.jsx)(o.ZP,{item:!0,xs:11,children:(0,m.jsx)(xe,{allMenuItems:e})}),(0,m.jsx)(o.ZP,{item:!0,sx:{width:"8vw",mt:1},children:e})]})})})}}}]);
//# sourceMappingURL=199.89725762.chunk.js.map