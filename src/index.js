import "expose-loader?$!jquery";
import './sayHello.js';
$(function () {
    $("#btn-alert").click(function () {
        alert("alert弹出")
    });
    $('#btn-layer').click(function () {
        $(this).sayHello()
    });
});