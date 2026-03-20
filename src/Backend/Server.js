import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Root endpoint за тест
app.get('/', (req, res) => {
    res.send('Backend server is running ✅');
});

// Endpoint за exchange code -> access token
app.post('/auth/token', async (req, res) => {
    const code = req.body.code;
    if (!code) return res.status(400).json({error: 'Missing code'});

    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', REDIRECT_URI);

        const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Example: get user top tracks
app.get('/me/top-tracks', async (req, res) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    if (!access_token) return res.status(400).json({error: 'Missing token'});

    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            headers: { 'Authorization': `Bearer ${access_token}` }
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.listen(8001, () => console.log('Server running on http://localhost:8001'));