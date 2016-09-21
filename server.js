var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var app = express();

var facts = [];
url = 'http://www.chucknorrisfacts.com';
//url = 'http://www.chucknorrisfacts.com/all-chuck-norris-facts?page=' + i;
//
//function accepts an URL and does stuff with it
var getFacts = function(url){
    //the request object is called and the URL is passed to it.
    //a function to execute once the url has been retrieved is created
    request(url, function(error, response, html){
        //check to see if we had any errors requesting the URL
        if(!error){
            var $ = cheerio.load(html);          
            /*if (!fs.exists('facts.txt')){
                fs.writeFile('facts.txt', '');
            }*/
            $('.item-list').filter(function(){
                var filterData = $(this);
                
                filterData.children().first().children().each(function(i, item){
                    if ($(item).children().first().children().first().text().length > 1){
                        //console.log($(item).children().first().children().first().text());
                        fs.appendFile('facts.txt', $(item).children().first().children().first().text() + '\r\n', function(err){});
                    }
                });
            });
            console.log('End getFacts');
            return;
        }
    });
    
};

app.get('/scrape', function (req, res, err){
    var chuckUrls = ['http://www.chucknorrisfacts.com'];
    for (i=300; i < 400; i++){
        var newurl = url + '/all-chuck-norris-facts?page=' + i;
        chuckUrls.push(newurl);
        }
    var chuckLen = chuckUrls.length;
    
    for(i=0; i < chuckLen; i++){
        getFacts(chuckUrls[i]);
    }
        //getFacts(chuckUrls[1]);
        //getFacts(chuckUrls[2]);
        
        res.send('Done');
    });

app.listen('8081');

console.log('Magic can happen on port 8081');

exports = module.exports = app;