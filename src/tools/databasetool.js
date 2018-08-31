
const MongoClient = require('mongodb').MongoClient
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmqd21';

const ObjectId = require("mongodb").ObjectId;

// 导出 mongodb里面的方法 用来解析params里面的参数
exports.ObjectId = ObjectId;

//封装链接数据库的方法
const connectDB = (collectionName,callback)=>{
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName); 
        callback(err,client,collection)
        client.close()
    });
} 
//暴露给控制器查看所有列表的方法
exports.findList = (collectionName,params,callback)=>{
    // MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
    //     const db = client.db(dbName);
    //     // 拿到集合
    //     const collection = db.collection(collectionName);
    connectDB(collectionName,(err,client,collection)=>{
        collection.find(params).toArray((err,docs)=>{
            
            // 执行 callback 把结果返回给控制器
            callback(err,docs)
        })
    })
    
}       // 根据条件查询列表
      
    //});



//暴露给控制器查看一个关键字的方法
exports.findOne = (collectionName,params,callback)=>{
    // MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
    //     const db = client.db(dbName);
    //     // 拿到集合
    //     const collection = db.collection(collectionName);
    //     // 根据条件查询一个
    //     collection.findOne(params,(err,doc)=>{
    //         client.close();
    //         // 执行 callback 把结果返回给控制器
    //         callback(err,doc)
    //     })
    // });
    connectDB(collectionName,(err,client,collection)=>{
        collection.findOne(params,(err,result)=>{
            client.close()
            // 执行 callback 把结果返回给控制器
            callback(err,result)
        })
    })
}

//暴露给控制器新增一个的方法
exports.insertOne = (collectionName,params,callback)=>{
    // MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
    //     //拿到操作对象
    //     const db = client.db(dbName);
    //     // 拿到集合
    //     const collection = db.collection(collectionName);
    //     // 根据条件新增一个
    //     collection.insertOne(params,(err,result)=>{
    //         client.close();
    //         // 执行 callback 把结果返回给控制器
    //         callback(err,result)
    //     })
    // });
    connectDB(collectionName,(err,client,collection)=>{
        collection.insertOne(params,(err,docs)=>{
            client.close()
            // 执行 callback 把结果返回给控制器
            callback(err,docs)
        })
    })
}



//--------------------------------------------------------------




//暴露修改一个的方法

//update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},{multi:true})

// exports.updateOne = (collectionName,condition,params,callback)=>{
//     // MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
//     //     //拿到操作对象
//     //     const db = client.db(dbName);
//     //     // 拿到集合
//     //     const collection = db.collection(collectionName);
//     //     // 根据条件新增一个
//     //     collection.updateOne(condition,{$set:params},(err,result)=>{
//     //         client.close();
//     //         // 执行 callback 把结果返回给控制器
//     //         callback(err,result)
//     //     })
//     // });
//     connectDB(collectionName,(err,client,collection)=>{
//         collection.updateOne(params,condition,(err,docs)=>{
//             client.close()
//             // 执行 callback 把结果返回给控制器
//             callback(err,docs)
//         })
//     })
// }
exports.updateOne = (collectionName, condition, params, callback) => {
    connectDB(collectionName, (err, client, collection) => {
      // 根据条件修改一个
      collection.updateOne(condition, { $set: params }, (err,result) => {
        client.close();
        // 执行 callback 把结果返回给控制器
        callback(err,result);
      });
    });
};

//暴露删除的方法  
exports.deleteOne = (collectionName,params,callback)=>{
    // MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
    //     //拿到操作对象
    //     const db = client.db(dbName);
    //     // 拿到集合
    //     const collection = db.collection(collectionName);
    //     // 根据条件新增一个
    //     collection.deleteOne(params,(err,result)=>{
    //         client.close();
    //         // 执行 callback 把结果返回给控制器
    //         callback(err,result)
    //     })
    // });
    connectDB(collectionName,(err,client,collection)=>{
        collection.deleteOne(params,(err,result)=>{
            client.close()
            // 执行 callback 把结果返回给控制器
            callback(err,result)
        })
    })
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