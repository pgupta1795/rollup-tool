"use strict";(self.webpackChunkrollup_tool=self.webpackChunkrollup_tool||[]).push([[3],{7522:function(e,n,r){r.d(n,{Z:function(){return g}});var t=r(9439),o=r(2791),i=r(5987),a=r(1413),c=r(9673),s=r(5818),l=r(3721),u=r(6934),d=r(1478),f=r(184),h=["toggle"],p=(0,u.ZP)((function(e){return(0,f.jsx)(c.Z,(0,a.Z)({disableGutters:!0,elevation:0,square:!0},e))}))((function(e){var n=e.theme;return{border:"1px solid ".concat(n.palette.divider),"&:not(:last-child)":{borderBottom:0},"&:before":{display:"none"}}})),v=(0,u.ZP)((function(e){var n=e.toggle,r=(0,i.Z)(e,h);return(0,f.jsx)(s.Z,(0,a.Z)({expandIcon:(0,f.jsx)(d.Z,{sx:{fontSize:"0.9rem"},onClick:n})},r))}))((function(e){var n=e.theme;return{backgroundColor:"dark"===n.palette.mode?"rgba(255, 255, 255, .05)":"rgba(0, 0, 0, .03)",flexDirection:"row-reverse","& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":{transform:"rotate(90deg)"},"& .MuiAccordionSummary-content":{marginLeft:n.spacing(1)}}})),m=(0,u.ZP)(l.Z)((function(e){return{padding:e.theme.spacing(1),borderTop:"1px solid rgba(0, 0, 0, .125)"}})),x=r(4554),b=r(5527),Z=function(e){var n=e.children;return(0,f.jsx)(x.Z,{component:"div",sx:{flexGrow:1,width:"100%",mb:1},children:(0,f.jsx)(b.Z,{component:"div",sx:{width:"100%"},children:n})})},j=function(e){var n=e.summary,r=e.children,i=e.initialExpand,a=o.useState(i),c=(0,t.Z)(a,2),s=c[0],l=c[1];return(0,f.jsx)(Z,{children:(0,f.jsxs)(p,{expanded:s,sx:{minHeight:10},children:[(0,f.jsx)(v,{toggle:function(){l((function(e){return!e}))},children:n}),(0,f.jsx)(m,{children:r})]})})};j.defaultProps={initialExpand:!0};var g=j},3744:function(e,n,r){var t=r(4554),o=r(1918),i=r(890),a=(r(2791),r(184)),c=function(e){var n=e.label,r=e.value,c=e.variant,s=e.size;return(0,a.jsxs)(t.Z,{component:"div",sx:{mb:.5,display:"flex",alignItems:"center",justifyItems:"flex-end",gap:"0.5em",justifyContent:"space-between"},children:[(0,a.jsx)(o.Z,{label:n,size:s}),(0,a.jsx)(i.Z,{component:"span",color:"primary",variant:c,sx:{ml:.5},children:(0,a.jsx)("strong",{children:r})})]})};c.defaultProps={variant:"caption",size:"small",label:null},n.Z=c},9428:function(e,n,r){r.d(n,{Z:function(){return l}});r(2791);var t=r(1413),o=r(4554),i=r(6934),a=r(184),c=(0,i.ZP)((function(e){return(0,a.jsx)(o.Z,(0,t.Z)({},e))}))((function(e){var n=e.theme,r=e.colors;return(0,t.Z)({color:"white"},r&&{background:"dark"===n.palette.mode?n.palette.background.default:"linear-gradient(to right, ".concat(r.join(","),")")})})),s=function(e){var n=e.colors,r=e.children,t=e.height;return(0,a.jsx)(c,{colors:n,sx:{padding:"10px",minHeight:t,mb:1},children:r})};s.defaultProps={height:"25vh"};var l=s},4003:function(e,n,r){r.r(n),r.d(n,{default:function(){return K}});var t=r(3433),o=r(2338),i=r(4554),a=r(890),c=r(2791),s=r(9434),l=r(7522),u=r(3967),d=r(1889),f=r(3496),h=r(457),p=r(1413),v=r(9439),m=function(e,n,r){var t=(0,u.Z)(),o=(0,c.useState)((0,p.Z)((0,p.Z)({},n),{},{theme:{mode:t.palette.mode,palette:"palette7"}})),i=(0,v.Z)(o,2),a=i[0],s=i[1],l=r.bind(undefined);return(0,c.useEffect)((function(){var n=l(e,"VPMReference");s((0,p.Z)((0,p.Z)({},a),{},{series:n,options:{theme:{mode:t.palette.mode,palette:"palette7"}}}))}),[e,t]),a},x=r(5472),b=r(184),Z=function(){var e=(0,s.v9)(h.o4),n=m(e,{series:[],options:{chart:{id:"countChart"},title:{text:"Object Transactions"},xaxis:{labels:{show:!1}},plotOptions:{bar:{horizontal:!0}}}},x.t6);return(0,b.jsx)("div",{id:"apex-chart",children:(0,b.jsx)(f.Z,{options:n.options,series:n.series,type:"bar",height:"300"})})},j=function(){var e=(0,s.v9)(h.o4),n=m(e,{series:[],options:{chart:{id:"attributeRangeChart"},plotOptions:{bar:{horizontal:!0}},title:{text:"Attribute Ranges"}}},x.K5);return(0,b.jsx)("div",{id:"apex-chart",children:(0,b.jsx)(f.Z,{options:n.options,series:n.series,type:"rangeBar",height:"300"})})},g=r(9428),y=function(){var e=(0,u.Z)().palette.primary;return(0,b.jsx)(g.Z,{colors:[e.main,e.light],children:(0,b.jsxs)(d.ZP,{container:!0,direction:{xs:"column",sm:"row"},spacing:{xs:1,sm:2},children:[(0,b.jsx)(d.ZP,{item:!0,xs:6.9,children:(0,b.jsx)(j,{})}),(0,b.jsx)(d.ZP,{item:!0,xs:5,children:(0,b.jsx)(Z,{})})]})})},w=r(5987),k=r(3767),P=r(4721),E=r(5393),O=r(3744),z=function(e){var n=e.children;return(0,b.jsx)(i.Z,{sx:{display:"flex",alignItems:"center",width:"fit-content","& svg":{m:1.5},"& hr":{mx:.5}},children:n})},D=["title","description"],S=function(e){var n=e.cell,r=e.row,t=new Set(["cestamp","type","name","revision","state","owner","subRows","created","modified","usage","endItem"]),o=r.original[n.column.id];if(!o)return"NO DATA";var i=JSON.parse(o||"{}"),a=i.title,c=i.description,s=(0,w.Z)(i,D);return(0,b.jsxs)(z,{children:[(0,b.jsxs)(k.Z,{direction:"column",children:[(0,b.jsx)(O.Z,{label:"Title",value:a||""}),(0,b.jsx)(O.Z,{label:"Description",value:c||""})]}),(0,b.jsx)(P.Z,{orientation:"vertical",flexItem:!0}),(0,b.jsx)(k.Z,{direction:"column",sx:{ml:1},children:Object.keys(s).filter((function(e){return!t.has(e)})).map((function(e){return(0,b.jsx)(O.Z,{label:(0,E.pn)(e)||e,value:s[e]},e)}))})]})},A=r(5969),C=r(3169),N=r(4092),T=(0,c.lazy)((function(){return Promise.all([r.e(576),r.e(734),r.e(394),r.e(258)]).then(r.bind(r,258))})),K=function(){var e=(0,s.I0)(),n=(0,s.v9)(h.o4),r=(0,s.v9)(h.F0),u=(0,s.v9)(h.nc),d=(0,t.Z)([{accessorKey:"name",header:"Name",enableEditing:!1,Cell:function(e){return(0,b.jsx)(A.Z,(0,p.Z)({},e))},attributeType:"db",size:100},{accessorKey:"objectOldDetails",header:"Before",enableEditing:!1,Cell:function(e){return(0,b.jsx)(S,(0,p.Z)({},e))},attributeType:"db",size:250},{accessorKey:"objectNewDetails",header:"After",enableEditing:!1,Cell:function(e){return(0,b.jsx)(S,(0,p.Z)({},e))},attributeType:"db",size:250},{accessorFn:function(e){return new Date(e.createdAt)},id:"createdAt",header:"Action Date",filterFn:"lessThanOrEqualTo",sortingFn:"datetime",Cell:function(e){var n;return null===(n=e.cell.getValue())||void 0===n?void 0:n.toLocaleDateString()},Filter:function(e){return(0,b.jsx)(C.Z,(0,p.Z)({},e))},enableEditing:!1,attributeType:"db",size:100}]);return(0,c.useEffect)((function(){"idle"===r&&e((0,N.k)())}),[r,e]),"failed"===r?u:(0,b.jsxs)(i.Z,{m:1,children:[(0,b.jsx)(l.Z,{summary:(0,b.jsx)(o.Z,{color:"primary"}),children:(0,b.jsx)(y,{})}),(0,b.jsx)(l.Z,{summary:(0,b.jsx)(a.Z,{variant:"h6",color:"primary",children:"Actions History"}),children:(0,b.jsx)(c.Suspense,{fallback:(0,b.jsx)(b.Fragment,{children:"LOADING..."}),children:(0,b.jsx)(T,{loading:"loading"===r,tableData:n,columns:d,enableExpanding:!1,enableEditing:!1,displayColumnDefOptions:{},enableRowActions:!1,enablePagination:!1})})})]})}},5472:function(e,n,r){r.d(n,{K5:function(){return u},_T:function(){return p},bK:function(){return f},fs:function(){return h},rP:function(){return v},t6:function(){return d}});var t=r(3433),o=r(5655),i=r(853),a=r(9216),c=r(5393),s=void 0,l=function(e,n){var r={};return null===e||void 0===e||e.forEach((function(e){var t=e.name;r[t]=e[n]})),r},u=function(e,n){try{var r=(0,c.KL)(n),a=[];return r.forEach((function(r){var l={name:(0,c.pn)(r,n),data:[]},u=function(e,n){try{var r={};return e.forEach((function(e){var o=e.name,a=e.objectOldDetails,c=e.objectNewDetails,s=(0,i.r)(a),l=(0,i.r)(c),u=Object.prototype.hasOwnProperty.call(r,o)?new Set([].concat((0,t.Z)(r[o]),[s[n],l[n]])):new Set([s[n],l[n]]);r[o]=u})),r}catch(a){throw console.error(a),o.ZP.error(a),a}}(e,r);Object.keys(u).forEach((function(e){var n=u[e],r=Number(Math.max.apply(s,(0,t.Z)(n))),o=Number(Math.min.apply(s,(0,t.Z)(n)));1===n.size&&(r+=1),l.data.push({x:e,y:[o,r]})})),a.push(l)})),a}catch(l){throw console.error(l),o.ZP.error(l),l}},d=function(e){try{var n=[],r={name:"Actions Count",data:[]},t=function(e){var n={};return e.forEach((function(e){var r=e.name,t=Object.prototype.hasOwnProperty.call(n,r)?n[r]+1:1;n[r]=t})),n}(e);return Object.keys(t).forEach((function(e){var n=t[e];r.data.push({x:e,y:n})})),n.push(r),n}catch(i){throw console.error(i),o.ZP.error(i),i}},f=function(e){try{var n=[],r=[],t=function(e){var n={};return e.forEach((function(e){var r=e.state,t=Object.prototype.hasOwnProperty.call(n,r)?n[r]+1:1;n[r]=t})),n}((0,a.x)(e));return Object.keys(t).forEach((function(e){var o=t[e];n.push(o),r.push(e)})),[n,r]}catch(i){throw console.error(i),o.ZP.error(i),i}},h=function(e,n){try{var r=(0,c.KL)(n),i=new Set,s=[],u=(0,a.x)(e);return r.forEach((function(e){var r={name:(0,c.pn)(e,n),type:"line",data:[]},t=l(u,e);Object.keys(t).forEach((function(e){var n=t[e];Number.isNaN(n)||r.data.push(n),i.add(e)})),s.push(r)})),[s,(0,t.Z)(i)]}catch(d){throw console.error(d),o.ZP.error(d),d}},p=function(e,n){try{var r=(0,c.KL)(n),t=[],i=[];return null===r||void 0===r||r.forEach((function(r){var o=(0,c.pn)(r,n);if(o.includes("Mass")){var a=l(e,r);Object.keys(a).forEach((function(e){var n=a[e];t.push(n||0),i.push(o)}))}})),[t,i]}catch(a){throw console.error(a),o.ZP.error(a),a}},v=function(e,n){try{var r=(0,c.KL)(n),t=[{data:[]}],i=[];return null===r||void 0===r||r.forEach((function(r){var o=l(e,r);Object.keys(o).forEach((function(e){var a=o[e];t[0].data.push(a||0),i.push((0,c.pn)(r,n))}))})),[t,i]}catch(a){throw console.error(a),o.ZP.error(a),a}}},2338:function(e,n,r){var t=r(4836);n.Z=void 0;var o=t(r(5649)),i=r(184),a=(0,o.default)((0,i.jsx)("path",{d:"M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"}),"Dashboard");n.Z=a},3767:function(e,n,r){var t=r(4942),o=r(3366),i=r(7462),a=r(2791),c=r(1184),s=r(5682),l=r(8519),u=r(2466),d=r(6934),f=r(1402),h=r(184),p=["component","direction","spacing","divider","children"];function v(e,n){var r=a.Children.toArray(e).filter(Boolean);return r.reduce((function(e,t,o){return e.push(t),o<r.length-1&&e.push(a.cloneElement(n,{key:"separator-".concat(o)})),e}),[])}var m=(0,d.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,n){return[n.root]}})((function(e){var n=e.ownerState,r=e.theme,o=(0,i.Z)({display:"flex",flexDirection:"column"},(0,c.k9)({theme:r},(0,c.P$)({values:n.direction,breakpoints:r.breakpoints.values}),(function(e){return{flexDirection:e}})));if(n.spacing){var a=(0,s.hB)(r),l=Object.keys(r.breakpoints.values).reduce((function(e,r){return("object"===typeof n.spacing&&null!=n.spacing[r]||"object"===typeof n.direction&&null!=n.direction[r])&&(e[r]=!0),e}),{}),d=(0,c.P$)({values:n.direction,base:l}),f=(0,c.P$)({values:n.spacing,base:l});"object"===typeof d&&Object.keys(d).forEach((function(e,n,r){if(!d[e]){var t=n>0?d[r[n-1]]:"column";d[e]=t}}));o=(0,u.Z)(o,(0,c.k9)({theme:r},f,(function(e,r){return{"& > :not(style) + :not(style)":(0,t.Z)({margin:0},"margin".concat((o=r?d[r]:n.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[o])),(0,s.NA)(a,e))};var o})))}return o=(0,c.dt)(r.breakpoints,o)})),x=a.forwardRef((function(e,n){var r=(0,f.Z)({props:e,name:"MuiStack"}),t=(0,l.Z)(r),a=t.component,c=void 0===a?"div":a,s=t.direction,u=void 0===s?"column":s,d=t.spacing,x=void 0===d?0:d,b=t.divider,Z=t.children,j=(0,o.Z)(t,p),g={direction:u,spacing:x};return(0,h.jsx)(m,(0,i.Z)({as:c,ownerState:g,ref:n},j,{children:b?v(Z,b):Z}))}));n.Z=x}}]);
//# sourceMappingURL=3.17398c73.chunk.js.map