# anagrammer
The code in the "random" branch uses an algorithm that randomly generates an anagram, checks to see if that anagram has already been generated, then continues until the total possible number of anagrams have been guessed.

The code is relatively straightforward, but not very performant for anagrams longer than 7 or 8 letters: with tens of thousands of possible anagrams, guessing a new anagram becomes less and less likely late in the process.
