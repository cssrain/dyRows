/*
    根据表格生成json字符串,传递给后台
    依赖于json2.js
*/
;(function($){
    $.fn.extend({
        "tableData":function(options){
            options=$.extend({
                item: "options"
            },options);
            var newArray = [];
            var _self = this;
            _self.each(function(){
				newArray.push( $(this).data( options.item ) );
			});
            return JSON.stringify(newArray);
        }
    });
})(jQuery);