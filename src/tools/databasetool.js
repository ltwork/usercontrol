
const MongoClient = require('mongodb').MongoClient
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmqd21';

//暴露给控制器查看所有列表的方法
exports.findList = (collectionName,params,callback)=>{
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection(collectionName);
        // 根据条件查询列表
        collection.find(params).toArray((err,docs)=>{
            client.close();
            // 执行 callback 把结果返回给控制器
            callback(err,docs)
        })
    });
}


//暴露给控制器查看一个的方法
exports.findOne = (collectionName,params,callback)=>{
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection(collectionName);
        // 根据条件查询一个
        collection.findOne(params,(err,doc)=>{
            client.close();
            // 执行 callback 把结果返回给控制器
            callback(err,doc)
        })
    });
}

//暴露给控制器新增一个的方法
exports.insertOne = (collectionName,params,callback)=>{
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
        //拿到操作对象
        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection(collectionName);
        // 根据条件新增一个
        collection.insertOne(params,(err,result)=>{
            client.close();
            // 执行 callback 把结果返回给控制器
            callback(err,result)
        })
    });
}



  



// exports.findList = (collectionName, params, callback) => {


//     // Use connect method to connect to the server
//     MongoClient.connect(url, {
//             useNewUrlParser: true
//         },
//         function (err, client) {
//             const db = client.db(dbName);
//             // 拿到集合
//             const collection = db.collection(collectionName)
//             //根据查询条件查询
//             collection.find(params).toArray((err, docs) => {
//                 client.close()

//                 callback(err, docs)
//             })
//         })
// }