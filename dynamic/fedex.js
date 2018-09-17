function print(items, goods) {
    let str = '';
    let count = 0;
    for (const k in items) {
        if (items[k] === 1) {
            str += `${k},`
            count += goods[parseInt(k)].weight;
        }
    }

    console.log(count);
    return str.substr(0, str.length - 1);
}

function computeMaxValue(goods, weightAllowed) {
    const map = {};
    const result = computeMaxValueInternal(goods, goods.length - 1, weightAllowed, 0, map);
    return result;
}

function computeMaxValueInternal(goods, i, capacityRemaining, valueTotal, map) {
    const key = `${i}-${capacityRemaining}`;
    let result = map[key];

    if (result) return result;
    if (i < 0 || capacityRemaining <= 0) return {
        value: valueTotal,
        items: {}
    };

    const leftSubTree = computeMaxValueInternal(
        goods,
        i - 1,
        capacityRemaining,
        valueTotal,
        map);

    if (goods[i].weight > capacityRemaining) {
        leftSubTree.items[i] = 0;
        map[key] = leftSubTree;
        return leftSubTree;
    }

    const rightSubTree = computeMaxValueInternal(
        goods,
        i - 1,
        capacityRemaining - goods[i].weight,
        valueTotal + goods[i].value,
        map);

    if (leftSubTree.value > rightSubTree.value) {
        result = leftSubTree;
        result.items[i] = 0;
        map[key] = result; // not the most efficient.
    }
    else {
        result = rightSubTree;
        result.items[i] = 1;
    }

    return result;
}

const goods = [
    { value: 5, weight: 3 }, // 0
    { value: 1, weight: 1 }, // 1
    { value: 2, weight: 2 }, // 2
    { value: 2, weight: 9 }, // 3
    { value: 1, weight: 1 }, // 4
    { value: 1, weight: 1 }, // 5
];

const weightAllowed = process.argv.length > 1 ? process.argv[2] : 10;

console.log("Weight allowed: \033[1;33;44m " + weightAllowed + ' \033[0m');

const result = computeMaxValue(goods, weightAllowed);
console.log(
    'Max value of the load is \033[1;33;44m '
    + result.value
    + ' \033[0m, and the item(s) included are '
    + '\033[1;33;44m [ ' + print(result.items, goods) + ' ] \033[0m');