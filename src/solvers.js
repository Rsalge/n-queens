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
  var newBoard = new Board({n:n});

  var startRow = 0;
  var startCol = 0;

  var newBoardSolution = [];
  var allSolutionsForNewBoard = [];

  // ss: board.toggle(rowIndex,colIndex);
  board.toggle(startRow, startCol);
  // check order of toggle and placeNewMove
  placeNewMove(startRow, startCol);

  // set starting row and column index for iterating through remaining board spaces
  startCol = colIndex++;
  startRow = rowIndex++;

  // ARRAY OF BOARD SOLUTIONS: build an array of the newBoads (solutions matrices) which contain n valid rook moves

    // TEST NEXT SPACE ON NEWBOARD: iterate through the remaining spaces on the board to see if there are more valid moves to make  => i.e. if board 4x4, should iterate through 16 squares
    for (var nextMove = 1, colIndex = (colIndex < n) ? startCol : 0, rowIndex = (rowIdex < n ? rowIndex : 0); nextMove < n*n; nextMove++, colIndex++, rowIndex++)

    for (var nextMove = 1; nextMove < n*n; nextMove++) {
      // loop through entire board
      for (var boardDimensions = n; n > 0; n--) {


        for (var rowIndex = startRow; rowIndex < n; rowIndex++, rowIndex = (rowIndex < n ? rowIndex : 0)) {
          for (var colIndex = colIndex; colIndex < n; colIndex++, colIndex = (colIndex < n ? colIndex : 0) ) {
            if (!hasRowConflictAt(rowIndex) && !hasColConflictAt(colIndex) {
              placeNewMove(rowIndex, colIndex);
            }
          }
        }
      }

  var ouput = findNRooksSolution(n);

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
