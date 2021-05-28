$(function () {
    var socket = io('http://localhost:8000/customer');

    // When the form is submitted, send a customer message to the server
    $('form').submit(function (e) {
        e.preventDefault();
        var messageText = $('#m').val();
        $('.chating_content ul').append(`
       <li class="right_chat_items">
                        <div class="right_chat_text">
                            <p>${messageText}</p>
                        </div>
                    </li>
        `);
        $("#scroll").scrollTop($("#scroll")[0].scrollHeight);
        socket.emit('customer message', messageText);
        $('#m').val('');
        return false;
    });

    socket.on('customer message', function (msg) {
        //if (msg.length > 37) {
        //     let arr = msg.match(/.{1,37}(\s|$)/g);
        //    msg = arr.join("</br>");
        // }
        let date = new Date();
        let min = date.getMinutes().length > 1 ? `0 ${date.getMinutes()}` : date.getMinutes();
        let hour = date.getMinutes().length > 1 ? `0 ${date.getMinutes()}` : date.getMinutes() ? date.getHours() % 12 || 12 : date.getHours();
        let time = hour + ":" + min;
        $('.chating_content ul').append(`  <li class="left_chat_items">
                        <div class="left_chat_text">
                            <p>${msg}</p>
                        </div>
                    </li>`);
    });

    // When we receive a system error, display it
    socket.on('system error', function (error) {
        var errorText = error.type + ' - ' + error.message;
        console.log(errorText);
        $('.chating_content ul').append($('<li class="customer-error collection-item">').text(errorText));
    });
});