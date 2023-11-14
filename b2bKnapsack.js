// @ts-check

const profits = [23, 24, 15, 13, 16];
const weights = [11, 12, 8, 7, 9];
const bound = 26;

const n = profits.length;

let optPath = [], optProfit = -1, totalCalls = 0, totalOperations = 0;

/**
 * @param {(0 | 1)[]} path 
 * @returns 
 */
function calculatePathProfit(path) {
    let totalProfit = 0;
    for (let index = 0; index < path.length; index++) {
        ++totalOperations;
        const included = path[index];
        totalProfit += profits[index] * included;
    }
    return totalProfit;
}

/**
 * @param {{ profit: number; weight: number; }[]} items 
 * @param {number} bound 
 * @returns 
 */
function getFractionalKnapsackProfit(items, bound) {
    items.sort((a, b) => (a.weight / a.profit) - (b.weight / b.profit));
    let profit = 0;
    let weight = 0;
    let currentItem = items.shift();
    while(weight < bound && currentItem) {
        ++totalOperations;
        const availableWeight = bound - weight;

        if(availableWeight >= currentItem.weight)
        {
            profit += currentItem.profit;
            weight += currentItem.weight;
        } else {
            const percentage = availableWeight / currentItem.weight;
            profit += percentage * currentItem.profit;
            weight += percentage * currentItem.weight;
        }

        currentItem = items.shift();
    }
    return profit;
}

/**
 * @param {(0 | 1)[]} path
 * @param {number} level
 * @param {number} currentWeight
 */
function knapsack2(path, level, currentWeight) {
    ++totalCalls;

    /** @type {(0|1)[]} */
    let choices = [];

    const profit = calculatePathProfit(path);

    if (level === n + 1) {
        ++totalOperations;

        if (profit >= optProfit) {
            optProfit = profit;
            optPath = [...path];
        }

    }
    else {
        ++totalOperations;
        if (currentWeight + weights[level - 1] <= bound)
            choices = [1, 0];
        else
            choices = [0];
    }

    const subPathMaxProfit = profit + getFractionalKnapsackProfit([...profits].slice(level - 1).map((p, index) => {
        return {
            profit: p,
            weight: weights[index]
        };
    }), bound - currentWeight);

    if(subPathMaxProfit <= optProfit)
        return;

    choices.forEach(choice => {
        ++totalOperations;
        const newPathToCheck = [...path, choice];
        knapsack2(newPathToCheck, level + 1, currentWeight + (choice * weights[level - 1]));
    });
}

knapsack2([], 1, 0);

console.table({
    optPath, optProfit,
    totalCalls, totalOperations
});
