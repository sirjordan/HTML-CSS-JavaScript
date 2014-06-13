
$(document).ready(function () {
    var height = 400,
        width = 400,
        slides = [],
        currentSlideIndex = 0;

    // The outter wrapper
    function createSlideWrapper(strParrentId) {
        var outter = $('#' + strParrentId);

        var wr = ($('<div>')
            .css({
                'width': width + 'px',
                'height': height + 'px',
                'border': '1px solid black',
                'padding': '5px',
            }));
        outter.append(wr);
        return wr;
    }

    // The wrapper of the image, text or watever put in the box
    function createSliderContainer(strParrentId) {
        var content = $('<div>')
            .attr('id', 'content')
            .css({
                'width': width + 'px',
                'height': width + 'px',
                'padding': '5px',
                'text-align': 'center'
            });

        strParrentId.append(content);
        return content;
    }

    function addNextBtn(cnt) {
        var nextBtn = $('<div>')
            .html('>>')
            .addClass('nextBtn');
        nextBtn.on('click', function () {
            currentSlideIndex++;
            if (currentSlideIndex >= slides.length) {
                currentSlideIndex = 0;
            }
            getSlideFromPath(slides[currentSlideIndex]);
        });
        cnt.append(nextBtn);
    }

    function addPrevBtn(cnt) {
        var prevBtn = $('<div>')
            .html('<<')
            .addClass('prevBtn');
        prevBtn.on('click', function () {
            currentSlideIndex--;
            if (currentSlideIndex < 0) {
                currentSlideIndex = slides.length - 1;
            }
            getSlideFromPath(slides[currentSlideIndex]);
        });
        cnt.append(prevBtn);
    }

    // Get ajax way the content of some file
    var getSlideFromPath = function (url) {
        $.get(url, function (data) {
            displaySlide(data)
        }, 'text');
    }

    // Display on the slider wrapper
    var displaySlide = function (content) {
        console.log(content);
        slideContainer.html(content);
    }

    // Initialize
    var slider = createSlideWrapper('wrapper');
    addPrevBtn(slider);
    addNextBtn(slider);
    var slideContainer = createSliderContainer(slider);


    // Hardcoded paths for the items
    slides.push('slides/slide1.html');
    slides.push('slides/slide2.html');
    slides.push('slides/slide3.html');

    // Show the first slide
    getSlideFromPath(slides[0]);

    // Get next slide
    function getNextSlide() {
        getSlideFromPath(slides[currentSlideIndex++]);
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }
    }

    // Get next image over 2 secs
    setInterval(getNextSlide, 2000);
});
