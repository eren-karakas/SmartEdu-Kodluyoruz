const nodemailer = require('nodemailer');

const getIndexPage = (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
};

const getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

const getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

const getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

const getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

const sendEmail = async (req, res) => {
  
  try{
    const outputMessage = `
      <h1> Mail Details </h1>
      <ul>
        <li> Name : ${req.body.name} </li>
        <li> Email : ${req.body.email} </li>
      </ul>
      <h1> Message </h1>
      <p> ${req.body.message} </p>
    `

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "ek.erenkarakas@gmail.com", // gmail account
        pass: "mavodriumffypsfm111", // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart EDU Contact Form" <ek.erenkarakas@gmail.com>', // sender address 
      to: "karakaseren.ek@gmail.com", // list of receivers
      subject: `Smart EDU Contact Form New Message from ${req.body.name}`, // Subject line
      html: outputMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', "We Received Your Message Succesfully");

    res.status(200).redirect('contact')
  } catch (err){
    req.flash('error', `Something Happened!`);
    res.status(200).redirect('contact');
  }
};

module.exports = {
  getIndexPage,
  getAboutPage,
  getRegisterPage,
  getLoginPage,
  getContactPage,
  sendEmail
};
