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

function render (result) {
    var $newsList = $("#news-list"),
        html = "",
        data = result.data;

    console.log(data);
    for (var i = 0; i < data.length; i++) {
        html += '<div class="news-item"> \
                    <div class="author"> \
                        <span class="name">' + data[i].fullName + '</span> \
                        <span class="date">' + formatDate(data[i].date) + '</span> \
                    </div> \
                    <div class="content"> \
                        <p>' + data[i].body + '</p> \
                    </div> \
                </div>';
    }

    $newsList.html(html);
}

function getNewsList () {
    $.ajax({
        type: 'POST',
        url: '/news/show',
        success: function (result) {
            render(result);
        },
        error: function () {
            console.log('Ajax error!');
        }
    });
}

function formatDate (date) {
    var newDate = new Date(date),
        year = newDate.getFullYear(),
        month = newDate.getMonth() + 1,
        day = newDate.getDate();

    return year + '/' + month + '/' + day;
}

getNewsList();

module.exports = {

}
