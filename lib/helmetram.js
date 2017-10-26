'use strict';

const _ = require('lodash');
const META_ROBOTS_NO_FOLLOW_NO_INDEX = { name: 'robots', content: 'nofollow,noindex' };

/**
 * Class Helmetram
 */
const Helmetram =
class Helmetram {
  constructor () {
    this.meta = _.clone(Helmetram.defaultValues.meta);
  }

  toObject () {
    return _.defaults(_.pick(this, _.keys(Helmetram.defaultValues)), Helmetram.defaultValues);
  }

  injectInto (obj) {
    obj.helmetram = this.toObject();
  }

  addMeta (obj) {
    let exists;
    const test = function test (meta) {
      if (typeof meta.name !== 'undefined') {
        return meta.name === this.name;
      } else {
        return meta.property === this.property;
      }
    };
    exists = this.meta.findIndex(test, obj);
    if (!~exists) {
      this.meta.push(obj);
    } else {
      this.meta[exists] = obj;
    }
  }

  static setDefaults (defs) {
    _.assign(Helmetram.defaultValues, defs);
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
