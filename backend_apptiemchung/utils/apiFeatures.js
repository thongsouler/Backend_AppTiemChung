// tính năng: search vaccin(theo keyword)
class APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword =  this.queryStr.keyword ? {
            tenVaccin:{
                $regex:this.queryStr.keyword,
                $options:'i' // Case insensitivity to match upper and lower cases.
                // https://docs.mongodb.com/manual/reference/operator/query/regex/
            }
        } : {}
        console.log(keyword)
        this.query = this.query.find({...keyword});
        return this;
    }
}

module.exports = APIFeatures;