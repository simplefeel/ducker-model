<h1 align="center">Welcome to ducker 👋</h1>
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<p>
  <img src="https://img.shields.io/badge/version-1.2.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://badgen.net/badgesize/normal/https://raw.githubusercontent.com/simplefeel/ducker-model/master/dist/ducker.es5.js">
</p>

> 数据转换器，解耦前后端开发，提升开发效率

## Motivation

✅ why we need ducker-model ? see the [article](https://mp.weixin.qq.com/s/q6xybux0fhrUz5HE5TY0aA)

## Install

[![NPM](https://nodei.co/npm/ducker-model.png)](https://nodei.co/npm/ducker-model/)

## Base Usage

```js
import Model from 'ducker-model'
// 1.定义property
const property = {
    id: String,
    name: Number,
    avatar: Object,
}
// 2.实例化model
const instanceModel = new Model(property)
// 3.定义数据源
const dataSource = {
    id: 123,
    name: 'cuiyuteng',
    avatar: {uri:'http://xxxx.png'}
}
// 4.调用objectWithKeyValues方法解析数据
const modelData = instanceModel.objectWithKeyValues(dataSource)
// modelData--> {"id":123,"name":"cuiyuteng","avatar":{uri:'http://xxxx.png'}}
```

## Usage ReplacedKeyFromPropertyName

```js
import Model from 'ducker-model'
// 1.定义property
const property = {
    id: String,
    name: String,
    avatar: String,
    info: {
        sex: Number,
        real: {
            real_name: String
        },
    },
}
// 2.定义replacedKeyFromPropertyName
const replacedKeyFromPropertyName = {
    id: {
        property: "uuid",
        defaultValue: '100',
    },
    name: "buyer.shopinfo.nickname",
    avatar: {
        property: ["avatar", "file.avatar"],
        computed: ([a0, a1]) => {
            return a0 || a1 || ''
        }
    },
    info: {
        sex: {
            property: "file.sex",
        },
        real: {
            real_name: {
                property: "file.real.real_name",
            }
        }
    },
}
// 3.实例化model
const instanceModel = new Model(property,replacedKeyFromPropertyName)
// 4.定义数据源
const dataSource = {
    uuid: 123,
    buyer: {
        shopinfo: {
            nickna22me: "张三"
        }
    },
    avatar: 'http://a.png',
    file: {
        avatar: 'http://b.png',
        sex: 1,
        real: {
            real_name: 'P'
        }
    },
}
// 5.调用objectWithKeyValues方法解析数据
const modelData = instanceModel.objectWithKeyValues(dataSource)
// modelData--> {"id":"100","name":"张三","avatar":"http://a.png","info":{"sex":1,"real":{"real_name":"P"}}}
```

## Usage ValueForPath

```js
import Model, { valueForPath } from 'ducker-model'
// 1.定义property
const property = {
    uid: valueForPath(Number, "user.id"),
}
// 2.实例化model
const instanceModel = new Model(property)
// 3.定义数据源
const dataSource = {
    user: {
        id: 123456
    },
}
// 4.调用objectWithKeyValues方法解析数据
const modelData = instanceModel.objectWithKeyValues(dataSource)
// modelData--> {"uid":123456}
```

## Usage ValueWithArray

```js
import Model, { valueWithArray } from 'ducker-model'
// 1.定义property
const property = {
    data: valueWithArray({
        time: String,
        to: Number
    }),
    source: valueWithArray(String),
    object: valueWithArray(Object),
}
// 2.定义replacedKeyFromPropertyName
const replacedKeyFromPropertyName = {
    data: {
        property: "data",
        children: {
            time: {
                property: "time",
            },
            to: {
                property: "to",
            },
        }
    },
    source: {
        property: "datasource",
    },
    object: {
        property: "objectDataSource",
    },
}
// 3.实例化model
const instanceModel = new Model(property,replacedKeyFromPropertyName)
// 4.定义数据源
const dataSource = {
    data: [{
        time: '1231512313',
        to: 'troila'
    }],
    datasource: ['1', '2', '3'],
    objectDataSource: [{ a: 1 }, { b: 2 }],
}
// 5.调用objectWithKeyValues方法解析数据
const modelData = instanceModel.objectWithKeyValues(dataSource)
// modelData--> {"data":[{"time":"1231512313","to":"troila"}],"source":["1","2","3"],"object":[{ "a": 1 }, { "b": 2 }]}
```

## Usage ValueForPathWithArray

```js
import Model, { valueForPathWithArray } from 'ducker-model'
// 1.定义property
const property = {
    test: valueForPathWithArray(Number, "testDataSource"),
}
// 3.实例化model
const instanceModel = new Model(property)
// 4.定义数据源
const dataSource = {
    testDataSource: [4, 5, 6],
}
// 5.调用objectWithKeyValues方法解析数据
const modelData = instanceModel.objectWithKeyValues(dataSource)
// modelData--> {"test":[4,5,6]}
```

## Usage Object & ValueWithArray & ValueWithArray

```js
import Model, { valueWithArray } from 'ducker-model'
// 1.定义property
const property = {
    lastTest: valueWithArray({
        title: String,
        data: valueWithArray({
            price: Number,
            content: String
        })
    }),
}
// 2.定义replacedKeyFromPropertyName
const replacedKeyFromPropertyName = {
    lastTest: {
        property: "order",
        children: {
            title: {
                property: "title"
            },
            data: {
                property: "dataSource",
                children: {
                    price: {
                        property: "Price",
                    },
                    content: {
                        property: "mrk",
                    },
                }
            }
        },
    }
}
// 3.实例化model
const instanceModel = new Model(property,replacedKeyFromPropertyName)
// 4.定义数据源
const dataSource = {
    order: [{
        title: 'order-1',
        dataSource: [{
            Price: 100,
            mrk: '这是订单1'
        }, {
            Price: 200,
            mrk: '这是订单2'
        }]
    }]
}
// 5.调用objectWithKeyValues方法解析数据
const modelData = instanceModel.objectWithKeyValues(dataSource)
// modelData--> {"lastTest":[{"title":"order-1",data:[{"price":100,"content":"这是订单1"},{"price":200,"content":"这是订单2"}]}]}
```

## Instance Model Method

- ```objectWithKeyValues```
	- params: Object
	- return: Object
	```js
	const modelData = instanceModel.objectWithKeyValues(dataSource)
	```
- ```objectArrayWithKeyValuesArray```
	- params: Array
	- return: Array
	```js
	const modelData = instanceModel.objectWithKeyValues([dataSource,dataSource,dataSource])
	```

## API 说明

1. **type**为**Date**的属性，增加**format**字段，支持多种内置数据格式，默认为"l",可以选择的格式如下：

   - "l": "YYYY-MM-DD",
   - "ll": "YYYY 年 MM 月 DD 日",
   - "k": "YYYY-MM-DD hh:mm",
   - "kk": "YYYY 年 MM 月 DD 日 hh 点 mm 分",
   - "kkk": "YYYY 年 MM 月 DD 日 hh 点 mm 分 q",
   - "f": "YYYY-MM-DD hh:mm:ss",
   - "ff": "YYYY 年 MM 月 DD 日 hh 点 mm 分 ss 秒",
   - "fff": "YYYY 年 MM 月 DD 日 hh 点 mm 分 ss 秒 星期 w",
   - "n": "MM-DD",
   - "nn": "MM 月 DD 日"
   
2. 添加了**unit**字段的，代表该属性值表示一个价格，模型内置**十、百、千、万**单位，可以快捷的将价格字段进行转换，例如1000 -> 100

3. 属性定义增加**computed**，值为函数，可以用来自定义数据格式化处理

4. **property**，值可以为一个数组，传入多个路径，此时可以通过定义 **computed** 方法来组合计算值

## Author

👤 **skinner**

- Github: [@simplefeel](https://github.com/simplefeel)

## Show your support

Give a ⭐️ if this project helped you!


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/xuanheScript"><img src="https://avatars1.githubusercontent.com/u/19216775?v=4" width="100px;" alt="李杰"/><br /><sub><b>李杰</b></sub></a><br /><a href="https://github.com/simplefeel/ducker-model/commits?author=xuanheScript" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!