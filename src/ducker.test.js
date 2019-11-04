import Model, { valueWithArray } from './ducker'


test('ducker model objectWithKeyValues', () => {
    // expect(sum(1, 2)).toBe(3);
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


});


test('ducker model objectWithKeyValues', () => {
    // expect(sum(1, 2)).toBe(3);
    const property = {
        data: valueWithArray({
            time: String,
            to: Number
        }),
        datasource: valueWithArray(String),
        object: valueWithArray(Object),
    }
    const replacedKeyFromPropertyName = {
        data: {
            children: {
                time: {
                    property: "time2",
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

    const instanceModel = new Model(property, replacedKeyFromPropertyName)
    const dataSource = [{
        data: [{
            time2: '1231512313',
            to: 'troila'
        }],
        datasource: ['1', '2', '3'],
        objectDataSource: [{ a: 1 }, { b: 2 }],
    }]
    // 5.调用objectWithKeyValues方法解析数据
    const modelData = instanceModel.objectArrayWithKeyValuesArray(dataSource)

    console.log(JSON.stringify(modelData));


});