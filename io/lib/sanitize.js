/**
 * Created by s.t.o.k.a.t.o on 05.09.2017.
 */

/**
 * Парсинг строк
 */

const xssFilter = require('xss-filters');
const validator = require('validator');

function sanitize(str) {
    str = xssFilter.inHTMLData(str);
    str = validator.escape(str);
    
    return str.replace(/<[^>]+>/g,'');
}

module.exports = sanitize;