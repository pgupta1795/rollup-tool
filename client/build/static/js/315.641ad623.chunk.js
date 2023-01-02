"use strict";(self.webpackChunkrollup_tool=self.webpackChunkrollup_tool||[]).push([[315],{2315:function(e,t,n){n.r(t),n.d(t,{default:function(){return q}});var r=n(4942),i=n(3366),s=n(7462),a=n(2791),o=n(8182),d=n(7312),c=n(1217),l=n(4419),x=n(6083),h=(0,n(4046).ZP)(),m=n(5080),u=n(184),p=["className","component","disableGutters","fixed","maxWidth","classes"],f=(0,m.Z)(),v=h("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat((0,d.Z)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),j=function(e){return(0,x.Z)({props:e,name:"MuiContainer",defaultTheme:f})},Z=function(e,t){var n=e.classes,r=e.fixed,i=e.disableGutters,s=e.maxWidth,a={root:["root",s&&"maxWidth".concat((0,d.Z)(String(s))),r&&"fixed",i&&"disableGutters"]};return(0,l.Z)(a,(function(e){return(0,c.Z)(t,e)}),n)};var g=n(4036),b=n(6934),y=n(1402),C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,n=void 0===t?v:t,d=e.useThemeProps,c=void 0===d?j:d,l=e.componentName,x=void 0===l?"MuiContainer":l,h=n((function(e){var t=e.theme,n=e.ownerState;return(0,s.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!n.disableGutters&&(0,r.Z)({paddingLeft:t.spacing(2),paddingRight:t.spacing(2)},t.breakpoints.up("sm"),{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}))}),(function(e){var t=e.theme;return e.ownerState.fixed&&Object.keys(t.breakpoints.values).reduce((function(e,n){var r=n,i=t.breakpoints.values[r];return 0!==i&&(e[t.breakpoints.up(r)]={maxWidth:"".concat(i).concat(t.breakpoints.unit)}),e}),{})}),(function(e){var t=e.theme,n=e.ownerState;return(0,s.Z)({},"xs"===n.maxWidth&&(0,r.Z)({},t.breakpoints.up("xs"),{maxWidth:Math.max(t.breakpoints.values.xs,444)}),n.maxWidth&&"xs"!==n.maxWidth&&(0,r.Z)({},t.breakpoints.up(n.maxWidth),{maxWidth:"".concat(t.breakpoints.values[n.maxWidth]).concat(t.breakpoints.unit)}))})),m=a.forwardRef((function(e,t){var n=c(e),r=n.className,a=n.component,d=void 0===a?"div":a,l=n.disableGutters,m=void 0!==l&&l,f=n.fixed,v=void 0!==f&&f,j=n.maxWidth,g=void 0===j?"lg":j,b=(0,i.Z)(n,p),y=(0,s.Z)({},n,{component:d,disableGutters:m,fixed:v,maxWidth:g}),C=Z(y,x);return(0,u.jsx)(h,(0,s.Z)({as:d,ownerState:y,className:(0,o.Z)(C.root,r),ref:t},b))}));return m}({createStyledComponent:(0,b.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat((0,g.Z)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:function(e){return(0,y.Z)({props:e,name:"MuiContainer"})}}),w=C,M=n(1889),P=n(3967),k=n(5527),S=n(5878);function A(e){return(0,c.Z)("MuiCard",e)}(0,S.Z)("MuiCard",["root"]);var W=["className","raised"],R=(0,b.ZP)(k.Z,{name:"MuiCard",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(){return{overflow:"hidden"}})),H=a.forwardRef((function(e,t){var n=(0,y.Z)({props:e,name:"MuiCard"}),r=n.className,a=n.raised,d=void 0!==a&&a,c=(0,i.Z)(n,W),x=(0,s.Z)({},n,{raised:d}),h=function(e){var t=e.classes;return(0,l.Z)({root:["root"]},A,t)}(x);return(0,u.jsx)(R,(0,s.Z)({className:(0,o.Z)(h.root,r),elevation:d?8:void 0,ref:t,ownerState:x},c))}));function G(e){return(0,c.Z)("MuiCardContent",e)}(0,S.Z)("MuiCardContent",["root"]);var L=["className","component"],N=(0,b.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(){return{padding:16,"&:last-child":{paddingBottom:24}}})),D=a.forwardRef((function(e,t){var n=(0,y.Z)({props:e,name:"MuiCardContent"}),r=n.className,a=n.component,d=void 0===a?"div":a,c=(0,i.Z)(n,L),x=(0,s.Z)({},n,{component:d}),h=function(e){var t=e.classes;return(0,l.Z)({root:["root"]},G,t)}(x);return(0,u.jsx)(N,(0,s.Z)({as:d,className:(0,o.Z)(h.root,r),ownerState:x,ref:t},c))})),z=n(890),E=n(7689),O=function(e){var t=e.type,n=e.path,r=(0,E.s0)(),i=(0,P.Z)();return(0,u.jsx)(H,{sx:{background:"linear-gradient(to right bottom,".concat(i.palette.primary.light,",").concat(i.palette.primary.main,",").concat(i.palette.primary.dark," )"),textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",mb:1,width:"inherit",height:"inherit",minHeight:"130px"},onClick:function(){return r(n)},children:(0,u.jsx)(D,{sx:{overflow:"hidden",textOverflow:"ellipsis"},children:(0,u.jsx)(z.Z,{align:"inherit",sx:{typography:"h5",padding:"2px",wordWrap:"break-word"},component:"span",display:{xs:"none",sm:"block",md:"block"},children:null===t||void 0===t?void 0:t.toUpperCase()})})})},B=n(9201),T=(0,B.Z)((0,u.jsx)("path",{d:"M14 21c1.93 0 3.62-1.17 4-3l-1.75-.88C16 18.21 15.33 19 14 19H9.1c.83-1 1.5-2.34 1.5-4 0-.35-.03-.69-.08-1H14v-2H9.82C9 10.42 8 9.6 8 8c0-1.93 1.57-3.5 3.5-3.5 1.5 0 2.79.95 3.28 2.28L16.63 6c-.8-2.05-2.79-3.5-5.13-3.5C8.46 2.5 6 4.96 6 8c0 1.78.79 2.9 1.49 4H6v2h2.47c.08.31.13.64.13 1 0 2.7-2.6 4-2.6 4v2h8z"}),"CurrencyPound"),I=function(e){var t=e.children;return(0,u.jsx)(H,{sx:{display:"flex",alignItems:"start",width:"inherit",height:"inherit",minHeight:"120px",color:"primary.main"},children:(0,u.jsx)(D,{children:t})})},V=function(){return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(M.ZP,{item:!0,xs:12,sm:3,md:3,children:[(0,u.jsx)(T,{}),(0,u.jsx)(z.Z,{variant:"h2",sx:{textAlign:{md:"left",xs:"center"}},children:"Cost"}),(0,u.jsx)(z.Z,{variant:"body2",sx:{textAlign:{md:"left",xs:"center"}},children:"rollup"})]}),(0,u.jsx)(M.ZP,{item:!0,xs:12,sm:3,md:3,children:(0,u.jsx)(I,{children:(0,u.jsxs)(z.Z,{variant:"body2",sx:{textAlign:{md:"left",xs:"center"}},children:[(0,u.jsx)("strong",{children:"CAD Cost"}),(0,u.jsx)("br",{}),(0,u.jsx)("br",{}),"A mass calculated for the product within a PLM system"]})})}),(0,u.jsx)(M.ZP,{item:!0,xs:12,sm:3,md:3,children:(0,u.jsx)(I,{children:(0,u.jsxs)(z.Z,{variant:"body2",sx:{textAlign:{md:"left",xs:"center"}},children:[(0,u.jsx)("strong",{children:"Estimated Cost"}),(0,u.jsx)("br",{}),"Manually entered value that may account for additional material, such as oil or other fluids"]})})}),(0,u.jsx)(M.ZP,{item:!0,xs:12,sm:3,md:3,children:(0,u.jsx)(I,{children:(0,u.jsxs)(z.Z,{variant:"body2",sx:{textAlign:{md:"left",xs:"center"}},children:[(0,u.jsx)("strong",{children:"Real Cost"}),(0,u.jsx)("br",{}),(0,u.jsx)("br",{}),"A produced part that has been weighed on a physical scale"]})})})]})},F=(0,B.Z)((0,u.jsx)("path",{d:"M13 7.83c.85-.3 1.53-.98 1.83-1.83H18l-3 7c0 1.66 1.57 3 3.5 3s3.5-1.34 3.5-3l-3-7h2V4h-6.17c-.41-1.17-1.52-2-2.83-2s-2.42.83-2.83 2H3v2h2l-3 7c0 1.66 1.57 3 3.5 3S9 14.66 9 13L6 6h3.17c.3.85.98 1.53 1.83 1.83V19H2v2h20v-2h-9V7.83zM20.37 13h-3.74l1.87-4.36L20.37 13zm-13 0H3.63L5.5 8.64 7.37 13zM12 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"}),"Balance"),_=function(){return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(M.ZP,{item:!0,xs:12,sm:3,md:3,children:[(0,u.jsx)(F,{}),(0,u.jsx)(z.Z,{variant:"h2",sx:{textAlign:{md:"left",xs:"center"}},children:"Weight"}),(0,u.jsx)(z.Z,{variant:"body2",sx:{textAlign:{md:"left",xs:"center"}},children:"rollup"})]}),(0,u.jsx)(M.ZP,{item:!0,xs:12,sm:3,md:3,children:(0,u.jsx)(I,{children:(0,u.jsxs)(z.Z,{variant:"body2",sx:{textAlign:{md:"left",xs:"center"}},children:[(0,u.jsx)("strong",{children:"CAD Mass"}),(0,u.jsx)("br",{}),(0,u.jsx)("br",{}),"A mass calculated for the product within a PLM system"]})})}),(0,u.jsx)(M.ZP,{item:!0,xs:12,sm:3,md:3,children:(0,u.jsx)(I,{children:(0,u.jsxs)(z.Z,{variant:"body2",sx:{textAlign:{md:"left",xs:"center"}},children:[(0,u.jsx)("strong",{children:"Estimated Mass"}),(0,u.jsx)("br",{}),"Manually entered value that may account for additional material, such as oil or other fluids"]})})}),(0,u.jsx)(M.ZP,{item:!0,xs:12,sm:3,md:3,children:(0,u.jsx)(I,{children:(0,u.jsxs)(z.Z,{variant:"body2",sx:{textAlign:{md:"left",xs:"center"}},children:[(0,u.jsx)("strong",{children:"Real Mass"}),(0,u.jsx)("br",{}),(0,u.jsx)("br",{}),"A produced part that has been weighed on a physical scale"]})})})]})},J=n(4664),K=function(){return(0,u.jsxs)(z.Z,{variant:"h4",sx:{textDecoration:"underline"},display:"inline",children:["WELCOME,",(0,u.jsx)("br",{}),(0,u.jsx)("strong",{children:(0,J.Js)()})]})},U=n(8400),Y=n(3454),q=function(){var e=Y.vK.map((function(e){return(0,u.jsx)(O,{type:e,path:"/".concat(U.Z.TYPE,"/").concat(e)},e)}));return(0,u.jsx)(w,{maxWidth:"lg",sx:{height:"calc(100vh - 108px);"},children:(0,u.jsxs)(M.ZP,{container:!0,justifyContent:"space-between",alignItems:"stretch",sx:{mt:{md:"2rem",sm:"20px"}},rowGap:3,children:[(0,u.jsx)(M.ZP,{item:!0,md:3,sm:12,xs:12,alignSelf:"center",children:(0,u.jsx)(K,{})}),(0,u.jsx)(M.ZP,{item:!0,md:4,sm:12,xs:12,children:(0,u.jsx)(O,{type:U.Z.DASHBOARD,path:"/".concat(U.Z.DASHBOARD)})}),(0,u.jsx)(M.ZP,{item:!0,md:4,sm:12,xs:12,children:e}),(0,u.jsx)(M.ZP,{item:!0,md:12,xs:12,container:!0,justifySelf:"space-between",height:"inherit",sx:{mt:5},columnSpacing:3,children:(0,u.jsx)(V,{})}),(0,u.jsx)(M.ZP,{item:!0,md:12,xs:12,container:!0,justifySelf:"space-between",height:"inherit",sx:{mt:5},columnSpacing:3,children:(0,u.jsx)(_,{})})]})})}}}]);
//# sourceMappingURL=315.641ad623.chunk.js.map