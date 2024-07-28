const router = require('express').Router();
const { auth } = require('../utils/auth');
const { sendEmail, login } = require('../functions');

router.get('/test/email', auth, async (req, res) => {
    const subject = 'Test email';
    const body = 'This is a test email sent from the API';
    const recipients = ['everett.bazzocchi@skullspace.ca'];
    try {
        await sendEmail(subject, body, recipients);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email');
    }

}
);

router.post('/login', (req, res) => {
    console.log(req.body);
    login(req.body.username, req.body.password).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log(error);
        res.status(403).json({ error: error.message });
    }
    );

});

module.exports = router;
