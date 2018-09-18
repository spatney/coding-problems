function countSubsets(numbers, sum) {
    return countSubsetsInternal(numbers, sum, numbers.length - 1, {});
}

function countSubsetsInternal(numbers, sum, i, map) {
    if (sum === 0) return 1;
    if (sum < 0 || i < 0) return 0;

    const key = `${sum}-${i}`;
    let result = map[key];

    if (result) return result;

    return map[key] = countSubsetsInternal(numbers, sum, i - 1, map) +
        countSubsetsInternal(numbers, sum - numbers[i], i - 1, map);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(countSubsets(numbers, parseInt(process.argv[2])));