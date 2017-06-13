$(document).ready(function () {
    alignCardHeader();
    $(window).on("resize", alignCardHeader);

    function alignCardHeader() {
        var cardHeaders = $(".card-header");
        $(cardHeaders).height('auto');
        var arrayHeigts = [];
        $(cardHeaders).each(function () {
            arrayHeigts.push($(this).height());
        });
        maxHeight = Math.max.apply(null, arrayHeigts);
        $(cardHeaders).height(maxHeight);
    }
});