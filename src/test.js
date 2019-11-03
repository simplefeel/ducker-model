const Model = require('../lib/ducker').default;

// const property = {   id: String,   name: String,   avatar: String, loginTime:
// String,   price: String,   info: {     sex: Number,     real: {
// real_name: String     }   } } // 2.定义replacedKeyFromPropertyName const
// replacedKeyFromPropertyName = {   id: {     property: "uuid", defaultValue:
// '100'   },   name: "buyer.shopinfo.nickname",   loginTime: {  property:
// "loginTime",     format: "l"   },   price: {     property: "price",     unit:
// 'B'   },   avatar: {     property: [       "avatar", "file.avatar"     ],
// computed: ([a0, a1]) => {       return a0 || a1 || ''     }   },   info: {
// sex: {       property: "file.sex"     }, real: {       real_name: { property:
// "file.real.real_name"       }  }   } } // 3.实例化model const instanceModel =
// new Model(property, replacedKeyFromPropertyName) // 4.定义数据源 const dataSource
// = {   uuid: 123, buyer: {     shopinfo: {       nickname: "张三"     }   },
// loginTime: "1566978591904",   price: "12300",   avatar: 'http://a.png',
// file: { avatar: 'http://b.png',     sex: 1,     real: {   real_name: 'P'
// } } }

const property = {
  id: String,
  name: Number,
  avatar: {
    userInfo: {
      logo: String
    }
  }
}

const instanceModel = new Model(property)
const dataSource = {
  id: 123,
  name: 'cuiyuteng',
  avatar: {}
}
// 5.调用objectWithKeyValues方法解析数据
const modelData = instanceModel.objectWithKeyValues(dataSource)

console.log(JSON.stringify(modelData));
