"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.valueForPathWithArray = exports.valueWithArray = exports.valueForPath = void 0;

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get3 = _interopRequireDefault(require("lodash/get"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isDate2 = _interopRequireDefault(require("lodash/isDate"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _manba2 = _interopRequireDefault(require("manba"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.log(_isPlainObject2["default"]);
/**
 * 格式化价格的单位
 */

var PRICE = {
  S: 10,
  // 十
  B: 100,
  // 百
  Q: 1000,
  // 千
  w: 10000 // 万

};

var Model =
/*#__PURE__*/
function () {
  /**
   * @param {*} property : { [key]: type }
   * @param {*} replacedKeyFromPropertyName :{ [key]: {
   * 		property: path
   * 		computed: func
   * 		defaultValue: value
   * }} || String
   */
  function Model() {
    var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var replacedKeyFromPropertyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Model);

    this._attributes = _objectSpread({}, property);
    this.replacedKeyFromPropertyName = _objectSpread({}, replacedKeyFromPropertyName);
  }

  _createClass(Model, [{
    key: "objectWithKeyValues",
    value: function objectWithKeyValues(e) {
      if (!(0, _isPlainObject2["default"])(e)) {
        this.error("objectWithKeyValues: array dataSource type error");
      }

      return this.parse(e);
    }
  }, {
    key: "objectArrayWithKeyValuesArray",
    value: function objectArrayWithKeyValuesArray() {
      var _this = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if ((0, _isArray2["default"])(data)) {
        return data.map(function (item) {
          return _this.objectWithKeyValues(item);
        });
      } else {
        this.error("objectArrayWithKeyValuesArray: array dataSource type error");
      }
    }
    /**
     * 根据初始定义的模型，解析模型，进行变量映射赋值
     * @param {*} data 需要解析的数据
     */

  }, {
    key: "parse",
    value: function parse() {
      var _this2 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _mapValues2["default"])(this._attributes, function (attributeType, key) {
        var path, format, computed, unit, defaultValue, type;
        var replacedValue = _this2.replacedKeyFromPropertyName[key];

        if ((0, _isPlainObject2["default"])(attributeType)) {
          var _modelTypeKey = attributeType._modelTypeKey;

          if (_modelTypeKey) {
            switch (_modelTypeKey) {
              case 'valueForPath':
                {
                  type = new attributeType.type();
                  path = attributeType.path;
                  break;
                }

              case 'valueWithArray':
                {
                  type = new Array();
                  break;
                }

              case 'valueForPathWithArray':
                {
                  type = new Array();
                  path = attributeType.path;
                  break;
                }

              default:
                _this2.error("modelTypeKey: [".concat(key, "] type error"));

                break;
            }
          } else {
            return new Model(attributeType, replacedValue).objectWithKeyValues(data);
          }
        } else if (!(0, _isFunction2["default"])(attributeType)) {
          _this2.error("property: [".concat(key, "] type error"));
        } else {
          type = new attributeType();
        }

        if (!replacedValue && !path) {
          path = key;
        } else if ((0, _isString2["default"])(replacedValue)) {
          path = replacedValue;
        } else if ((0, _isPlainObject2["default"])(replacedValue)) {
          path = replacedValue.property;
          format = replacedValue.format;
          computed = replacedValue.computed;
          unit = replacedValue.unit;
          defaultValue = replacedValue.defaultValue;
        }

        if (!path) {
          _this2.error("replacedKeyFromPropertyName: [".concat(key, "] type error"));
        }

        if (!type) {
          _this2.error("property: [".concat(key, "] type error"));
        }

        var distValue = _this2._get({
          data: data,
          path: path,
          computed: computed
        });

        var distValueTypeToString = Object.prototype.toString.call(distValue);
        var attrTypeToString = Object.prototype.toString.call(type);
        var lastValue;

        if (distValueTypeToString === attrTypeToString || (0, _isArray2["default"])(path)) {
          lastValue = _this2.compose({
            distValue: distValue,
            type: type,
            unit: unit,
            format: format,
            computed: computed
          });
        } else {
          lastValue = _this2.getDefaultValue(defaultValue, type);
        }

        if ((0, _isArray2["default"])(type)) {
          if ((0, _isPlainObject2["default"])(attributeType.type)) {
            return new Model(attributeType.type, replacedValue.children).objectArrayWithKeyValuesArray(lastValue);
          } else {
            return _this2.checkNoObjectChildren({
              type: attributeType.type,
              data: lastValue
            });
          }
        } else {
          return lastValue;
        }
      });
    }
  }, {
    key: "checkNoObjectChildren",
    value: function checkNoObjectChildren(_ref) {
      var _this3 = this;

      var type = _ref.type,
          data = _ref.data;
      return data.map(function (item) {
        var instanceType = new type();
        var expectTypeToString = Object.prototype.toString.call(instanceType);
        var dataTypeToString = Object.prototype.toString.call(item);

        if (expectTypeToString === dataTypeToString) {
          return item;
        } else {
          return _this3.getDefaultValue(undefined, instanceType);
        }
      });
    }
    /**
     *根据初始定义的模型，反向映射数据
     * @param {*} data 需要转化的数据
     */

  }, {
    key: "traverse",
    value: function traverse() {
      var _this4 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!data) return this;
      var object = {};
      (0, _mapValues2["default"])(this._attributes, function (attribute, key) {
        var path = attribute.property,
            unit = attribute.unit,
            type = new attribute.type(),
            format = attribute.format,
            sourceValue = data[key];

        if (sourceValue) {
          var value = _this4.discompose({
            sourceValue: sourceValue,
            unit: unit,
            key: key,
            type: type
          });

          (0, _set2["default"])(object, path, value);
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

  }, {
    key: "compose",
    value: function compose(_ref2) {
      var distValue = _ref2.distValue,
          type = _ref2.type,
          unit = _ref2.unit,
          format = _ref2.format,
          computed = _ref2.computed;

      if (unit) {
        distValue = Number.parseFloat(distValue / PRICE[unit]).toFixed(2);
      }

      if (format) {
        distValue = (0, _manba2["default"])(parseFloat(distValue)).format(format);
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

  }, {
    key: "discompose",
    value: function discompose(_ref3) {
      var sourceValue = _ref3.sourceValue,
          unit = _ref3.unit,
          key = _ref3.key,
          type = _ref3.type;

      if ((0, _isDate2["default"])(type)) {
        sourceValue = (0, _manba2["default"])(sourceValue).time();
      }

      if (unit) {
        sourceValue = sourceValue * PRICE[unit];
      }

      var value = sourceValue || this.get(key);
      return value;
    }
    /**
     * 设置属性值
     * @param {*} key
     * @param {*} value
     */

  }, {
    key: "set",
    value: function set(key, value) {
      this[key] = value;
    }
    /**
     * 获取属性值
     * @param {*} key
     * @param {*} value
     */

  }, {
    key: "get",
    value: function get(key, value) {
      return this[key];
    }
    /**
     * 根据路径获取object里面对应的值
     * @param {*}
     */

  }, {
    key: "_get",
    value: function _get(_ref4) {
      var data = _ref4.data,
          path = _ref4.path,
          computed = _ref4.computed;

      if ((0, _isArray2["default"])(path) && !computed) {
        return this.error("path定义为数组路径，computed属性必须定义");
      }

      if ((0, _isArray2["default"])(path) && computed) {
        var array = [];
        path.forEach(function (o, i) {
          array.push((0, _get3["default"])(data, o));
        });
        return array;
      }

      if (!(0, _isArray2["default"])(path)) {
        return (0, _get3["default"])(data, path);
      }
    }
    /**
     * 获取默认值
     * @param {*} value
     * @param {*} type
     */

  }, {
    key: "getDefaultValue",
    value: function getDefaultValue(defaultValue, type) {
      if (defaultValue === undefined) {
        return this.setDefaultValue(type);
      } else {
        return defaultValue;
      }
    }
    /**
     * 设置默认值
     * @param {*} Type
     */

  }, {
    key: "setDefaultValue",
    value: function setDefaultValue(type) {
      var value;

      if ((0, _isNumber2["default"])(type)) {
        value = 0;
      } else if ((0, _isString2["default"])(type)) {
        value = "";
      } else if ((0, _isArray2["default"])(type)) {
        value = [];
      } else if ((0, _isBoolean2["default"])(type)) {
        value = true;
      } else if ((0, _isDate2["default"])(type)) {
        value = Date.now();
      } else if ((0, _isPlainObject2["default"])(type)) {
        value = {};
      } else if ((0, _isNull2["default"])(type)) {
        value = null;
      }

      return value;
    }
  }, {
    key: "error",
    value: function error(message) {
      throw new Error(message);
    }
  }]);

  return Model;
}();

var valueForPath = function valueForPath(type, path) {
  return {
    _modelTypeKey: 'valueForPath',
    type: type,
    path: path
  };
};

exports.valueForPath = valueForPath;

var valueWithArray = function valueWithArray(type) {
  return {
    _modelTypeKey: 'valueWithArray',
    type: type
  };
};

exports.valueWithArray = valueWithArray;

var valueForPathWithArray = function valueForPathWithArray(type, path) {
  return {
    _modelTypeKey: 'valueForPathWithArray',
    type: type,
    path: path
  };
};

exports.valueForPathWithArray = valueForPathWithArray;
var _default = Model;
exports["default"] = _default;