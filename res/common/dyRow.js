/*
    表格动态添加，删除，复制行
*/

;(function($) {
    $.fn.extend({
        dyRow : function(options) {
            
            var defaults = {
                removeClass: '.row-remover',
                cloneClass: '.row-cloner',
                addRowTemplateId: '#add-template',
                addRowButtonId: '#add-row',
                lastRowRemovable: false,  //是否允许删除最后一条
                onRowRemove: function(){},
                onRowClone: function(){},
                onRowAdd: function(){},
                onTableEmpty: function(){}
            };     
            
            options = $.extend(defaults, options);

            var insertRow = function(clonedRow, tbod) {                  
                $(tbod).append( clonedRow );
            }
            var cloneRow = function(btn) {
                var clonedRow = $(btn).closest('tr').clone();  
                var tbod = $(btn).closest('tbody');
                insertRow(clonedRow, tbod); 
                options.onRowClone();
            }
            var removeRow = function(btn) {
                var tbod = $(btn).closest('tbody');
                var numRows = $(tbod).children("tr").length;
                if(numRows > 1 || options.lastRowRemovable === true) {
                    var trToRemove = $(btn).closest('tr');
                    $(trToRemove).fadeOut("fast" , function() {
                        $(trToRemove).remove();
                        options.onRowRemove();
                        if(numRows == 1) {
                            options.onTableEmpty();
                        }
                    });
                }                            
            }
            return this.each(function() {
                if(this.nodeName.toLowerCase() == 'table') {                                
                    var table = $(this);                        
                    $(options.addRowButtonId).click(function(){
                        var newTr = $(options.addRowTemplateId).val();
                        var tbody = $(table).children("tbody").first();
                        insertRow(newTr, tbody);
                        options.onRowAdd();
                        return false;
                    });
                    $(table).on("click", options.cloneClass ,function(){
                        var btn = this;
                        cloneRow(btn);
                    });
                    $(table).on("click", options.removeClass ,function(){
                        var btn = this;
                        removeRow(btn);
                    });
                }
            })
        },
        _updateSortNum: function() {
            var rownum = 1;
            $.each($("td.rownum", this), function(i, n) {
                $(n).html(rownum++);
            });
        },
        getTableObj: function() { //获取所有对象
            var arr = new Array();
            $("tbody tr", this).each(function() {
                var obj = $(this)._getRowObj();
                arr.push(obj);
            });
            return arr;
        },
        _getRowObj: function() { //获取每个对象
            var obj = {};
            $("[property]", this).each(function() {
                var property = $(this).attr("property");
                var v = $(this)._getValue();
                obj[property] = v;
            });
            return obj;
        },
        _getValue: function() {
            var v = "";
            var property = $(this).attr("property");
            if(property != "") {
                if($(this).is("input:checkbox")){
                    var cv = new Array();
                    $(":checked", $(this).parent()).each(function() {
                        cv.push($(this).val());
                    });
                    v = cv.join(",");
                }else if($(this).is("input:radio")){
                    //实际使用中，尽量避免radio，可以使用select来代替
                    var grounp = $(this).attr("name");
                    v = $("input[name='"+grounp+"']:checked", $(this).parent()).val();
                    if (v == undefined) {
                        v = "";
                    }
                }else if(this[0].tagName.toLowerCase() == "input" || this[0].tagName.toLowerCase() == "textarea"){
                    v = $(this).val();
                }else if(this[0].tagName.toLowerCase() == "select") {
                    v = $("option:selected", this).val();
                    if (v == "") {
                        v = $("option:selected", this).text();
                    }
                }else if (this[0].tagName.toLowerCase() == "label" || this[0].tagName.toLowerCase() == "td"){
                    v = $(this).text();
                }
            }
            return v;
        }

    })
})(jQuery);