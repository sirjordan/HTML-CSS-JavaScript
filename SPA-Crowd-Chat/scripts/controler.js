/// <reference path="ajax-module.js" />
var controler = (function () {
    var app = function (container) {
        return Sammy(container, function () {
            this.get('#/home', function () {
                // Load the chat container
                $.get('views/send-msg-container.html', function (content) {
                    $(container).html(content);
                })
                .then(function () {
                    // Attach functionality
                    var $user = $('#username'),
                        $sendMsg = $('#send-msg-btn'),
                        $msg = $('#msg');

                    $sendMsg.on('click', function () {
                        request.postMSG($user.val(), $msg.val())
                            .then(function () {
                                request.getPosts()
                                    .then(function (data) {
                                        // Refresh all posts after posting
                                        displayPosts('#leatest-posts', data, 10);
                                        $msg.val('');
                                    });
                            });
                    });

                    // Make the navigation button selected
                    $('#navigation')
                        .find('div')
                        .removeClass('selected-tab');
                    $('#home-btn').addClass('selected-tab');

                    // Get last 10 posts
                    request.getPosts()
                        .then(function (data) {
                            displayPosts('#leatest-posts', data, 10);
                        });
                });
            });

            this.get('#/allPosts', function () {
                $.get('views/all-posts.html', function (content) {
                    $(container).html(content);
                });

                // Make the navigation button selected
                $('#navigation')
                    .find('div')
                    .removeClass('selected-tab');
                $('#all-posts-btn').addClass('selected-tab');

                // Get all posts 
                request.getPosts()
                    .then(function (data) {
                        displayPosts('#all-posts', data);
                    });
            })
        });
    };

    function displayPosts(container, posts, count) {
        var $container = $(container).html('<h4>Leatest posts:</h4>');
        count = count || posts.length;
        // in reverce way, to show the most newer upper
        for (var i = posts.length - 1; i >= posts.length - count; i--) {
            var post = $('<div>')
                .addClass('post')
                .html("[" + posts[i].by + "] said: " + posts[i].text);
            $container.append(post);
        }
    }

    return { app: app };
})();
