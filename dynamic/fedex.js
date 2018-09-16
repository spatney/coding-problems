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
    let result = map[`${i}-${weightLeft}-${valueTotal}`];

    if (result !== undefined) return result;
    if (i < 0) return { value: valueTotal, items: [] };
    if (weightLeft <= 0) return { value: valueTotal, items: [] };

    const computedResult1 = computeMaxValueInternal(
        goods,
        i - 1,
        weightLeft,
        valueTotal,
        map);

    if ((weightLeft - goods[i].weight) < 0) {
        map[`${i}-${weightLeft}-${valueTotal}`] = computedResult1;
        return computedResult1;
    }

    const computedResult2 = computeMaxValueInternal(
        goods,
        i - 1,
        weightLeft - goods[i].weight,
        valueTotal + goods[i].value,
        map);

    if (computedResult1.value > computedResult2.value) {
        result = computedResult1;
    }
    else {
        computedResult2.items.push(i);
        result = computedResult2;
    }

    map[`${i}-${weightLeft}-${valueTotal}`] = result;

    return result;
}

console.log(computeMaxValue(goods, process.argv[2]));