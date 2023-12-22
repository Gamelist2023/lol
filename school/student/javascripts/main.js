/**
 * Created with IntelliJ IDEA.
 * User: takeo
 * Date: 2012/12/27
 * Time: 18:03
 * To change this template use File | Settings | File Templates.
 */



$(function () {
    $("a[rel='popover']").popover({
        offset: 10
    });
    $("a[rel='popover']").on('click', function (e) {
        e.preventDefault();
        return true;
    });
});
