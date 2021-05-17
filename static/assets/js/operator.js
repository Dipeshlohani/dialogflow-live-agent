$(function () {
    var socket = io('http://localhost:8000/operator');
    // UI elements for all the customers we currently aware of
    var connectedCustomers = {};
    // Pointer to the currently open tab
    var currentTab;
    // The format we use to communicate a message to a specific customer
    var messageObject = function (customerId, utterance) {
        console.log(customerId, utterance, '=========utterance=========')
        return { customerId: customerId, utterance: utterance };
    };
    // When the form is submitted, send an operator message to the server, referencing
    // the current tab's customer
    $('form').submit(function (e) {
        e.preventDefault();
        if (currentTab ? currentTab.disconnected : currentTab) {
            alert('This customer has disconnected');
            return false;
        }
        var messageText = $('#m').val();
        socket.emit('operator message', messageObject(currentTab.customerId, messageText));
        $('#m').val('');
        return false;
    });
    // Switch to a different tab
    var setCurrentTab = function (target) {
        // Do nothing if this is already the current tab
        if (currentTab === target) return;
        // Set the current tab
        currentTab = target;
        // Remove any other selected tab
        $('li.chat-tab').removeClass('selected');
        // Mark this tab as selected
        target.tab.addClass('selected');
        // Hide any other chat windows
        $('.chat-window').hide();
        // Show this chat window
        target.window.show();
    };

    // Create a set of UI elements for a new customer tab.
    // The customerId is the ID used internally by for websocket communication.
    // In your implementation, you could replace this with the customer's name
    // after fetching it from your datastore.
    var createNewCustomerTab = function (customerId) {
        alert(customerId, '----HERE BABY----');

        var newChatElements = {};
        newChatElements.customerId = customerId;
        // A tab displaying the customer id
        newChatElements.tab = $('<li class="chat-tab col s12">').text(customerId);
        // The chat log for this customer
        newChatElements.window = $('<ul class="chat-window">').hide();
        var clickHandler = function () {
            setCurrentTab(newChatElements);
        };
        newChatElements.tab.click(clickHandler);
        connectedCustomers[customerId] = newChatElements;
        if (!currentTab) {
            console.log('Setting current tab');
            clickHandler();
        }
        $('#chatTabs').append(newChatElements.tab);
        $('#chatWindows').append(newChatElements.window);
    };
    // Notify the operator that a customer has requested them
    var notifyOperatorRequest = function (customerId) {
        if (!connectedCustomers[customerId]) {
            console.log('Received operator request from unknown customer id: ' + customerId);
            return;
        }
        setCurrentTab(connectedCustomers[customerId]);
        alert('Operator requested!');
    };
    // Notify the operator that a customer has disconnected
    var notifyCustomerDisconnected = function (customerId) {
        if (!connectedCustomers[customerId]) {
            console.log('Received disconnect notification for unknown customer id: ' + customerId);
            return;
        }
        connectedCustomers[customerId].disconnected = true;
        connectedCustomers[customerId]
            .window
            .append($('<li class="customer-message">')
                .text('--- Customer disconnected ---'));
    };
    // Notify the operator of a system error
    var notifySystemError = function (error) {
        var errorText;
        // If we get this custom error type, the error was due to an operator mistake; display it
        // in a friendlier manner (without the word 'Error')
        if (error.type === 'CustomerModeError') {
            errorText = error.message;
            // Otherwise, print the error type and message
        } else {
            errorText = error.type + ' - ' + error.message;
        }
        console.log(errorText);
        if (!currentTab) return;
        currentTab.window.append($('<li class="operator-error collection-item">').text(errorText));
    };
    // Display messages sent by any operator to the customers this operator knows about
    var receivedOperatorMessage = function (msg) {
        var customer = connectedCustomers[msg.customerId];
        if (!customer) {
            console.log('Received operator message to unknown customer id: ' + JSON.stringify(msg));
            return;
        }
        customer.window
            .append($('<li class="operator-message collection-item">').text(msg.utterance));
    };
    // Display messages sent by customers
    var receivedCustomerMessage = function (msg) {
        console.log("---here- >>>>>>", msg)
        if (!connectedCustomers[msg.customerId]) {
            console.log('Received message for unknown customer id: ' + JSON.stringify(msg));
            return;
        }
        // If your implementation has access to the customer's name,
        // you can modify the next line to display it in the prefix.
        var prefix = msg.isAgentResponse ? 'Agent: ' : 'Customer: ';
        prefix = "Robin Sams";
        connectedCustomers[msg.customerId]
            .window
            .append($('<li class="customer-message"><br/>')
                .toggleClass('agent-response', msg.isAgentResponse)
                .text(prefix + msg.utterance));
    };
    // Attach all our event handlers
    socket.on('customer connected', createNewCustomerTab);
    socket.on('customer message', receivedCustomerMessage);
    socket.on('operator requested', notifyOperatorRequest);
    socket.on('operator message', receivedOperatorMessage);
    socket.on('customer disconnected', notifyCustomerDisconnected);
    socket.on('system error', notifySystemError);
});