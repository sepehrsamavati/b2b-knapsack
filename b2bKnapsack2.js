// @ts-check

/**
 * @typedef {[number, number, number[]]} Triple
 */

const input = {
    weights: [4, 2, 7],
    profits: [1, 2, 3],
    bound: 11
};

function knapsackProblem(values, weights, capacity) {
    const n = values.length;
    /** @type {Triple[][]} */
    const triple = Array.from({ length: n + 1 }, () => []);
    triple[0].push([0, 0, []]);
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < triple[i].length; j++) {
        const [k, W, T] = triple[i][j];
  
        // Exclude item i
        if (W <= capacity) {
          triple[i + 1].push([k, W, T]);
        }
  
        // Include item i
        const newWeight = W + weights[i];
        if (newWeight <= capacity) {
          const newValue = values[i] + k;
          const newSet = [...T, i + 1];
          triple[i + 1].push([newValue, newWeight, newSet]);
        }
      }
    }
  
    // Find the set with the maximum value
    let maxIndex = 0;
    let maxValue = 0;
    for (let i = 0; i < triple[n].length; i++) {
      const [value] = triple[n][i];
      if (value > maxValue) {
        maxValue = value;
        maxIndex = i;
      }
    }
  
    return {
      maxValue: triple[n][maxIndex][0],
      set: triple[n][maxIndex][2],
    };
  }
  
  // Example usage
  const values = input.profits;
  const weights = input.weights;
  const capacity = input.bound;
  
  const { maxValue, set } = knapsackProblem(values, weights, capacity);
  console.log('Max Value:', maxValue);
  console.log('Selected Items:', set);