let modal = (function () {
    let $window = $(window);
    let overlay = $('<div class="overlay"/>')
    let $modal = $('<div class="modal"/>');
    let $content = $('<div class="modal-content"/>');
    let $close = $('<button></button>');

    overlay.append($modal);
    $modal.append($content, $close);

    overlay.css({
        background: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
        width: '100%',
        height: '100%',
    });

    $modal.css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 2000,
        borderRadius: '10px',
        background: '#fff',
        padding: '20px',
        color: '#333',
    });

    $close.css({
        padding: '14px 60px',
        color: '#fff',
        borderRadius: '8px',
        background: '#333',
        transition: '.25s',
        margin: '10px 0 0 0',
    });

    $close.on('click', function (evt) {
        evt.preventDefault();
        modal.close();
    });

    return {
        center: function () {
            let top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
            let left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;

            $modal.css({
                top: top + $window.scrollTop(),
                left: left + $window.scrollLeft()
            });
        },

        open: function (settings) {
            $content.empty().append(settings.content || 'Add content here');
            $close.text(settings.btnContent || 'close');

            $modal.css({
                width: settings.width || 'auto',
                height: settings.height || 'auto',
            });
            overlay.appendTo(settings.animationArea || 'body');
            if (settings.animationArea) {
                if (settings.animationArea.html() === undefined) {
                    overlay.appendTo('body');
                } else {
                    overlay.appendTo(settings.animationArea);
                }
            }

            $('.overlay').hide().fadeIn();
            modal.center();
            $window.on('resize', modal.center);
        },

        close: function () {
            $content.empty();
            overlay.detach();
            $(window).off('resize', modal.center);
        }
    };
}());