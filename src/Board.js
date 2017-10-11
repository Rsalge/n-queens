// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var output = [];
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          output.push(row.indexOf(row[i]));
        };
      }
      if (output.length > 1) {
        return output;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var output = false;
      for (var rowIndex = 0; rowIndex < this.get("n"); rowIndex++) {
        if (this.hasRowConflictAt(rowIndex) !== false) {
          output = true;
        }
      }
      return output;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //make empty output array
      var output = [];
      //build an array to reperesent the column
      var column = [];
      //loop each row array and push the row[colIndex] value to the new column array
      for ( var rowIndex = 0; rowIndex < this.get("n"); rowIndex++ ) {
        var row = this.get(rowIndex);
        column.push(row[colIndex]);
      }
      //iterate through column and push conflicts index to output
      for ( var i = 0; i < column.length; i++ ) {
        if ( column[i] === 1 ) {
          output.push(column.indexOf(column[i]));
        }
      }
      if (output.length > 1) {
        return output;
      }
      return false;
    },
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var output = false;
      //call hasColConflictAt for each column
      for ( var colIndex = 0; colIndex < this.get("n"); colIndex++) {
        if (this.hasColConflictAt(colIndex) !== false) {
          //if hasColconflicts returns a populted array
          //return true
          output = true;
        }
      }
      return output;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(startIndex) {
      //build an array to reperesent the majorDiag
      var majorDiag = [];
      //make empty results array
      var output = [];
      var rowLength = this.get("n");
      //loop each row array to build majorDiag
      if( startIndex < 0 ) {
        startIndex = rowLength + startIndex;
      }
      var row = [];
      for ( var rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        //push the row[i+1] value to the new majorDiag array
        row = this.get(rowIndex);
        majorDiag.push(row[startIndex]);
        startIndex++;
        if ( startIndex === rowLength ) {
          startIndex = startIndex - rowLength;
        }
      }
      var board = [];
      for( var i = 0; i < rowLength; i++ ) {
        board.push(this.get(i));
      }
      // console.log("Major Diagonal: ", majorDiag);
      // console.log("this is the board: ", board);
      //build output array by iterating through majorDiag
      for ( var diagIndex = 0; diagIndex < majorDiag.length; diagIndex++ ) {
        if ( majorDiag[diagIndex] === 1 ) {
          //if conflict found, store in output
          output.push(majorDiag.indexOf(majorDiag[diagIndex]));
        }
      }
      //if output array length is greter than 1
      if ( output.length > 1 ) {
        //return output array
        // console.log("Major Diagonal conflict exists: ", majorDiag);
        // console.log("this is the board: ", board);
        return output;
      }
      //else return false
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rowLength = this.get("n");
      //call hasMajorDiagonalConflictAt for each column, starting at negative rowLength
      for ( var diagIndex = (-rowLength + 1); diagIndex < rowLength; diagIndex++ ) {
        //if hasMajorDiagonalConflictAt returns !false
        if( this.hasMajorDiagonalConflictAt(diagIndex) !== false ) {
          //return true
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //build an array to reperesent the column
      //make empty output array
      //loop each row array and push the row[i-1] value to the new column array
      //if reluts array is not empty return output array
        // return reults array
      //else return false
      var majorDiag = [];
      //make empty results array
      var output = [];
      var rowLength = this.get("n");
      //loop each row array to build majorDiag
      if( startIndex < 0 ) {
        majorDiagonalColumnIndexAtFirstRow = rowLength + majorDiagonalColumnIndexAtFirstRow;
      }
      var row = [];
      for ( var rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        //push the row[i+1] value to the new majorDiag array
        row = this.get(rowIndex);
        majorDiag.push(row[majorDiagonalColumnIndexAtFirstRow]);
        majorDiagonalColumnIndexAtFirstRow++;
        if ( majorDiagonalColumnIndexAtFirstRow === rowLength ) {
          majorDiagonalColumnIndexAtFirstRow = majorDiagonalColumnIndexAtFirstRow - rowLength;
        }
      }
      var board = [];
      for( var i = 0; i < rowLength; i++ ) {
        board.push(this.get(i));
      }
      for ( var diagIndex = 0; diagIndex < majorDiag.length; diagIndex++ ) {
        if ( majorDiag[diagIndex] === 1 ) {
          //if conflict found, store in output
          output.push(majorDiag.indexOf(majorDiag[diagIndex]));
        }
      }
      //if output array length is greter than 1
      if ( output.length > 1 ) {
        //return output array

        return output;
      }
      //else return false
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //call hasMinorDiagonalConflictAt for each column
      //if hasMinorDiagonalConflictAt returns a populted array
      //return true
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
