/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solutions = [];
  var solutionsBoard = [];

//need another for loop to change starting posistion
  var findSolution = function(startRow,startCol) {
    var solution = new Board({n:n});
    var invalidRow = [];
    var invalidCol = [];
    solution.togglePiece(startRow,startCol);
    invalidRow.push(startRow);
    invalidCol.push(startCol);
    for ( var rowIndex = 0; rowIndex < n; rowIndex++) {
      for ( var colIndex = 0; colIndex < n; colIndex++) {
        if( invalidRow.includes(rowIndex)) {
          break;
        }
        if (invalidCol.includes(colIndex)) {
          continue;
        } else {
          invalidRow.push(rowIndex);
          invalidCol.push(colIndex);
          solution.togglePiece(rowIndex, colIndex);
        }
      }
    }
    findSolution(0,0);
    console.log("Solution Rows: ", solution.rows());
    var instanceSolution = concatArrays(concatArrays(solution.rows()));
    console.log("InstanceSolution: ", instanceSolution);
    var rookCount = instanceSolution.reduce(function(accumulator, element) {
      return accumulator + element;
    });
    if ( rookCount === n ) {
      solutions.push(solution.rows());
    }
  };


  //need to push soultion onto solutions
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions));
  return solutions;
};

function concatArrays (arrays) {
  //stating with the recursive solution for an extra challenge
  var result = [];
  if ( arrays.length === 0 ) {
    return result;
  } else {
    for ( var i = 0; i < arrays[0].length; i++ ) {
      result.push(arrays[0][i]);
    }
    return result.concat(concatArrays(arrays.slice(1)))
  }

}
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;


  var solution = findNRooksSolution(n);
  solutionCount = solution.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
