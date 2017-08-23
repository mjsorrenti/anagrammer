var letters = document.getElementById('letterinput');
var button = document.getElementById('run');
button.addEventListener('click', createAnagrams);

function createAnagrams() {
    var original = letters.value;   //original text as entered
    var anagrams = [];              //array to hold the list of anagrams
    var numAnagrams = 1;            //total number of possible anagrams (calculated below)
    var buildingArray = true;       //flag to determine when all possible anagrams have been found
    
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
             
    
     
    //loop to build the array of possible anagrams
    while (buildingArray) {
        
        //get a new anagram
        var testAnagram = randomWord(original);
 
        //if the new anagram already appears in the array, remove the original instance before inserting the new instance
        for (j=0; j < anagrams.length; j++) {
            if (anagrams[j] === testAnagram) {anagrams.splice(j, 1);}
        }
    
        //insert the new anagram in the array
        anagrams.push(testAnagram);
                
        //check to see if all possible anagrams have been calculated
        if (anagrams.length >= numAnagrams) {buildingArray = false;}
    }
    

    writeResults(anagrams);
}

function randomWord(input) {
    //construct a new anagram by randomly picking apart the letters in the input string and reassembling them in a new string
    var tempWord = input;
    var newWord = '';
    for (i = 0; i < input.length; i++) {
        var index = Math.floor(Math.random()*tempWord.length);
        var extractedLetter = tempWord[index];
        newWord = newWord + extractedLetter;
        tempWord = tempWord.slice(0,index) + tempWord.slice(index+1);
        }
    return newWord;
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