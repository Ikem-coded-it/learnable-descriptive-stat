

class DescriptiveStatistics {
  constructor (data) {
    this.data = data
    this.sortedData = data.sort();
  }

  //Measures of Central tendency methods
  mean() {
    const total = this.data.reduce((a, b) => b + a, 0);
    return total / this.data.length
  }

  median() {
    if (this.sortedData.length % 2 === 0) {
      const first = this.sortedData[(this.sortedData.length / 2) - 1];
      const second = this.sortedData[this.sortedData.length / 2];
      return (first + second) / 2
    }

    return this.sortedData[Math.floor(this.sortedData.length / 2)];
  }

  mode() {
    const valueCount = {}
    this.data.forEach(value => {
      if (Object.keys(valueCount).includes(`${value}`)) {
        valueCount[`${value}`] = valueCount[`${value}`] + 1
      } else {
        valueCount[`${value}`] = 1
      }
    })

    let highestOccurance = 0
    for (let x in valueCount) {
      if (valueCount[x] > highestOccurance) highestOccurance = valueCount[x]
    }
 
    let mode;
    for (let x in valueCount) {
      if (valueCount[x] === highestOccurance) mode = x
    }
    return parseInt(mode)
  }


  // Measures of Dispersion methods

  range() {
    const highestValue = this.sortedData[this.sortedData.length - 1];
    const lowestValue = this.sortedData[0];
    return highestValue - lowestValue;
  }

  variance() {
    const mean = this.mean();
    const differences = this.data.map(value => value - mean)
    const differencesSquared = differences.map(value => Math.pow(value, 2))
    return differencesSquared.reduce((a, b) => b + a, 0) / differencesSquared.length
  }

  standardDeviation() {
    return Math.sqrt(this.variance());
  }

  meanDeviation() {
    const mean = this.mean();
    const absoluteDifferences = this.data.map(num => Math.abs(num - mean));
    return absoluteDifferences.reduce((a, b) => a + b, 0) / this.data.length;
  }

  quartileDeviation() {
    // Step 2: Calculate the first quartile (Q1)
    const Q1 = this.calculateQuartile(1);

    // Step 3: Calculate the third quartile (Q3)
    const Q3 = this.calculateQuartile(3);

    // Step 4: Calculate the interquartile range (IQR)
    const IQR = Q3 - Q1;

    // Step 5: Calculate the quartile deviation (QD)
    const quartileDeviation = IQR / 2;

    return quartileDeviation;
  }

   // Helper function to calculate a specific quartile (Q1 or Q3)
  calculateQuartile (quartile, sortedNumbers = this.sortedData) {
    const n = sortedNumbers.length;
    const index = quartile * (n + 1) / 4 - 1;

    if (Number.isInteger(index)) {
      // If the index is an integer, return the corresponding value
      return sortedNumbers[index];
    } else {
      // If the index is not an integer, interpolate between adjacent values
      const lowerIndex = Math.floor(index);
      const upperIndex = Math.ceil(index);
      const lowerValue = sortedNumbers[lowerIndex];
      const upperValue = sortedNumbers[upperIndex];
      return (lowerValue + upperValue) / 2;
    }
}
}

const descStat = new DescriptiveStatistics([1, 2, 2, 2, 3, 4, 5, 6]);

// mean
console.log(descStat.mean()) // 3.125
// median
console.log(descStat.median()) // 2.5
// mode
console.log(descStat.mode()) // 2


// range
console.log(descStat.range()) // 5
// variance
console.log(descStat.variance()) // 2.609375
// standard deviation
console.log(descStat.standardDeviation()) // 1.6153559979150107
// mean deviation
console.log(descStat.meanDeviation()) // 1.40625
// quartile deviation
console.log(descStat.quartileDeviation()) // 1.25