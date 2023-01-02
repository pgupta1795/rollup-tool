"use strict";(self.webpackChunkrollup_tool=self.webpackChunkrollup_tool||[]).push([[388,258],{258:function(e,o,n){n.r(o);var t=n(1413),a=n(5987),i=n(7122),l=n(3967),r=n(86),c=n(2791),s=n(4511),d=n(184),u=["loading","isSaving","tableData","columns","toolbar","save","cancel","onColumnsChange","initialState"],m=(0,c.memo)((function(e){var o=(0,l.Z)(),n=e.loading,c=e.isSaving,m=e.tableData,p=e.columns,v=e.toolbar,h=e.save,b=e.cancel,f=e.onColumnsChange,g=e.initialState,C=(0,a.Z)(e,u);return(0,d.jsx)(r.ZP,(0,t.Z)({state:{isLoading:n,showProgressBars:c},columns:p,data:m,memoMode:"cells",muiTableContainerProps:{sx:{minHeight:250}},muiTablePaperProps:{elevation:0},muiTableHeadCellProps:function(){return{sx:{fontWeight:"bold",background:"".concat(o.palette.divider)}}},filterFns:(0,t.Z)({},s.pF),globalFilterFn:"customGlobalSearch",enableColumnFilterModes:!0,enableColumnOrdering:!0,enableColumnResizing:!0,enableGrouping:!0,enablePinning:!0,enableRowActions:!0,enableRowSelection:!0,maxLeafRowFilterDepth:0,enableStickyHeader:!0,initialState:(0,t.Z)({},g),enableExpanding:!0,enableBottomToolbar:!0,renderTopToolbarCustomActions:v,enableEditing:!0,muiTableBodyCellEditTextFieldProps:function(e){return{onChange:function(o){f(e,o.target.value)}}},editingMode:"row",onEditingRowSave:h,onEditingRowCancel:b,displayColumnDefOptions:{"mrt-row-actions":{muiTableHeadCellProps:{align:"center"},size:100,header:(0,d.jsx)(i.Z,{})}},enableRowVirtualization:!0},C))}));m.defaultProps={loading:!1,isSaving:!1,toolbar:function(){},save:function(){console.log("SAVING ROW DATA")},cancel:function(){console.log("CANCEL ROW EDIT")},onColumnsChange:function(e,o){var n,t=e.column,a=e.row.original;console.log("Column ".concat(null===t||void 0===t||null===(n=t.columnDef)||void 0===n?void 0:n.header," is in edit mode for row ").concat(null===a||void 0===a?void 0:a.title," to newValue ").concat(o," "))},initialState:{showColumnFilters:!1,density:"compact",showGlobalFilter:!1,expanded:!0}},o.default=m},4454:function(e,o,n){n.d(o,{Z:function(){return R}});var t=n(4942),a=n(3366),i=n(7462),l=n(2791),r=n(8182),c=n(4419),s=n(2065),d=n(7278),u=n(9201),m=n(184),p=(0,u.Z)((0,m.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),v=(0,u.Z)((0,m.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),h=(0,u.Z)((0,m.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),b=n(4036),f=n(1402),g=n(6934),C=n(5878),Z=n(1217);function x(e){return(0,Z.Z)("MuiCheckbox",e)}var w=(0,C.Z)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),k=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],S=(0,g.ZP)(d.Z,{shouldForwardProp:function(e){return(0,g.FO)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,o){var n=e.ownerState;return[o.root,n.indeterminate&&o.indeterminate,"default"!==n.color&&o["color".concat((0,b.Z)(n.color))]]}})((function(e){var o,n=e.theme,a=e.ownerState;return(0,i.Z)({color:(n.vars||n).palette.text.secondary},!a.disableRipple&&{"&:hover":{backgroundColor:n.vars?"rgba(".concat("default"===a.color?n.vars.palette.action.activeChannel:n.vars.palette.primary.mainChannel," / ").concat(n.vars.palette.action.hoverOpacity,")"):(0,s.Fq)("default"===a.color?n.palette.action.active:n.palette[a.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==a.color&&(o={},(0,t.Z)(o,"&.".concat(w.checked,", &.").concat(w.indeterminate),{color:(n.vars||n).palette[a.color].main}),(0,t.Z)(o,"&.".concat(w.disabled),{color:(n.vars||n).palette.action.disabled}),o))})),z=(0,m.jsx)(v,{}),P=(0,m.jsx)(p,{}),y=(0,m.jsx)(h,{}),R=l.forwardRef((function(e,o){var n,t,s=(0,f.Z)({props:e,name:"MuiCheckbox"}),d=s.checkedIcon,u=void 0===d?z:d,p=s.color,v=void 0===p?"primary":p,h=s.icon,g=void 0===h?P:h,C=s.indeterminate,Z=void 0!==C&&C,w=s.indeterminateIcon,R=void 0===w?y:w,F=s.inputProps,M=s.size,j=void 0===M?"medium":M,T=s.className,E=(0,a.Z)(s,k),H=Z?R:g,A=Z?R:u,I=(0,i.Z)({},s,{color:v,indeterminate:Z,size:j}),L=function(e){var o=e.classes,n=e.indeterminate,t=e.color,a={root:["root",n&&"indeterminate","color".concat((0,b.Z)(t))]},l=(0,c.Z)(a,x,o);return(0,i.Z)({},o,l)}(I);return(0,m.jsx)(S,(0,i.Z)({type:"checkbox",inputProps:(0,i.Z)({"data-indeterminate":Z},F),icon:l.cloneElement(H,{fontSize:null!=(n=H.props.fontSize)?n:j}),checkedIcon:l.cloneElement(A,{fontSize:null!=(t=A.props.fontSize)?t:j}),ownerState:I,ref:o,className:(0,r.Z)(L.root,T)},E,{classes:L}))}))},7883:function(e,o,n){n(2791);var t=n(9201),a=n(184);o.Z=(0,t.Z)((0,a.jsx)("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft")},1883:function(e,o,n){n(2791);var t=n(9201),a=n(184);o.Z=(0,t.Z)((0,a.jsx)("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight")}}]);
//# sourceMappingURL=388.5ee3a24f.chunk.js.map