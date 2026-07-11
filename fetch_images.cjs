const https = require('https');
https.get('https://www.typingexam.in/exam/', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const regex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    const matches = [];
    while ((match = regex.exec(data)) !== null) {
      matches.push(match[1]);
    }
    console.log(matches.filter(m => m.includes('logo') || m.includes('exam') || m.includes('ssc') || m.includes('railway') || m.includes('police')));
  });
}).on("error", (err) => { console.log("Error: " + err.message); });
