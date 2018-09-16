function fib(num, arr) {
    let result = arr[num];

    if(result) return result;

    if(num === 1 || num === 2) {
        return 1;
    }

    result = fib(num - 1,arr) + fib(num - 2,arr);
    arr[num] = result;
    return result;
}

console.log(fib(1000,[]));