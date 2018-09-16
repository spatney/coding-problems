function computeMaxValue(goods, weightAllowed) {
    const result = computeMaxValueInternal(goods, goods.length - 1, weightAllowed, 0, {});
    return result;
}

function computeMaxValueInternal(goods, i, weightRemaining, valueTotal, map) {
    const key = `${i}-${weightRemaining}-${valueTotal}`;
    let result = map[key];

    if (result !== undefined) return result;
    if (i < 0) return { value: valueTotal, items: [] };
    if (weightRemaining <= 0) return { value: valueTotal, items: [] };

    const leftSubTree = computeMaxValueInternal(
        goods,
        i - 1,
        weightRemaining,
        valueTotal,
        map);

    if ((weightRemaining - goods[i].weight) < 0) {
        map[key] = leftSubTree;
        return leftSubTree;
    }

    const rightSubTree = computeMaxValueInternal(
        goods,
        i - 1,
        weightRemaining - goods[i].weight,
        valueTotal + goods[i].value,
        map);

    if (leftSubTree.value > rightSubTree.value) {
        result = leftSubTree;
    }
    else {
        rightSubTree.items.push(i);
        result = rightSubTree;
    }

    map[key] = result;

    return result;
}

const goods = [
    { value: 5, weight: 3 },
    { value: 1, weight: 1 },
    { value: 2, weight: 9 },
    { value: 3, weight: 3 },
    { value: 1, weight: 2 },
];
const weightAllowed = process.argv.length > 1 ? process.argv[2] : 10;
const result = computeMaxValue(goods, weightAllowed);

console.log(
    'Max value of the load is \033[1;33;44m ' 
    + result.value 
    + ' \033[0m, and the item(s) included are '
    +'\033[1;33;44m [ ' + result.items +' ] \033[0m');