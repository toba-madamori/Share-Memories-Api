const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({ 
    service:'hotmail',
    auth:{
        user:'tobajamezmadamori@outlook.com',
        pass: '555777toba'
    }
})

// const options = {
//     from:'tobajamezmadamori@outlook.com',
//     to:'tobajamezmadamori@gmail.com',
//     subject:'testing email sending with nodemailer',
//     text:'lets see how this goes',
// }

// transporter.sendMail(options, (err,info)=>{
//     if(err){
//         console.log(err)
//         return;
//     }
//     console.log(info.response);
// })

module.exports = transporter;