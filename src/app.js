const sendmail = require('sendmail')();

function sendMail(action) {
    return new Promise(function (resolve, reject) {
        var execString = action.method.actionString;
        sendmail({
            from: 'notifier@productionmap.com',
            to: action.params.TO,
            replyTo: action.params.SENDER,
            subject: action.params.SUBJECT,
            html: action.params.BODY
        }, function (err, reply) {
            if (err) {
                return reject(err);
            }
            return resolve(reply);
        });
    });
}


var functions = {
    mail: sendMail
};

function main(argv) {
    if (argv.length < 3) {
        console.log('{err: "not enough parameters"}');
        // Invalid Argument - Either an unknown option was specified, or an option requiring a value was provided without a value.
        process.exit(9);
    }
    var action = JSON.parse(argv[2]);
    functions[action.method.name](action).then(function (res) {
        console.log(res);
        process.exit(0); // Success
    }).catch(function (error) {
        console.log("Error sending mail", error);
        // Uncaught Fatal Exception - There was an uncaught exception, and it was not handled by a domain or an 'uncaughtException' event handler.
        process.exit(1);
    });
}

main(process.argv);