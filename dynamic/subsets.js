function countSubsets(numbers, sum) {
    return countSubsetsInternal(numbers, sum, numbers.length - 1);
}

function countSubsetsInternal(numbers, sum, i) {
    if (sum === 0) return 1;
    if (i < 0) return 0;

    const result = countSubsetsInternal(numbers, sum, i - 1) +
        countSubsetsInternal(numbers, sum - numbers[i], i - 1);

    return result;
}

const numbers = [1, 2, -3, -4];

console.log(countSubsets(numbers, parseInt(process.argv[2])));