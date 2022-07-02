"use strict";(self.webpackChunkrollup_tool=self.webpackChunkrollup_tool||[]).push([[851],{5851:function(e,t,r){r.r(t),r.d(t,{default:function(){return Ce}});var n=r(4165),a=r(3433),i=r(5861),s=r(9439),o=r(2791),l=r(6871),u=r(9281),c=r(4294),d=r(9310),p=r(4492),x=r(2586),v=r(8400),h=r(3454),Z=r(9980),b=r(7522),m=r(890),f=r(4721),j=r(3767),g=r(4554),y=r(1889),C=r(3744),S=r(184),w=function(e){var t=e.data,r=(0,S.jsxs)(g.Z,{sx:{mb:1,mx:2},children:[(0,S.jsxs)(y.ZP,{container:!0,alignItems:"center",children:[(0,S.jsx)(y.ZP,{item:!0,xs:!0,children:(0,S.jsx)(m.Z,{gutterBottom:!0,variant:"h5",component:"div",children:(null===t||void 0===t?void 0:t.name)||""})}),(0,S.jsx)(y.ZP,{item:!0,children:(0,S.jsx)(m.Z,{gutterBottom:!0,variant:"h6",component:"div",children:(null===t||void 0===t?void 0:t.revision)||""})})]}),(0,S.jsx)(m.Z,{color:"text.secondary",variant:"body2",children:(null===t||void 0===t?void 0:t.type)||""})]});return(0,S.jsx)(b.Z,{summary:(0,S.jsx)(m.Z,{color:"primary",children:"Details"}),children:(0,S.jsxs)(S.Fragment,{children:[r,(0,S.jsx)(f.Z,{variant:"middle"}),(0,S.jsxs)(g.Z,{sx:{mt:1,mx:2},children:[(0,S.jsx)(m.Z,{gutterBottom:!0,variant:"subtitle1",children:(null===t||void 0===t?void 0:t.title)||""}),(0,S.jsxs)(j.Z,{direction:"row",spacing:1,children:[(0,S.jsx)(C.Z,{label:"Description",value:(null===t||void 0===t?void 0:t.description)||""}),(0,S.jsx)(C.Z,{label:"Owner",value:(null===t||void 0===t?void 0:t.owner)||""}),(0,S.jsx)(C.Z,{label:"Created",value:(null===t||void 0===t?void 0:t.created)||""}),(0,S.jsx)(C.Z,{label:"Modified",value:(null===t||void 0===t?void 0:t.modified)||""})]})]})]})})},P=r(9949),k=r(7061),O=r(1987),A=r(6376),L=r(2410),E=r(4578),R=r(8546),M=r(4879),z=r(1798),B=r(3496),N=r(1413),T=r(3967),D=function(e,t,r){var n=(0,T.Z)(),a=(0,o.useState)((0,N.Z)((0,N.Z)({},t),{},{theme:{mode:n.palette.mode,palette:"palette7"}})),i=(0,s.Z)(a,2),l=i[0],u=i[1],c=r.bind(undefined);return(0,o.useEffect)((function(){var t=c(null===e||void 0===e?void 0:e.state.data,"VPMReference"),r=(0,s.Z)(t,2),a=r[0],i=r[1];u((0,N.Z)((0,N.Z)({},l),{},{series:a,options:{theme:{mode:n.palette.mode,palette:"palette7"},labels:i}}))}),[e,n]),l},I=r(5472),_=function(){var e=(0,o.useContext)(E.OP),t=D(e,{series:[],options:{chart:{id:"attributesChart",type:"line"},markers:{size:0,style:"hollow"},stroke:{width:1},tooltip:{shared:!0,intersect:!1},xaxis:{categories:[],labels:{show:!1}},legend:{position:"top"},title:{text:"Attributes"}}},I.fs);return(0,S.jsx)("div",{id:"apex-chart",children:(0,S.jsx)(B.Z,{options:t.options,series:t.series,type:"line",height:"300"})})},F=function(){var e=(0,o.useContext)(E.OP),t=D(e,{series:[],options:{labels:[],chart:{id:"statesChart"},title:{text:"STATES"}}},I.bK);return(0,S.jsx)("div",{id:"apex-chart",children:(0,S.jsx)(B.Z,{options:t.options,series:t.series,type:"pie",height:"300"})})},H=function(){var e=(0,o.useContext)(E.OP),t=D(e,{series:[],options:{labels:[],chart:{id:"massDistributionChart"},title:{text:"Mass Distribution"}}},I._T);return(0,S.jsx)("div",{id:"apex-chart",children:(0,S.jsx)(B.Z,{options:t.options,series:t.series,type:"pie",height:"300"})})},V=function(){var e=(0,o.useContext)(E.OP),t=D(e,{series:[],options:{chart:{id:"rootObjectAttributesChart"},title:{text:"Attributes Distribution"},plotOptions:{bar:{distributed:!0}},legend:{position:"top"}}},I.rP);return(0,S.jsx)("div",{id:"apex-chart",children:(0,S.jsx)(B.Z,{options:t.options,series:t.series,type:"bar",height:"300"})})},G=r(3644),Q=function(){return(0,S.jsx)(G.Z,{colors:[R.Z[100],M.Z[300],z.Z[300]],height:"90vh",children:(0,S.jsxs)(y.ZP,{container:!0,spacing:2,children:[(0,S.jsx)(y.ZP,{item:!0,xs:3,children:(0,S.jsx)(F,{})}),(0,S.jsx)(y.ZP,{item:!0,xs:4,children:(0,S.jsx)(H,{})}),(0,S.jsx)(y.ZP,{item:!0,xs:5,children:(0,S.jsx)(V,{})}),(0,S.jsx)(y.ZP,{item:!0,xs:12,children:(0,S.jsx)(_,{})})]})})},U=r(3896),W=r(3449),q=r(9502),K=r(2851),J=function(e){var t=e.defaultTab,r=e.tabsArray,n=o.useState(t),a=(0,s.Z)(n,2),i=a[0],l=a[1],u=r.map((function(e){var t=e.label,r=e.icon;return(0,S.jsx)(U.Z,{value:t,label:t,icon:r,iconPosition:"start"},t)})),c=r.map((function(e){var t=e.label,r=e.element;return(0,S.jsx)(K.Z,{value:t,className:"full-width-height",children:r},t)}));return(0,S.jsxs)(W.ZP,{value:i,children:[(0,S.jsx)(q.Z,{value:i,onChange:function(e,t){return l(t)},textColor:"secondary",indicatorColor:"secondary","aria-label":"secondary tabs example",sx:{paddingLeft:"24px",paddingRight:"24px"},children:u}),c]})},X=r(5655),Y=r(6151),$=r(4638),ee=r(5172),te=r(765),re=r(8096),ne=r(9484),ae=r(5523),ie=r(9955),se=r(7071),oe=r(1157),le=r(1419),ue=function(e){var t=e.value,r=e.label,n=e.title;return(0,S.jsx)(ae.Z,{value:t,control:(0,S.jsx)(le.Z,{}),title:n,label:(0,S.jsx)(m.Z,{variant:"subtitle2",children:r})})},ce=r(763),de=r.n(ce),pe=function e(t,r,n){try{var a=t?(0,O.GR)(r,t):"";if(!a||de().isUndefined(a[O.SL])||a[O.SL]&&0===a[O.SL].length)return r;a[O.SL].forEach((function(t){r=e(t.id,r,n)}));var i=function(e,t){var r=0;return e[O.SL].forEach((function(e){var n=Number(e[t]);r+=Number.isNaN(n)?0:n})),r}(a,n);return(0,O.H6)(r,t,n,i)}catch(s){throw console.error(s),X.Z.error(s),s}},xe=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(t,r,a,s){var o,l,u;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.dn(t,r);case 3:return e.next=5,x.v4(t,r);case 5:if(o=e.sent,(0,A.np)(o)){e.next=8;break}return e.abrupt("return",a);case 8:return e.next=10,(0,O.PH)(r,s);case 10:if(l=null===o||void 0===o?void 0:o.member[0].id,u=null===o||void 0===o?void 0:o.member[0].cestamp,l&&u&&(a=(0,O.H6)(a,l,"cestamp",u)),(c=r)[O.SL]&&c[O.SL].length>0){e.next=15;break}return e.abrupt("return",a);case 15:return e.next=17,Promise.all(r[O.SL].map(function(){var e=(0,i.Z)((0,n.Z)().mark((function e(r){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,xe(t,r,a,s);case 2:a=e.sent;case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 17:return e.abrupt("return",a);case 20:throw e.prev=20,e.t0=e.catch(0),console.error(e.t0),X.Z.error(e.t0),e.t0;case 25:case"end":return e.stop()}var c}),e,null,[[0,20]])})));return function(t,r,n,a){return e.apply(this,arguments)}}(),ve="Best Available",he="Best Available v2",Ze=function(e){var t=e.func,r=o.useContext(E.OP),a=r.state,l=r.setState,u=r.oldRows,c=r.setOldRows,d=o.useState(""),p=(0,s.Z)(d,2),x=p[0],v=p[1],Z=o.useState(!1),b=(0,s.Z)(Z,2),f=b[0],j=b[1],g=o.useState(!1),y=(0,s.Z)(g,2),C=y[0],w=y[1],P=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(r){var i,s;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r.preventDefault(),x){e.next=5;break}return j(!0),e.abrupt("return");case 5:return t(),i=a.data,s=i[0],e.next=10,xe(s.type,s,i,u);case 10:i=e.sent,w(!0),l((0,N.Z)((0,N.Z)({},a),{},{data:i,rollup:[]})),c(i),e.next=20;break;case 16:throw e.prev=16,e.t0=e.catch(0),w(!1),e.t0;case 20:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(t){return e.apply(this,arguments)}}(),k=h.OW().map((function(e){var t=e.Label,r=e.Attribute;return t.includes("Mass")?(0,S.jsx)(ue,{value:r,label:t,title:"Rollup ".concat(t)},t):null}));return(0,S.jsx)(ne.Z,{onClickAway:function(){l(C?(0,N.Z)((0,N.Z)({},a),{},{rollup:[]}):(0,N.Z)((0,N.Z)({},a),{},{data:u,rollup:[]}))},children:(0,S.jsx)("form",{onSubmit:P,children:(0,S.jsxs)(re.Z,{sx:{m:.5},error:f,variant:"standard",children:[(0,S.jsx)(ae.Z,{control:(0,S.jsx)(ie.Z,{defaultChecked:!0}),label:(0,S.jsx)(m.Z,{variant:"subtitle2",children:"Add +5% or -5%"})}),(0,S.jsxs)(te.Z,{"aria-labelledby":"demo-error-radios",name:"rollupCalculation",value:x,onChange:function(e){var t=e.target.value;if(v(t),t!==ve)if(t!==he){var r=function(e,t){var r=h.QS();if(null!==r&&void 0!==r&&r.includes(e)){var n=t[0].id;t=pe(n,t,e)}return t}(t,a.data);w(!1),l((0,N.Z)((0,N.Z)({},a),{},{data:r,rollup:[t]}))}else{var n=e.target.labels[0].title;X.Z.info(n,{autoClose:5e3})}else{var i=e.target.labels[0].title;X.Z.info(i,{autoClose:5e3})}},children:[k,(0,S.jsx)(ue,{value:ve,label:ve,title:oe.Z.BEST_AVAILABLE}),(0,S.jsx)(ue,{value:he,label:he,title:oe.Z.BEST_AVAILABLE_V2})]}),f?(0,S.jsx)(se.Z,{children:"Please select an option"}):null,(0,S.jsx)(Y.Z,{sx:{mt:1,mr:1},type:"submit",variant:"outlined",size:"small",children:"Calculate"})]})})})},be=r(5422),me=r(7630),fe=r(2065),je=(0,me.ZP)((function(e){return(0,S.jsx)(be.Z,(0,N.Z)({elevation:0,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"}},e))}))((function(e){var t=e.theme;return{"& .MuiPaper-root":{borderRadius:6,marginTop:t.spacing(1),minWidth:180,color:"light"===t.palette.mode?"rgb(55, 65, 81)":t.palette.grey[300],boxShadow:"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px","& .MuiMenu-list":{padding:"4px 0"},"& .MuiMenuItem-root":{"& .MuiSvgIcon-root":{fontSize:18,color:t.palette.text.secondary,marginRight:t.spacing(1.5)},"&:active":{backgroundColor:(0,fe.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity)}}}}})),ge=je,ye=function(){var e=o.useState(null),t=(0,s.Z)(e,2),r=t[0],n=t[1],a=Boolean(r),i=function(){n(null)};return(0,S.jsxs)("div",{className:"CUSTOM-HELLO",children:[(0,S.jsx)(Y.Z,{id:"demo-customized-button","aria-controls":a?"demo-customized-menu":void 0,"aria-haspopup":"true","aria-expanded":a?"true":void 0,variant:"outlined",disableElevation:!0,onClick:function(e){n(e.currentTarget)},endIcon:(0,S.jsx)(ee.Z,{}),size:"small",children:"Rollup"}),(0,S.jsx)(ge,{id:"demo-customized-menu",MenuListProps:{"aria-labelledby":"demo-customized-button"},anchorEl:r,open:a,onClose:i,children:(0,S.jsx)($.Z,{disableRipple:!0,children:(0,S.jsx)(Ze,{func:i})})})]})},Ce=function(e){var t=e.type,r=e.id,m=(0,p.a)(),f=(0,L.Z)(),j=(0,s.Z)(f,7),g=j[0],y=j[1],C=j[2],R=j[3],M=j[4],z=j[5],B=j[6],N=(0,s.Z)(B,4),T=N[0],D=N[1],I=N[2],_=N[3],F=o.useCallback((function(e){var n=k.jj.slice(0,-2),a=h.QS(t),i=O.fN(e.data,n,a),s=O.Nx(e.children,n,a,r);return i[0].children=s,{rows:i,objDetails:O.fN(e.data,k.jj,a)[0]}}),[r,t]),H=o.useCallback((0,i.Z)((0,n.Z)().mark((function e(){var i,s,o,u,c,d;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r){e.next=3;break}return e.abrupt("return");case 3:return i=k.jC(t),s=localStorage.getItem(Z.Z.SPACE3d),T(!0),e.next=8,x.nI(t,s,r);case 8:if(o=e.sent,(0,A.np)(o)){e.next=11;break}return e.abrupt("return");case 11:u=F(o),c=u.rows,d=u.objDetails,I(c,(0,a.Z)(i),d,null,[(0,S.jsx)(ye,{},"rollupCommand")]),e.next=21;break;case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0),X.Z.error(e.t0),m.logout(),l.Fg,v.Z.LOGIN;case 21:case"end":return e.stop()}}),e,null,[[0,15]])}))),[F,m]);o.useEffect((function(){H()}),[M,H]);var V=(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(w,{data:C}),(0,S.jsx)(b.Z,{summary:g,children:(0,S.jsx)(u.Z,{component:"div",children:(0,S.jsx)(P.Z,{type:t,state:y,setState:D,oldRows:R,loading:z,columns:k.jC(t)})})})]});return(0,S.jsx)(E.OP.Provider,{value:{state:y,setState:D,oldRows:R,setOldRows:_},children:(0,S.jsx)(J,{defaultTab:"Object",tabsArray:[{label:"Object",element:V,icon:(0,S.jsx)(c.Z,{})},{label:"Dashboard",element:(0,S.jsx)(Q,{}),icon:(0,S.jsx)(d.Z,{})}]})})}}}]);
//# sourceMappingURL=851.1360f2bf.chunk.js.map