var express = require('express');
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');    //关于Buffer我后面细说
var moment = require('moment');
var targetUrl = 'http://qianming001.sinaapp.com/qm/date/';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list',function(req, res, next){

    var page = req.query.page;
    var dateFromPage = moment().subtract(page, 'days');
    var day = moment(dateFromPage);

    console.log(page);
    console.log(day.format('YYYY/MM/DD'));
    var resUrl = targetUrl;
    resUrl = targetUrl +  day.format('YYYY/MM/DD');

    superagent.get(resUrl)
        .end(function (err, rest) {
            console.log(req.query);
//            console.log(rest);
            var topicUrls = [];
            if(typeof(rest.text) == 'undefined'){
                res.json('');
                 return;
            }
            var $ = cheerio.load(rest.text);




            // 获取首页所有的链接
            $('div .entry-content').each(function (idx, element) {

                var $element = $(element);
                var postid = $element.eq(0).parent().attr('id');
                var tUrl = "";
                var title = strdecode($element.eq(0).text().trim());
//                var imageurl = strdecode($element.eq(1).attr('href'));
//                console.log(title);
                var imageUrl = strdecode($element.eq(0).children().eq(1).children().eq(0).children().attr('src'));
//                console.log(imageUrl);
                topicUrls.push({"id":postid,"title":title,"imageurl":imageUrl});
            });


//            var jsonText = JSON.stringify(topicUrls);
            console.log(JSON.stringify({'datas':topicUrls}));
            res.json({'datas':topicUrls});
        });
});
function strdecode(string) {
    key = md5('sfdfkj!@#!@');
//    key = "2e5633738782c3557334b7a3e1e7fc5f";
    var b = new Buffer(string, 'base64')
    string = b.toString();
    len = key.length;
    code = '';
    for (i = 0; i < string.length; i++) {
        k = i % len;
        code += String.fromCharCode(string.charCodeAt(i) ^ key.charCodeAt(k))
    };

    var b = new Buffer(code, 'base64')
    code = b.toString();
    return code;
}

function md5(data) {
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    return crypto.createHash("md5").update(str).digest("hex");
}

module.exports = router;
