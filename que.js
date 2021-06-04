
const que = [];


exports.queLength = async (req,res,next) => {
        console.log("in que")
    if(que.length +1 > 3){
       return res.status(200).send("Too many orders please try agian in few minutes!");
    }else{
       que.push(req.body.pizza);
        next();
        if(que.length===1 || que.length === 0){
        chef();
        }
    }
}

function chef(callback) {
    let pizza = que[0];
    console.log(que.length);
    const test = setTimeout(function() {
        console.log("Pizza delivery!");
        que.splice(0,1);
       if(que.length <1) {
            clearInterval(test);
            
        }else{
            pizza = que[0];
            chef();
        }
    }, pizza.time);
}
