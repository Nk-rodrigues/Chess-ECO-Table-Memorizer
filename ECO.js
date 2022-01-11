const request = require('request');
const cheerio = require('cheerio');
const prompt = require('prompt');

request('https://www.chessgames.com/chessecohelp.html', (error,response,html) => {
    if(!error && response.statusCode == 200) {
        prompt.start();

        prompt.get(['command'], function (err, userInput) {
        var cmnd = userInput.command;
        let length = cmnd.length;
        const $ = cheerio.load(html);
        if(cmnd.charAt(0)=='/' && length == 1) {
            $('body > font > p > table > tbody > tr > td').each((i, x) => {
                const moves = $(x).text();
                process.stdout.write(moves);
                process.stdout.write(" \n")
                
            });
            //const body = $('body > font > p > table > tbody > tr > td');
            //console.log($('body > font > p > table > tbody > tr > td').text());
        }
        else if(cmnd.charAt(0)=='/' && length >1) {
            var lst = cmnd.substring(1);
            $('body > font > p > table > tbody > tr > td:nth-child(1) > font').each((i, j) => {
                
                if(lst == $(j).text()){
                    var k = $(j).parent().parent().text();
                    k = k.substring(3);
                    console.log(k);
                    //console.log($(j).parent().parent().text());
                }
                
            });
        }
        });
    }
});