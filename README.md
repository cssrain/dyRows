jquery.dyRows.js
======

##动态增加，删除，复制行

```javascript
//table1:
$("#tradeRecordsIndex").dyRow();
//table2:
$("#tradeRecordsIndex2").dyRow({
    addRowTemplateId: '#T-template',
    addRowButtonId: '#add-btn-2',
    lastRowRemovable: false,
    onRowRemove: function(){
        console.log('onRowRemove');
    },
    onRowClone: function(){
        console.log('onRowClone');
    },
    onRowAdd: function(){
        console.log('onRowAdd');
    },
    onTableEmpty: function(){ //当"lastRowRemovable"为true时才有效
        console.log('onTableEmpty');
    } 
});
```