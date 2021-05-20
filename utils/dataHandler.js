export  function unwrapFormGroupData(form){
    let res = form;
    for(const [key, value] of Object.entries(form)){

         if(typeof(value) == typeof([])){
             console.log(key);
            res = {...res,...{ [key]: value[0]} };
        }
    }
    return res;

} 