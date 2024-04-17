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

module.exports = {
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
