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
  var rowIndex = 0;
  var colIndex = 0;
  for ( var firstRowIndex = 0, var firstColIndex = 0; firstColIndex > n; firstColIndex++,firstRowIndex++ ) {
    var solution = new Board({n:n});

    var invalidRow = [];
    var invalidCol = [];
    solution.toggle(firstRowIndex,firstColIndex);
    invalidRow.push(firstRowIndex);
    invalidCol.push(firstColIndex);
    for (var rowIndex = 0; rowIndex < n; rowIndex++) {
      for (var colIndex = 0; colIndex < n; colIndex++) {
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
    var solutionBoard = solution.rows();
    var reducedBoard = solutionBoard.reduce( function(a,b) {
      return a.concat(b);
    });
    var rookCount = reducedBoard.reduce( function(a,b) {
      return a + b;
    });
    if( rookCount === n ) {
      solutions.push(solutionBoard);
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionBoard));
  return solutions;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme


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
