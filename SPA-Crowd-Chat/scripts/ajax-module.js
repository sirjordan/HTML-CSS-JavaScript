/// <reference path="controler.js" />
var request = (function ($) {
    var requestURL = 'http://crowd-chat.herokuapp.com/posts';

    var getPosts = function () {
        return $.ajax({
            url: requestURL,
            type: 'GET',
            success: function (data) {
                if (data) {
                    return data;
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    var postMSG = function (user, msg) {
        return $.ajax({
            url: requestURL,
            type: 'POST',
            data: { 'user': user, 'text': msg },
            success: function (data) {
                // nothing
            },
            error: function (err) {
                if (err) {
                    console.log(err);
                }
            }
        });
    }

    return {
        getPosts: getPosts,
        postMSG: postMSG
    };
})(jQuery);
