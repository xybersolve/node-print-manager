exports.setup = () => {
  return (req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4242')
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE')
    // Request headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    //res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With', 'X-HTTP-Method-Override');
    // res.setHeader('Access-Control-Allow-Headers', "access-control-allow-origin, origin,accept, X-Requested-With, content-type, Access-Control-Request-Method, Access-Control-Request-Headers")
    // true if website to include cookies in the requests sent in API calls
    // res.setHeader('Access-Control-Allow-Credentials', true)

    next()
    // if (req.method === 'OPTIONS') {
    //     res.sendStatus(200);
    // } else {
    //     next();
    // }
  }
}

// function crosPermission(){
//   this.permission=function(req,res,next){
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Content-Type');
//     res.header('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','OPTIONS');
//     next();
//   }
// }
