//去重
export function arrayUnique(array) {
    var res = [];
    var json = {};
    for(var i = 0; i< array.length; i++){
        if(!json[array[i]]){
            res.push(array[i]);
            json[array[i]] = true;
        }
    }

    return res;
}

//取两个数组的交集(在没有重复的情况下)
export function arrayIntersection(arrA, arrB) {
    var res = [];
    for(var i=0; i< arrA.length; i++){
        if(arrB.indexOf(arrA[i]) > -1){
            res.push(arrA[i]);
        }
    }
    return res;
}