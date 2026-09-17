// The Bonus Challenge: Multi-Level Grouping
// In the previous tasks, you grouped by one thing (like name). Here, you need to group by two things: product AND region.

// The Goal: Calculate the total sales for each unique combination of Product and Region.

// Input:

const sales = [
    { product: 'Apple', region: 'East', amount: 10 },
    { product: 'Apple', region: 'West', amount: 5 },
    { product: 'Apple', region: 'East', amount: 20 },
    { product: 'Banana', region: 'East', amount: 15 },
    { product: 'Banana', region: 'West', amount: 10 },
  ];

  // Output:

  [
    { product: 'Apple', region: 'East', totalAmount: 30 },
    { product: 'Apple', region: 'West', totalAmount: 5 },
    { product: 'Banana', region: 'East', totalAmount: 15 },
    { product: 'Banana', region: 'West', totalAmount: 10 }
  ]


  // Solution:

  let salesCalculator = (arr) => {

    let saleMap = new Map();
  
    arr.forEach((item) => {
  
      let key = item.product + "_" +item.region;
  
          if(!saleMap.has(key)){
    
            saleMap.set(key, {
    
            product: item.product,
    
            region: item.region,
    
            amount: 0
    
          })
  
        }
  
      // console.log('saleMap', saleMap)
  
      // console.log('key', key) 
  
      let currentElem = saleMap.get(key)
  
      console.log('current', currentElem)
  
      console.log("item totalAmount", item.amount)
  
      currentElem.amount = currentElem.amount + item.amount
  
    })
  
    console.log("sales", saleMap)
  
    let result = [...saleMap.values()]
  
    console.log("result", result)
  
    return result
  
  }
  
//https://onecompiler.com/javascript/44gsanhek  