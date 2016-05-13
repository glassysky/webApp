import Common from './common.js';

function render (data) {
    location.reload();
}

$("#publish-button").on("click", function(event) {
    var body = $("#mood").val();

    $.ajax({
        url: '/news/publish',
        type: 'POST',
        data: {
            body: body
        },
        dataType: 'json',
        success: function (result) {
            if (result.state === "success") {
                // page update
                // pass id/name/content by result
                render(result);
                console.log(result.data);
            } else {
                console.log("failed");
            }
        },
        error: function () {
            console.log('Ajax error!');
        }
    });
});

module.exports = {

}
