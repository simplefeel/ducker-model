/*
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
import isPlainObject from "lodash/isPlainObject";
import isFunction from "lodash/isFunction";
import isNull from "lodash/isNull";
import isArray from "lodash/isArray";
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
		/**
	 * @param {*} property : { [key]: type }
	 * @param {*} replacedKeyFromPropertyName :{ [key]: {
	 * 		property: path
	 * 		computed: func
	 * 		defaultValue: value
	 * }} || String
	 */
		constructor(property = {}, replacedKeyFromPropertyName = {}) {
				this._attributes = {
						...property
				};
				this.replacedKeyFromPropertyName = {
						...replacedKeyFromPropertyName
				}
		}
		objectWithKeyValues(e) {
				if (!isPlainObject(e)) {
						this.error(`objectWithKeyValues: array dataSource type error`)
				}
				return this.parse(e)
		}
		objectArrayWithKeyValuesArray(data = []) {
				if (isArray(data)) {
						return data.map((item) => this.objectWithKeyValues(item))
				} else {
						this.error(`objectArrayWithKeyValuesArray: array dataSource type error`)
				}
		}
		/**
	 * 根据初始定义的模型，解析模型，进行变量映射赋值
	 * @param {*} data 需要解析的数据
	 */
		parse(data = {}) {
				return _mapValues(this._attributes, (attributeType, key) => {
						let path,
								format,
								computed,
								unit,
								defaultValue,
								type

						const replacedValue = this.replacedKeyFromPropertyName[key]

						if (isPlainObject(attributeType)) {
								const {_modelTypeKey} = attributeType
								if (_modelTypeKey) {
										switch (_modelTypeKey) {
												case 'valueForPath':
														{
																type = new attributeType.type()
																path = attributeType.path
																break;
														}
												case 'valueWithArray':
														{
																type = new Array()
																break;
														}
												case 'valueForPathWithArray':
														{
																type = new Array()
																path = attributeType.path
																break;
														}
												default:
														this.error(`modelTypeKey: [${key}] type error`);
														break;
										}
								} else {
										return new Model(attributeType, replacedValue).objectWithKeyValues(data)
								}
						} else if (!isFunction(attributeType)) {
								this.error(`property: [${key}] type error`)
						} else {
								type = new attributeType()
						}

						if (!replacedValue && !path) {
								path = key
						} else if (_isString(replacedValue)) {
								path = replacedValue
						} else if (isPlainObject(replacedValue)) {
								path = replacedValue.property
								format = replacedValue.format
								computed = replacedValue.computed
								unit = replacedValue.unit
								defaultValue = replacedValue.defaultValue
						}
						if (!path) {
								this.error(`replacedKeyFromPropertyName: [${key}] type error`)
						}
						if (!type) {
								this.error(`property: [${key}] type error`)
						}

						const distValue = this._get({data, path, computed})

						let lastValue

						if (distValue || _isArray(path)) {
								lastValue = this.compose({distValue, type, unit, format, computed})
						} else {
								lastValue = this.getDefaultValue(defaultValue, type)
						}

						if (isArray(type)) {
								if (isPlainObject(attributeType.type)) {
										return new Model(attributeType.type, replacedValue.children).objectArrayWithKeyValuesArray(lastValue)
								} else {
										return this.checkNoObjectChildren({type: attributeType.type, data: lastValue})
								}
						} else {
								return lastValue
						}
				})
		}
		checkNoObjectChildren({type, data}) {
				return data.map((item) => {
						const instanceType = new type
						const expectTypeToString = Object
								.prototype
								.toString
								.call(instanceType)
						const dataTypeToString = Object
								.prototype
								.toString
								.call(item)
						if (expectTypeToString === dataTypeToString) {
								return item
						} else {
								return this.getDefaultValue(undefined, instanceType)
						}
				})
		}
		/**
	 *根据初始定义的模型，反向映射数据
	 * @param {*} data 需要转化的数据
	 */
		traverse(data = {}) {
				if (!data) 
						return this;
				let object = {};
				_mapValues(this._attributes, (attribute, key) => {
						let path = attribute.property,
								unit = attribute.unit,
								type = new attribute.type(),
								format = attribute.format,
								sourceValue = data[key];
						if (sourceValue) {
								let value = this.discompose({sourceValue, unit, key, type});
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
		compose({
				distValue,
				type,
				unit,
				format = "l",
				computed
		}) {
				if (unit) {
						distValue = Number
								.parseFloat(distValue / PRICE[unit])
								.toFixed(2);
				}

				if (_isDate(type)) {
						distValue = _manba(parseFloat(distValue)).format(format);
				}

				if (computed) {
						distValue = computed(distValue);
				}

				if (_isNumber(type)) {
						distValue = Number.isNaN(Number(distValue))
								? 0
								: Number(distValue)
				}

				if (_isString(type)) {
						distValue = isPlainObject(distValue)
								? ""
								: String(distValue)
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
		discompose({sourceValue, unit, key, type}) {
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
		_get({data, path, computed}) {
				if (_isArray(path) && !computed) {
						return this.error("path定义为数组路径，computed属性必须定义");
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
		getDefaultValue(defaultValue, type) {
				if (defaultValue === undefined) {
						return this.setDefaultValue(type);
				} else {
						return defaultValue
				}
		}
		/**
	 * 设置默认值
	 * @param {*} Type
	 */
	setDefaultValue(type) {
		let value
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
		} else if (isPlainObject(type)) {
			value = Date.now();
		} else if (isNull(type)) {
			value = null
		} else {
			value = null
    }
    return value;
  }
  error(message) {
      throw new Error(message)
  }
}

const valueForPath = (type, path) => {
		return {_modelTypeKey: 'valueForPath', type, path}
}

const valueWithArray = (type) => {
		return {_modelTypeKey: 'valueWithArray', type}
}

const valueForPathWithArray = (type, path) => {
		return {_modelTypeKey: 'valueForPathWithArray', type, path}
}

export {valueForPath, valueWithArray, valueForPathWithArray}

export default Model;
