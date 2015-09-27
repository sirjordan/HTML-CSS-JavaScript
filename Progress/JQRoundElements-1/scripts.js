(function($) {
    $.fn.roundElements = function(width, height) {
        var $container = $(this);
        var imageWidth = width / 6,
            imageHeight = height / 6,
            centerX = width / 2,
            centerY = height / 2,
            padding = 10,
            radius = width / 2 - padding,
            angle = 0,
            step;

        var $images = $container.find('img');
        step = (2 * Math.PI)/ $images.length;
        $images.each(function(index, value){
            var $img = $(value);
            var x = Math.round(centerX + radius * Math.cos(angle) ),
                y = Math.round(centerY + radius * Math.sin(angle) );

            $img.width(imageWidth)
                .height(imageHeight)
                .css({
                    position: "absolute",
                    top: y,
                    left: x,
                })
                .appendTo('body');

            angle += step;
        });
    }
}(jQuery));

$(document).ready(function(){
    $('#cats').roundElements(500, 500);
});
