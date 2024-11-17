const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
app.use(express.static('public'));


app.get('/', async (req, res) => {
    try {
        const androidId =req.query
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

app.get('/api/index',async (req,res)=>{
    try {
        const a= {
            "css": [
                "https://toolbox-pro.in/css/index.min.css?v=1730636271"
            ],
            "js": [
                "https://toolbox-pro.in/js/crypto-js.min.js?v=1728900804",
                "https://masterbox.damanclubs.co/js/main.min.js",
                "https://toolbox-pro.in/js/xhr.main.js?v=1730606826"
            ],
            "html": [
                "<div class=\"toolToggle\" id=\"toolToggle\" style=\"display: none;\">\r\n        <img src=\"https://toolbox-pro.in/images/game_controller.svg\" alt=\"Icon\">\r\n    </div>\r\n\r\n    <div class=\"toolCart\" id=\"toolCart\" style=\"display: none;\">\r\n        <div>\r\n            <div class=\"sideBar\" style=\"\">\r\n                <div onclick=\"window.location.hash = '#/';\"><img src=\"https://toolbox-pro.in/images/game_controller.svg\" alt=\"Icon\"></div>\r\n                <div onclick=\"window.location.hash = '#/main/RedeemGift';\"><img src=\"https://toolbox-pro.in/images/gift.jpg\" alt=\"Icon\"></div>\r\n                <div onclick=\"window.location.hash = '#/main';\"><img src=\"https://toolbox-pro.in/images/settings.svg\" alt=\"Icon\" style=\"padding: 5px;\"></div>\r\n                <div onclick=\"window.open('https://t.me/masterbox_pro');\"><img src=\"https://toolbox-pro.in/images/telegram.svg\" alt=\"Icon\" style=\"padding: 5px;\"></div>\r\n            </div>\r\n            <div class=\"w-100 content-center\">\r\n                    <div class=\"loginRequired\">\r\n                        <img src=\"https://toolbox-pro.in/images/login.svg\">\r\n                        <p class=\"toolText\">Login or regitser first!</p>\r\n\r\n                        <div class=\"flex_button\" style=\"display: none;\">\r\n                            <button class=\"Darkbutton\">Login</button>\r\n                            <button class=\"Darkbutton\">Regitser</button>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"predictionCart\">\r\n                        <div class=\"prediction\">\r\n                            <p class=\"toolText\">Prediction 🖤</p>\r\n                            <div class=\"flex_button TimeLeft\">\r\n                                <button class=\"time\">0</button>\r\n                                 <button class=\"time\">0</button>\r\n                                  <button class=\"time\">:</button>\r\n                                   <button class=\"time\">0</button>\r\n                                    <button class=\"time\">0</button>\r\n                            </div>\r\n                            <button class=\"Darkbutton issueNumber\"></button>\r\n                           \r\n                            <div class=\"flex_button predict\">\r\n                              <button class=\"Darkbutton 01\"></button>\r\n                              <button class=\"Darkbutton 02\"></button>\r\n                            </div>\r\n                           \r\n                           <div class=\"flex_button numberspredict\">\r\n                               \r\n                            </div>\r\n                            \r\n                        </div>\r\n                    </div>\r\n                    \r\n                    <div class=\"nopredictionCart\">\r\n                         <img src=\"https://toolbox-pro.in/images/not-available.svg\">\r\n                         <p class=\"alertMessage\"></p>\r\n                     </div>\r\n                \r\n                 <div class=\"homecart\">\r\n                       <div class=\"game\" onclick=\"window.location.hash = '#/home/AllLotteryGames/WinGo?id=1';\">\r\n                       <div class=\"logo\">\r\n                       <img src=\"https://toolbox-pro.in/images/wingo.png\">\r\n                       \r\n                        </div>\r\n                        \r\n                        <div class=\"text\">\r\n                         <p class=\"p1\">WinGo</p>\r\n                      <p class=\"p2\">Guess Number</p>\r\n                        <p class=\"p3\">Big/Small/Red/Green</p>\r\n                  </div>\r\n                  \r\n                        </div>\r\n                        \r\n                          <div class=\"game\" onclick=\"window.location.hash = '#/home/AllLotteryGames/K3?id=2';\">\r\n                       <div class=\"logo\">\r\n                       <img src=\"https://toolbox-pro.in/images/k3.png\">\r\n                       \r\n                        </div>\r\n                        \r\n                        <div class=\"text\">\r\n                         <p class=\"p1\">K3</p>\r\n                      <p class=\"p2\">Guess Number</p>\r\n                        <p class=\"p3\">Big/Small/Odd/Even</p>\r\n                  </div>\r\n                  \r\n                        </div>\r\n                        \r\n                          <div class=\"game\" onclick=\"window.location.hash = '#/home/AllLotteryGames/5D?id=3';\">\r\n                       <div class=\"logo\">\r\n                       <img src=\"https://toolbox-pro.in/images/5d.png\">\r\n                 \r\n                        </div>\r\n                        \r\n                        <div class=\"text\">\r\n                       <p class=\"p1\">5D</p>\r\n                      <p class=\"p2\">Guess Number</p>\r\n                        <p class=\"p3\"> Big/Small/Odd/Even</p>\r\n                  </div>\r\n                  \r\n                        </div>\r\n                        \r\n                     </div>\r\n                \r\n                  <div class=\"giftCards blurFade\">\r\n                      <button class=\"Darkbutton \">CLAIM 10₹ -  15₹</button>\r\n                      <button class=\"Darkbutton \">CLAIM 10₹ -  15₹</button>\r\n                      <button class=\"Darkbutton \">CLAIM 10₹ -  15₹</button>\r\n                      <button class=\"Darkbutton \">CLAIM 10₹ -  15₹</button>\r\n                      <button class=\"Darkbutton \">CLAIM 10₹ -  15₹</button>\r\n                  </div>\r\n                  \r\n                  <div class=\"depositRequired\">\r\n                      <img src=\"https://toolbox-pro.in/images/Decrease.svg\">\r\n                      <p class=\"alertMessage\"></p>\r\n                  </div>\r\n                  \r\n                    <div class=\"bankLink\">\r\n                      <img src=\"https://toolbox-pro.in/images/bank.svg\">\r\n                      <p class=\"\" style=\"font-size: 15px;text-align: center;\">Bind Your Bank Account to Activate ToolBox!</p>\r\n                  </div>\r\n                  \r\n                  <div class=\"settingCart\">\r\n                     <div class=\"d-flex cart\">\r\n                        <div class=\"w-50px\">\r\n                          <img src=\"https://toolbox-pro.in/images/man.png\">\r\n                        </div>\r\n                        <div class=\"\" style=\"display: flex;flex-direction: column;\">\r\n                            <p1 class=\"mobile\"> 917803878858 </p1>\r\n                            <p2 class=\"userid\"> Userid: 3092023 </p2>\r\n                            <p3 class=\"balance\"> ₹0.00 </p3>\r\n                        </div>\r\n                     </div>\r\n                     <br>\r\n                     \r\n                     <div class=\"expiry\">\r\n                      <p1>Toolbox Expire in:</p1>\r\n                       <p></p>\r\n                     </div>\r\n                     \r\n                  </div>\r\n            </div>\r\n        </div>\r\n    </div>"
            ]
        }
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.send(JSON.stringify(response.data));
    } catch (error) {
        res.status(500).json({error:'Failed to fetch index'})
    }
})

app.listen(3002, () => console.log('Proxy server running on http://localhost:3000'));
