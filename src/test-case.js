const Model = require('../dist/ducker.es5').default;
// 1.定义property
const property = {
  id: String,
  name: Number,
  avatar: Object
}
// 2.实例化model
const instanceModel = new Model(property)
// 3.定义数据源
const dataSource = {
  id: 123,
  name: 'cuiyuteng',
  avatar: {
    uri: 'http://xxxx.png'
  }
}
// 4.调用objectWithKeyValues方法解析数据
const modelData = instanceModel.objectWithKeyValues(dataSource)
console.log(modelData.id);

// modelData--> {"id":123,"name":"cuiyuteng","avatar":{uri:'http://xxxx.png'}}