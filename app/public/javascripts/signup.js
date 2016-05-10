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
    console.log(formInfo);
    return formInfo;
}

var sendPost = () => {
    $.ajax({
        type: 'POST',
        url: '/add/user',
        data: {},
        dataType: 'json',
        success: function(data) {
            if (data.message === "success") {
                console.log("success");
            } else {
                console.log("failed");
            }
        },
        error: function(){
            console.log("Ajax error!");
        }
    });
}

$("#sign-up-button").on("click", function(event) {
    getSignUpInfo();
    sendPost();
});

module.exports = {

}
