'use strict';
var PugLint = require('pug-lint');
var parse = require('./parse.js');
var webpack_util = require('loader-utils');
var util = require('util');

var linter = new PugLint();
var configured = false;

var cheerio = require('cheerio');
var htmlparser = require('htmlparser2');

module.exports = function (content) {
    this.cacheable();
    var config = webpack_util.getOptions(this);

    if(!configured) linter.configure(parse(config));

    var template;

    var handler = new htmlparser.DefaultHandler((error, dom) => {
      if (error) {
        return console.error(error);
      }

      var $ = cheerio.load(dom);

      template = $('template[lang="pug"]').text();
    })

    var parser = new htmlparser.Parser(handler)

    parser.parseComplete(content)

    var result = linter.checkString(template);

    if(result.length) {
        this.emitError(result.sort(function (a, b) {
            var line = a.line - b.line;
            if(line == 0) return (a.column || 0) - (b.column || 0);
            else return line;
        }).map(function (problem) {
            let message = problem.message.split('\n')

            message.splice(0, 1)
            message.reverse()
            message.splice(0, 2)
            message.reverse()

            return util.format('\n%d:%d\t\x1b[31merror\x1b[0m\t%s\n%s',
                problem.line,
                problem.column || 0,
                problem.msg,
                message.join('\n'));
        }).join('\n\n'));
    }
    return content
}
