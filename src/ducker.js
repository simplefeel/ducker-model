/*
 * Filename: /Users/zhangshangjin/Desktop/my-github/ducker/src/ducker.js
 * Path: /Users/zhangshangjin/Desktop/my-github/ducker
 * Created Date: Monday, July 29th 2019, 4:37:56 pm
 * Author: zhangshangjin
 *
 * Copyright (c) 2019 Your Company
 */

import _mapValues from "lodash/mapValues";
import _set from "lodash/set";
import _get from "lodash/get";
import _isNumber from "lodash/isNumber";
import _isString from "lodash/isString";
import _isArray from "lodash/isArray";
import _isDate from "lodash/isDate";
import _isBoolean from "lodash/isBoolean";
import _manba from "manba";

/**
 * 格式化价格的单位
 */
const PRICE = {
  S: 10, // 十
  B: 100, // 百
  Q: 1000, // 千
  w: 10000 // 万
};

class Model {
  constructor(options = {}) {
    this._attributes = {
      ...options
    };
  }
  /**
   * 根据初始定义的模型，解析模型，进行变量映射赋值
   * @param {*} data 需要解析的数据
   */
  parse(data = {}) {
    _mapValues(this._attributes, (attribute, key) => {
      let path = attribute.property,
        type = new attribute.type(),
        format = attribute.format,
        computed = attribute.computed,
        unit = attribute.unit;
      let distValue = this._get({ data, path, computed });
      if (distValue) {
        distValue = this.compose({
          distValue,
          type,
          unit,
          format,
          computed
        });
      }
      let value =
        distValue || this.getDefaultValue(attribute.value, attribute.type);
      this.set(key, value);
    });
    return this;
  }
  /**
   *根据初始定义的模型，反向映射数据
   * @param {*} data 需要转化的数据
   */
  traverse(data = {}) {
    if (!data) return this;
    let object = {};
    _mapValues(this._attributes, (attribute, key) => {
      let path = attribute.property,
        unit = attribute.unit,
        type = new attribute.type(),
        format = attribute.format,
        sourceValue = data[key];
      if (sourceValue) {
        let value = this.discompose({ sourceValue, unit, key, type });
        _set(object, path, value);
      }
    });
    return object;
  }
  /**
   *  格式化特殊类型的值，比如时间的格式化，价格的格式化
   * @param {*} distValue 值
   * @param {*} type 类型，比如String,Number
   * @param {*} unit 单位，比如价格
   */
  compose({ distValue, type, unit, format = "l", computed }) {
    if (unit) {
      distValue = Number.parseFloat(distValue / PRICE[unit]).toFixed(2);
    }
    if (_isDate(type)) {
      distValue = _manba(parseFloat(distValue)).format(format);
    }
    if (computed) {
      distValue = computed(distValue);
    }
    return distValue;
  }
  /**
   * 和compose方法类似，这里是反向转化
   * @param {*} sourceValue
   * @param {*} unit
   * @param {*} key
   * @param {*} type
   */
  discompose({ sourceValue, unit, key, type }) {
    if (_isDate(type)) {
      sourceValue = _manba(sourceValue).time();
    }
    if (unit) {
      sourceValue = sourceValue * PRICE[unit];
    }
    let value = sourceValue || this.get(key);
    return value;
  }
  /**
   * 设置属性值
   * @param {*} key
   * @param {*} value
   */
  set(key, value) {
    this[key] = value;
  }
  /**
   * 获取属性值
   * @param {*} key
   * @param {*} value
   */
  get(key, value) {
    return this[key];
  }
  /**
   * 根据路径获取object里面对应的值
   * @param {*}
   */
  _get({ data, path, computed }) {
    if (_isArray(path) && !computed) {
      console.error("path定义为数组路径，computed属性必须定义");
      return;
    }
    if (_isArray(path) && computed) {
      let array = [];
      path.forEach((o, i) => {
        array.push(_get(data, o));
      });
      return array;
    }
    if (!_isArray(path)) {
      return _get(data, path);
    }
  }
  /**
   * 获取默认值
   * @param {*} value
   * @param {*} type
   */
  getDefaultValue(value, type) {
    if (!value) {
      return this.setDefaultValue(type);
    } else {
      return value;
    }
  }
  /**
   * 设置默认值
   * @param {*} Type
   */
  setDefaultValue(Type) {
    let value = "",
      type = new Type();
    if (_isNumber(type)) {
      value = 0;
    } else if (_isString(type)) {
      value = "";
    } else if (_isArray(type)) {
      value = [];
    } else if (_isBoolean(type)) {
      value = true;
    } else if (_isDate(type)) {
      value = Date.now();
    }

    return value;
  }
}

export default Model;
