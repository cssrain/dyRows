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
        }
    })
})(jQuery);