const auth0Config = {
    domain: 'gcichosz.eu.auth0.com',
    audience: 'https://slowslothbudget.com',
    clientID: 'vppUCGMJpkRQ1Wu2yCl8KhZmiru2bdgT',
    redirectUri: `${window.location.origin}/callback`,
    responseType: 'token id_token'
};

const displayFormats = {
    dateFormat: "DD.MM.YYYY"
};

export { auth0Config, displayFormats };
