const getFrequency = (input) => {
    const freq = new Map();
  
    const walk = (item) => {
      if (Array.isArray(item)) {
        item.map(walk);
      } else {
        freq.set(item, (freq.get(item) || 0) + 1);
      }
    };
  
    walk(input);
    return Object.fromEntries(freq);
  };
  
  console.log(getFrequency([1, [2, [1, 3]], 2, [2]]));
  // { "1": 2, "2": 3, "3": 1 }


  // Same thing with Objects

  const getFrequency2 = (input) => {
    const freq = {};
  
    const walk = (item) => {
      if (Array.isArray(item)) {
        for (const x of item) walk(x);
      } else {
        freq[item] = (freq[item] || 0) + 1;
      }
    };
  
    walk(input);
    return freq; // plain object
  };
  
  console.log(getFrequency2([1, [2, [1, 3]], 2, [2]]));
  // { "1": 2, "2": 3, "3": 1 }