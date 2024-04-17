const { Client } = require('@microsoft/microsoft-graph-client');
const config = require('../config/config.js');
const { TokenCredentialAuthenticationProvider } = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
const { ClientSecretCredential } = require("@azure/identity");
require("isomorphic-fetch");

const credential = new ClientSecretCredential(config.graph.tenantId, config.graph.clientId, config.graph.clientSecret);
const authProvider = new TokenCredentialAuthenticationProvider(credential, { scopes: [config.graph.scopes] });
const client = Client.initWithMiddleware({
    debugLogging: true,
    authProvider,
});

const staffController = require('../controllers/staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
    login: async (username, password) => {
        try {
            const getUser = await fetch(`http://localhost:5000/api/staff/username/${username}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'login': 'loginXASFWE',
                    }

                });
            var user = await getUser.json();
            console.log(user)
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ username: user.username, role: user.role }, config.setup.secret);
            console.log('User logged in:', user.username);
            return token;

        } catch (error) {
            console.error('Error logging in:', error);
            throw new Error('Invalid username or password');
        }
    },

    sendEmail: async (subject, body, recipients) => {
        try {
            const sendMail = {
                message: {
                    subject: subject,
                    body: {
                        contentType: 'Text',
                        content: body
                    },
                    toRecipients: recipients.map((email) => ({ emailAddress: { address: email } }))
                },
                saveToSentItems: 'true'
            };
            await client.api('/users/ebazzocchi@shotty.tech/sendMail')
                .post(sendMail);

            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

};
