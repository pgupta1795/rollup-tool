"use strict";(self.webpackChunkrollup_tool=self.webpackChunkrollup_tool||[]).push([[258],{258:function(e,n,o){o.r(n);var l=o(1413),a=o(5987),i=o(7122),t=o(3967),r=o(86),s=o(2791),u=o(4511),c=o(184),d=["loading","isSaving","tableData","columns","toolbar","save","cancel","onColumnsChange","initialState"],b=(0,s.memo)((function(e){var n=(0,t.Z)(),o=e.loading,s=e.isSaving,b=e.tableData,g=e.columns,m=e.toolbar,C=e.save,p=e.cancel,f=e.onColumnsChange,v=e.initialState,h=(0,a.Z)(e,d);return(0,c.jsx)(r.ZP,(0,l.Z)({state:{isLoading:o,showProgressBars:s},columns:g,data:b,memoMode:"cells",muiTableContainerProps:{sx:{minHeight:250}},muiTablePaperProps:{elevation:0},muiTableHeadCellProps:function(){return{sx:{fontWeight:"bold",background:"".concat(n.palette.divider)}}},filterFns:(0,l.Z)({},u.pF),globalFilterFn:"customGlobalSearch",enableColumnFilterModes:!0,enableColumnOrdering:!0,enableColumnResizing:!0,enableGrouping:!0,enablePinning:!0,enableRowActions:!0,enableRowSelection:!0,maxLeafRowFilterDepth:0,enableStickyHeader:!0,initialState:(0,l.Z)({},v),enableExpanding:!0,enableBottomToolbar:!0,renderTopToolbarCustomActions:m,enableEditing:!0,muiTableBodyCellEditTextFieldProps:function(e){return{onChange:function(n){f(e,n.target.value)}}},editingMode:"row",onEditingRowSave:C,onEditingRowCancel:p,displayColumnDefOptions:{"mrt-row-actions":{muiTableHeadCellProps:{align:"center"},size:100,header:(0,c.jsx)(i.Z,{})}},enableRowVirtualization:!0},h))}));b.defaultProps={loading:!1,isSaving:!1,toolbar:function(){},save:function(){console.log("SAVING ROW DATA")},cancel:function(){console.log("CANCEL ROW EDIT")},onColumnsChange:function(e,n){var o,l=e.column,a=e.row.original;console.log("Column ".concat(null===l||void 0===l||null===(o=l.columnDef)||void 0===o?void 0:o.header," is in edit mode for row ").concat(null===a||void 0===a?void 0:a.title," to newValue ").concat(n," "))},initialState:{showColumnFilters:!1,density:"compact",showGlobalFilter:!1,expanded:!0}},n.default=b}}]);
//# sourceMappingURL=258.3500b324.chunk.js.map