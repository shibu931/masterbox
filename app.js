const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
app.use(express.static('public'));


app.get('/', async (req, res) => {
    try {
        const androidId ='1234567890abcdef'
        const response = await axios.get(`https://toolbox-pro.in/?androidId=${androidId}`);
        let updatedText = response.data.replace("https://t.me/+lg937q0Qkd0yZjVl?blank=true", "https://t.me/boost/masterbox_pro");
         updatedText = updatedText.replace("@toolbox_pro", "@masterbox_pro");
         updatedText = updatedText.replace("user_count_data.json?v=", "user_count_data?v=");
        const $ = cheerio.load(updatedText);
        const originalUrl = '/api/data'
        $('script').each((i, el) => {
            const scriptContent = $(el).html();

            if (scriptContent && scriptContent.includes('$.ajax')) {
                const updatedScript = scriptContent.replace(/url:\s*['"]\.\/['"]/g, `url: '${originalUrl}/'`);
                $(el).html(updatedScript);
            }
        });
        res.send($.html());
    } catch (error) {
        console.log(error);
        
        res.status(500).send('Error fetching content');
    }
});

app.get('/api/data', async (req, res) => {
    const { androidId, projects } = req.query; // Extract query parameters from the request
    
    if (!androidId || projects === undefined) {
        return res.status(400).json({ status: 'error', message: 'Invalid or missing parameters' });
    }

    try {
        const response = await axios.get('https://toolbox-pro.in', {
            params: {
                androidId: androidId,
                projects: projects
            }
        });
        response.data.projects.forEach(element => {
            if(element.name ==='in999') element.invitation_link ='https://in000.in/#/register?invitationCode=46776342898'
            if(element.name ==='55club') element.invitation_link ='https://in000.in/#/register?invitationCode=34655523948'
        });
        
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.send(JSON.stringify(response.data));
    } catch (error) {
        console.error('Error fetching data:', error.message);

        res.status(500).json({ status: 'error', message: 'Error fetching data' });
    }
});

app.get('/user_count_data', async (req, res) => {
    const { v } = req.query;
    try {
        const response = await fetch(`https://toolbox-pro.in/user_count_data.json?v=${v}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching user count from proxy:', error);
        res.status(500).json({ error: 'Failed to fetch user count data' });
    }
});

app.listen(3000, () => console.log('Proxy server running on http://localhost:3000'));
