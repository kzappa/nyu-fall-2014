Meteor.methods({
    /*
    getTime: function () {
        result = Meteor.http.get("http://www.timeanddate.com/worldclock/city.html?n=136");
        $ = cheerio.load(result.content);
        CurrentTime = $('#ct').html();
        return CurrentTime;
    }
    */
  getAndParseUrl: function(url) {
    var Cheerio = Meteor.npmRequire('cheerio');
    var result = Meteor.http.get(url);
    var $ = Cheerio.load(result.content);
    return $('meta[property="og:image"]').attr('content');


  }
});
