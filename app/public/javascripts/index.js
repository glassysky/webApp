import Common from './common.js';

/*
formInfo 格式
fullName => 'string'
passWord => 'string'
stuID => 'string'
*/
$("#user-logout").on("click", function (event) {
    $.ajax({
        type: 'POST',
        url: '/users/logout',
        success: function (result) {
            if (result.state === "success") {
                window.location.href = "/signin"
            } else {
                alert("注销失败");
            }
        },
        error: function () {
            console.log("Ajax error!");
        }
    });
});

module.exports = {

}
