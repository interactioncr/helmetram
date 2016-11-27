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

  set meta (value) {
    this[_meta] = value;
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

// Export
module.exports = Helmetram;
