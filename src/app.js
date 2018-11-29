const nodemailer = require('nodemailer');


function _send(transporter, action){
    return new Promise((resolve,reject) => {      
        let mailOptions = {
            from: action.params.FROM, 
            to: action.params.TO, 
            cc: action.params.CC,
            bcc: action.params.BCC,
            subject: action.params.SUBJECT, 
            text: action.params.TEXT, 
            html: action.params.HTML 
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    })
}

function sendMailByService(action){
        let transporter = nodemailer.createTransport({
            service:action.params.SERVICE,
            auth: {
                user: action.params.USERNAME, 
                pass: action.params.PASSWORD 
            }
        });
    
    return _send(transporter, action);    
    
}
function sendMailBySMTP(action){
        let transporter = nodemailer.createTransport({
            host:action.params.HOST,
            port:action.params.PORT,
            secure: (action.params.PORT == 465) ? true:false,
            auth: {
                user: action.params.USERNAME, 
                pass: action.params.PASSWORD 
            }
        });

        return _send(transporter, action);
}

module.exports = {
    sendMailByService:sendMailByService,
    sendMailBySMTP:sendMailBySMTP
}
