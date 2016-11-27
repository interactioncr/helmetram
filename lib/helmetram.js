'use strict';

const _ = require('lodash');

const _htmlAttributes = Symbol('title');
const _title = Symbol('title');
const _base = Symbol('base');
const _meta = Symbol('meta');
const _link = Symbol('meta');
const _script = Symbol('meta');
const _noscript = Symbol('meta');
const _style = Symbol('meta');

const META_ROBOTS_NO_FOLLOW_NO_INDEX = { name: 'robots', content: 'nofollow,noindex' };

/**
 * Class Helmetram
 */
const Helmetram =
class Helmetram {
  constructor () {
    this[_htmlAttributes] = Helmetram.defaultValues.htmlAttributes;
    this[_title] = Helmetram.defaultValues.title;
    this[_base] = Helmetram.defaultValues.base;
    this[_meta] = Helmetram.defaultValues.meta;
    this[_link] = Helmetram.defaultValues.link;
    this[_script] = Helmetram.defaultValues.script;
    this[_noscript] = Helmetram.defaultValues.noscript;
    this[_style] = Helmetram.defaultValues.style;
  }

  toObject () {
    return {
      htmlAttributes: this[_htmlAttributes],
      title: this[_title],
      base: this[_base],
      meta: this[_meta],
      link: this[_link],
      script: this[_script],
      noscript: this[_noscript],
      style: this[_style]
    };
  }

  injectInto (obj) {
    obj.helmetram = this.toObject();
  }

  set title (value) {
    this[_title] = value;
  }

  set meta (arr) {
    let exists;
    const test = function test (meta) {
      if (typeof meta.name !== 'undefined') {
        return meta.name === this.name;
      } else {
        return meta.promerty === this.property;
      }
    };
    for (let meta of arr) {
      exists = this[_meta].findIndex(test, meta);
      if (!~exists) {
        this[_meta].push(_.clone(meta));
      } else {
        this[_meta][exists] = _.clone(meta);
      }
    }
  }

  static setDefaults (defs) {
    _.defaultsDeep(Helmetram.defaultValues, defs);
    console.log(Helmetram.defaultValues);
  }
};

/**
 * Default values
 * @type {Object}
 */
Helmetram.defaultValues = {
  htmlAttributes: { lang: 'en' },
  title: '',
  base: { href: '/' },
  meta: [],
  link: [],
  script: [],
  noscript: [],
  style: []
};

if (process && process.env && process.env.NODE_ENV !== 'production') {
  Helmetram.defaultValues.meta.push(META_ROBOTS_NO_FOLLOW_NO_INDEX);
}

// Export
module.exports = Helmetram;
