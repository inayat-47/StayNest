export default (fn) => {
    return function(request , response , next){
        fn(request , response , next).catch(error => next(error));
    };
};