const Mock = require('mockjs')
const Random = Mock.Random
const produceNewsData = function (options){
    var reqBody = JSON.parse(options.body);
    console.log(reqBody);
    let res = {};
    res.total = 50;
    res.data = [];
    for (let i = 0; i < 50; i++){
        let newArticleObject = {
            ID: Random.increment(),
            submiteTime: Random.date('yyyy-MM-dd HH:mm'),
            userName: Random.string(5),
            asNumber: Random.integer(10000,10099),
            device: Random.string(5),
            asPath: Random.ip() + ";" + Random.ip(),
            prefix: Random.ip() + ";" + Random.ip(),
            status: Random.integer(0,2), 
            executionTime: Random.date('yyyy-MM-dd HH:mm')
        }
        res.data.push(newArticleObject)
    }
    return res
}
const count = function (num, str){
    var result = '';
    var i = 0;
    while (i<num){
        console.log(i);
        result+=str;
        i++;
    }
    return result;
}
const upLoad = function (){
    return {msg: "sucesse"}
}
const groupApprovalList = function (options){
    console.log(options)
    var countryList = ['日本','香港','美国','德国','法国','韩国'];
    var cityList = ['北京','上海','重庆','石家庄','郑州','南京'];
    var reqBody = JSON.parse(options.body)
    let res = {};
    res.total = 50;
    res.data = [];
    for (let i = 0; i < reqBody.pageSize; i++){
        let newArticleObject = {
            ID: Random.increment(),
            submiteTime: Random.date('yyyy-MM-dd HH:mm'),
            userName: countryList[Random.integer(0, 5)] + Random.string('upper', 2, 4),//随机中文名
            asNumber: Random.integer(10000,10099),
            device: cityList[Random.integer(0, 5)] + 'E' + Random.string('upper', 2, 2),
            asPath: Random.ip() + ";" + Random.ip(),
            prefix: Random.ip() + ";" + Random.ip(),
            status: Random.integer(0,2),
            executionTime: Random.date('yyyy-MM-dd HH:mm')
        }
        res.data.push(newArticleObject)
    }
    return res
}
const groupApprovaldevicelList = function (options){
    var reqBody = JSON.parse(options.body)
    let res = {};
    res.total = 3;
    res.data = [];
    for (let i = 0; i < 3; i++){
        let newArticleObject = {
            deviceName: Random.string(5),
            deviceIp: Random.ip(),
            config: Random.ip() + ";" + Random.ip(),
        }
        res.data.push(newArticleObject)
    }
    return res
}
const checkPass = function (options){
    var reqBody = JSON.parse(options.body)
    if (reqBody.pass == "123456"){
        return {type: 'sucesse'}
    }else{
        return {type: 'error'}
    }
}
Mock.setup({
    timeout: '1400-1800'
})
Mock.mock('/news/index', 'post', produceNewsData);
Mock.mock('/news/groupApprovalList', 'post', groupApprovalList);
Mock.mock('/news/upLoad', 'post', upLoad);
Mock.mock('/news/groupApprovaldevicelList', 'post', groupApprovaldevicelList);
Mock.mock('/login', 'post', checkPass);
