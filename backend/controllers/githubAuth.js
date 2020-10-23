const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

async function getAccessToken(code) {
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;
    console.log('client_id', client_id);
    console.log('client_secret', client_secret);
    console.log('code', code);
    const request = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code
        })
    });
    const text = await request.text();
    const params = new URLSearchParams(text);
    return params.get('access_token');
}

async function fetchGitHubUser(token) {
    const request = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: 'token ' + token
        }
    });
    return await request.json();
}

module.exports = { getAccessToken, fetchGitHubUser };
