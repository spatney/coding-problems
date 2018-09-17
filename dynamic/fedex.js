function generateGoods(num) {
    const arr = [];
    for(let i = 0; i < num; i++) {
        arr.push({
            value: Math.random() * 100 | 0 + 1,
            weight: Math.random() * 10 | 0 + 1 
        })
    }

    return arr;
}

function to2D(goods) {
    arr = [[],[]];

    for(const good of goods) {
        arr[0].push(good.value);
        arr[1].push(good.weight);
    }

    return arr;
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
        items: []
    };

    const leftSubTree = computeMaxValueInternal(
        goods,
        i - 1,
        capacityRemaining,
        valueTotal,
        map);

    if (goods[i].weight > capacityRemaining) {
        result = leftSubTree;
        map[key] = result;
        return result;
    }

    const rightSubTree = computeMaxValueInternal(
        goods,
        i - 1,
        capacityRemaining - goods[i].weight,
        valueTotal + goods[i].value,
        map);

    if (leftSubTree.value > rightSubTree.value) {
        result = leftSubTree;
    }
    else {
        result = {
            value: rightSubTree.value,
            items: rightSubTree.items.slice()
        }
        result.items.push(i);
    }

    map[key] = result;
    
    return result;
}

const goods = [
    { value: 50, weight: 3 }, // 0
    { value: 10, weight: 1 }, // 1
    { value: 20, weight: 2 }, // 2
    { value: 20, weight: 9 }, // 3
    { value: 10, weight: 1 }, // 4
    { value: 10, weight: 1 }, // 5
];

const weightAllowed = process.argv.length > 1 ? process.argv[2] : 10;

console.log("Max weight allowed: \033[1;33;44m " + weightAllowed + 'kg \033[0m');

const result = computeMaxValue(goods, weightAllowed);

console.log(
    'Max value possible is \033[1;33;44m $'
    + result.value
    + ' \033[0m, and the item(s) included are '
    + '\033[1;33;44m [ ' + result.items + ' ] \033[0m');