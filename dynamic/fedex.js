let goods = [
    { value: 5, weight: 3 },
    { value: 1, weight: 1 },
    { value: 2, weight: 9 },
    { value: 3, weight: 3 },
    { value: 1, weight: 2 },
];

function computeMaxValue(goods, weightAllowed) {
    const result = computeMaxValueInternal(goods, goods.length - 1, weightAllowed, 0, {});
    return result;
}

function computeMaxValueInternal(goods, i, weightLeft, valueTotal, map) {
    const key = `${i}-${weightLeft}-${valueTotal}`;
    let result = map[key];

    if (result !== undefined) return result;
    if (i < 0) return { value: valueTotal, items: [] };
    if (weightLeft <= 0) return { value: valueTotal, items: [] };

    const leftSubTree = computeMaxValueInternal(
        goods,
        i - 1,
        weightLeft,
        valueTotal,
        map);

    if ((weightLeft - goods[i].weight) < 0) {
        map[key] = leftSubTree;
        return leftSubTree;
    }

    const rightSubTree = computeMaxValueInternal(
        goods,
        i - 1,
        weightLeft - goods[i].weight,
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

console.log(computeMaxValue(goods, process.argv.length > 1 ? process.argv[2] : 10));