const scorecard = [
  { name: 'Mark', score: 25, subject: 'English', result: 'PASS' },
  { name: 'Steve', score: 26, subject: 'Math', result: 'PASS' },
  { name: 'Vikas', score: 22, subject: 'Math', result: 'PASS' },
  { name: 'Adam', score: 25, subject: 'English', result: 'PASS' },
  { name: 'Steve', score: 30, subject: 'History', result: 'PASS' },
  { name: 'Mark', score: 24, subject: 'History', result: 'FAIL' },
  { name: 'Mark', score: 22, subject: 'Math', result: 'FAIL' },
  { name: 'Amit', score: 26, subject: 'Math', result: 'FAIL' },
  { name: 'Adam', score: 23, subject: 'History', result: 'FAIL' },
  { name: 'Ahmed', score: 12, subject: 'English', result: 'FAIL' },
  { name: 'Abdul', score: 2, subject: 'Math', result: 'FAIL' },
];

const output_expected = [
  { name: 'Mark', totalScore: '', overallResult: '' },
  { name: 'Steve', totalScore: '', overallResult: '' },
  { name: 'Adam', totalScore: '', overallResult: '' },
];

  
  const resultDeclare = (arr) => {
    const studentMap = new Map();
  
    arr.forEach((item) => {
      // 1. If the student isn't in our Map yet, initialize them
      if (!studentMap.has(item.name)) {
        studentMap.set(item.name, { 
          totalScore: 0, 
          overallResult: 'PASS' 
        });
      }
  
      const currentData = studentMap.get(item.name);
  
      // 2. Add current subject score to their total
      currentData.totalScore += item.score;
  
      // 3. Logic: If they fail even one subject, set overallResult to 'FAIL'
      if (item.result === 'FAIL') {
        currentData.overallResult = 'FAIL';
      }
    });
  
    // 4. Convert the Map back into the array format you requested
    return Array.from(studentMap, ([name, data]) => ({
      name: name,
      totalScore: data.totalScore,
      overallResult: data.overallResult
    }));
  };
  
  const output = resultDeclare(scorecard);
  console.log(output);

  // https://onecompiler.com/javascript/44grvxujp
  // https://codesandbox.io/p/sandbox/67wl2c?file=%2Fsrc%2Findex.mjs%3A31%2C13-31%2C24