import Common from './common.js';

/*
formInfo 格式
fullName => 'string'
passWord => 'string'
stuID => 'string'
*/

var getSignUpInfo = () => {
    let formInfo = {};
    $("form").find("input").each(function(){
        let id = $(this).attr("id");
        let attr = Common.transformIntoCamelCase(id);
        formInfo[attr] = $(this).val();
    });
    return formInfo;
}

var sendPost = (data) => {
    $.ajax({
        type: 'POST',
        url: '/users/add',
        data: data,
        dataType: 'json',
        success: function(res) {
            if (res.state === "success") {
                // registe successful
                // session
                console.log("注册成功");
                window.location.href = "/";
            } else {
                console.log(res.data);
            }
        },
        error: function(){
            console.log("Ajax error!");
        }
    });
}

$("#sign-up-button").on("click", function(event) {
    var formInfo = getSignUpInfo();

    sendPost(formInfo);
});

module.exports = {

}
