var letters = document.getElementById('letterinput');
var button = document.getElementById('run');
button.addEventListener('click', createAnagrams);

function numAnagrams(original) {
    //var original = letters.value;   //original text as entered
    //var anagrams = [];              //array to hold the list of anagrams
    var numAnagrams = 1;            //total number of possible anagrams (calculated below)
    //var buildingArray = true;       //flag to determine when all possible anagrams have been found
    
    //determine the number of possible anagrams
    //factorial of the number of letters gives the total number of permutations
    for (i=1; i <= original.length; i++) {
        numAnagrams *= i;
    }
    
    //determine if there are duplicate letters and divide their permutations out of the total
    var tempWord = original;
    while (tempWord.length > 0) {
        var numOccurences = 1;      //number of times the first letter in the temp string occurs
        var occurenceDivisor = 1;  
        var dupePosition = tempWord.indexOf(tempWord[0], 1);    //compares the first letter of the temp string to the rest of the string and returns the index of the first match
        
        //if there is a match, update the number of occurences and divisor
        while (dupePosition !== -1) { 
            numOccurences++;
            occurenceDivisor *= numOccurences;  //divisor is the factorial of occurences
            //remove the duplicate letter from the temp string so it doesn't get counted again
            tempWord = tempWord.slice(0, dupePosition) + tempWord.slice(dupePosition + 1)
            //rerun the comparison on the remaining letters
            dupePosition = tempWord.indexOf(tempWord[0], 1);
        }
        
        //remove the first letter from the temp string before looping
        tempWord = tempWord.slice(1);
        
        numAnagrams = numAnagrams / occurenceDivisor;
    }
             
    return numAnagrams;
}

function createAnagrams() {
    var letterArray = letters.value.split('');  //original text as entered
    var selectorArray = []; //this array carries a sequence of index values used to extract letters from the original string
    var keepAnagramming = true; //this is a flag that tells the anagram builder when it's done
    var anagram = ''; //this variable holds temporary anagrams
    var anagramCollection = []; //this array holds all the valid anagrams
    var dupe = false; //flag to note that a new anagram has already been found
        
    
    //Build the initial selector array
    for (var i=0; i<letterArray.length; i++) {
        selectorArray.push(0);
    }
    
    //This is the main loop for building anagrams
    while (keepAnagramming) {
        
        //This loop builds a string by iterating through the selection indexes in the current selectorArray
        for (var position=0; position<selectorArray.length; position++) {
            anagram += letterArray.splice(selectorArray[position],1);
        }
        
        //if the new anagram already appears in the array, set flag to not add it
        for (j=0; j < anagramCollection.length; j++) {
            if (anagramCollection[j] === anagram) {
                dupe = true;
                break;
            }
        }
        
        //Store the new anagram and reset the temp variables
        if (!dupe) {anagramCollection.push(anagram);}
        anagram = '';
        dupe = false;
        letterArray = letters.value.split('');
        
        
        //This loop updates the selectorArray by checking current values from the end to the
        //beginning. If a value can be incremented, it is and the loop breaks; If a value is
        //at its max, it is reset to 0 and the loop continues to the next value. When the first
        //item in the array is about to increment past its max, the main anagrammer loop breaks. 
        for (position=selectorArray.length-2; position>=0; position--) {
            if (selectorArray[position] < (selectorArray.length - position - 1)) {
                selectorArray[position] = selectorArray[position] + 1;
                break;
                }
            else if (position == 0) {
                keepAnagramming = false;
            }
            else {
                    selectorArray[position] = 0;
            }
        }
    }
    
    writeResults(anagramCollection);
}
     
function writeResults(wordArray) {
    var resultsDiv = document.querySelector('#anagrams');
    var newPara;
    
    //clear out existing content in the results div
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }
    
    //insert each entry from the word array into a new paragraph
    for (i = 0; i < wordArray.length; i++) {
        newPara = resultsDiv.appendChild(document.createElement('p'));
        newPara.textContent = wordArray[i];
    }
}