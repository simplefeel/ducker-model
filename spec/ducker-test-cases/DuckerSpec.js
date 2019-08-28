describe("Base Usage", function () {
  const Model = require('../../dist/ducker.es5').default;

  const property = {
    id: String,
    name: Number,
    avatar: Object
  }

  const instanceModel = new Model(property)
  const dataSource = {
    id: 123,
    name: 'cuiyuteng',
    avatar: {
      uri: 'http://xxxx.png'
    }
  }

  it(" the value is expect after parse ", function () {
    expect(instanceModel.objectWithKeyValues(dataSource)).toEqual({
      "id": "",
      "name": 0,
      "avatar": {
        uri: 'http://xxxx.png'
      }
    })
  })
});

describe("Usage ReplacedKeyFromPropertyName", function () {
  const Model = require('../../dist/ducker.es5').default;

  const property = {
    id: String,
    name: String,
    avatar: String,
    info: {
      sex: Number,
      real: {
        real_name: String
      }
    }
  }
  const replacedKeyFromPropertyName = {
    id: {
      property: "uuid",
      defaultValue: '100'
    },
    name: "buyer.shopinfo.nickname",
    avatar: {
      property: [
        "avatar", "file.avatar"
      ],
      computed: ([a0, a1]) => {
        return a0 || a1 || ''
      }
    },
    info: {
      sex: {
        property: "file.sex"
      },
      real: {
        real_name: {
          property: "file.real.real_name"
        }
      }
    }
  }

  const instanceModel = new Model(property, replacedKeyFromPropertyName)
  const dataSource = {
    uuid: 123,
    buyer: {
      shopinfo: {
        nickname: "张三"
      }
    },
    avatar: 'http://a.png',
    file: {
      avatar: 'http://b.png',
      sex: 1,
      real: {
        real_name: 'P'
      }
    }
  }

  it(" the value is expect after parse ", function () {
    expect(instanceModel.objectWithKeyValues(dataSource)).toEqual({
      "id": "100",
      "name": "张三",
      "avatar": "http://a.png",
      "info": {
        "sex": 1,
        "real": {
          "real_name": "P"
        }
      }
    })
  })
});

describe("Usage ValueForPath", function () {
  const Model = require('../../dist/ducker.es5').default;
  const {valueForPath} = require('../../dist/ducker.es5');

  // 1.定义property
  const property = {
    uid: valueForPath(Number, "user.id")
  }
  // 2.实例化model
  const instanceModel = new Model(property)
  // 3.定义数据源
  const dataSource = {
    user: {
      id: 123456
    }
  }

  it(" the value is expect after parse ", function () {
    expect(instanceModel.objectWithKeyValues(dataSource)).toEqual({"uid": 123456})
  })
});

describe("Usage ValueWithArray", function () {
  const Model = require('../../dist/ducker.es5').default;
  const {valueWithArray} = require('../../dist/ducker.es5');
  // 1.定义property
  const property = {
    data: valueWithArray({time: String, to: Number}),
    source: valueWithArray(String),
    object: valueWithArray(Object)
  }
  // 2.定义replacedKeyFromPropertyName
  const replacedKeyFromPropertyName = {
    data: {
      property: "data",
      children: {
        time: {
          property: "time"
        },
        to: {
          property: "to"
        }
      }
    },
    source: {
      property: "datasource"
    },
    object: {
      property: "objectDataSource"
    }
  }
  // 3.实例化model
  const instanceModel = new Model(property, replacedKeyFromPropertyName)
  // 4.定义数据源
  const dataSource = {
    data: [
      {
        time: '1231512313',
        to: 'troila'
      }
    ],
    datasource: [
      '1', '2', '3'
    ],
    objectDataSource: [
      {
        a: 1
      }, {
        b: 2
      }
    ]
  }

  it(" the value is expect after parse ", function () {
    expect(instanceModel.objectWithKeyValues(dataSource)).toEqual({
      "data": [
        {
          "time": "1231512313",
          "to": 0
        }
      ],
      "source": [
        "1", "2", "3"
      ],
      "object": [
        {
          "a": 1
        }, {
          "b": 2
        }
      ]
    })
  })
});

describe("Usage ValueForPathWithArray", function () {
  const Model = require('../../dist/ducker.es5').default;
  const {valueForPathWithArray} = require('../../dist/ducker.es5');

  // 1.定义property
  const property = {
    test: valueForPathWithArray(Number, "testDataSource")
  }
  // 3.实例化model
  const instanceModel = new Model(property)
  // 4.定义数据源
  const dataSource = {
    testDataSource: [4, 5, 6]
  }

  it(" the value is expect after parse ", function () {
    expect(instanceModel.objectWithKeyValues(dataSource)).toEqual({
      "test": [4, 5, 6]
    })
  })
});

describe("Usage Object & ValueWithArray & ValueWithArray", function () {
  const Model = require('../../dist/ducker.es5').default;
  const {valueWithArray} = require('../../dist/ducker.es5');

  // 1.定义property
  const property = {
    lastTest: valueWithArray({
      title: String,
      data: valueWithArray({price: Number, content: String})
    })
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
              property: "Price"
            },
            content: {
              property: "mrk"
            }
          }
        }
      }
    }
  }
  // 3.实例化model
  const instanceModel = new Model(property, replacedKeyFromPropertyName)
  // 4.定义数据源
  const dataSource = {
    order: [
      {
        title: 'order-1',
        dataSource: [
          {
            Price: 100,
            mrk: '这是订单1'
          }, {
            Price: 200,
            mrk: '这是订单2'
          }
        ]
      }
    ]
  }

  it(" the value is expect after parse ", function () {
    expect(instanceModel.objectWithKeyValues(dataSource)).toEqual({
      "lastTest": [
        {
          "title": "order-1",
          data: [
            {
              "price": 100,
              "content": "这是订单1"
            }, {
              "price": 200,
              "content": "这是订单2"
            }
          ]
        }
      ]
    })
  })
});