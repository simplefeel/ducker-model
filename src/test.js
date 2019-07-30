const Model = require("../dist/ducker.es5");

let userModel = new Model({
  id: {
    type: Number,
    property: "uuid",
    value: 0
  },
  name: {
    type: String,
    property: "buyer.shopinfo.nickname",
    value: ""
  },
  items: {
    type: String,
    property: "items"
  },
  age: {
    type: Number,
    property: "age"
  },
  lastLoginTime: {
    type: Date,
    property: "lastLoginTime"
  },
  price: {
    type: Number,
    unit: "B",
    property: "price"
  }
});

let userState = userModel.parse({
  uuid: 123,
  buyer: {
    shopinfo: {
      nickname: "张三"
    }
  },
  price: 1000,
  lastLoginTime: "1563897600000"
});

let userParams = userModel.traverse({
  id: 234,
  name: "李四",
  age: null,
  lastLoginTime: "2019-07-24",
  price: 24
});

console.log(JSON.stringify(userParams));
