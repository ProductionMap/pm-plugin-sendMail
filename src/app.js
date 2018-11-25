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


module.exports = {
    mail: sendMail
};