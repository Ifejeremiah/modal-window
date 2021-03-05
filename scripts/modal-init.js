$(function () {
    let content = '<h1>Live scores</h1>';
    let msg = 'Leave live scores';
    let $main = $('.main .container');

    $('.tweet button').on('click', function () { modal.open({ content: content, btnContent: msg, animationArea: $main }) });
});