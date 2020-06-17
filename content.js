/**
 * Author: Aaron Duffy
 * 
 * Functionality:
 * Used to process changes to the DOM and pull the user's CC text
 * for Google Meet meetings.
 */


// pull reference to the 'body' element from the DOM for observation
var elementToObserve = document.getElementsByTagName("body")[0];


//constants to hold tag class names
const ccDIV = 'a4cQT'; //constant to hold tag class for the cc DIV on the page.
const nameDIV = 'zs7s8d'; //constant to hold the tag class for the DIV holding the user's screen name.
const textDIV = 'iTTPOb'; //constant to hold the tag class for the DIV holding the user's screen text.
const textSPAN = 'CNusmb'; //constant to hold the tag class for the SPAN holding the user's screen text.

//Create an attendee list
var listOfAttendees = [];

// create a new instance of `MutationObserver` named `observer`, 
// passing it a callback function to be processed when changes are detected.
var observer = new MutationObserver(function(mutations) {
    console.log('callback that runs when observer is triggered');

    //pull a list of the CC DIV elements from the DOM
    var ccElements = elementToObserve.getElementsByClassName(ccDIV);

    //if a CC element is found in the DOM
    if (ccElements.length != 0 && ccElements[0].childNodes.length != 0) {
        //test script to show the number of people talking
        console.log("# people talking: " + ccElements[0].childNodes.length.toString()); //number of people talking

        /**
         * Need to update this to use a for loop to go through the speaker list
         * currently, only the last index in the array is selected
         * this will skip the index zero speaker and never finalize them
         */
        //variable to store array index for speaker
        //var elementToQuery = ccElements[0].childNodes.length - 1; //takes the array length and converts to index

        for (i = 0; i < ccElements[0].childNodes.length; i++) {

            //get the node collection that has the user names
            var userName = ccElements[0].getElementsByClassName(nameDIV); //there will only ever be one ccDIV element.  index is always zero

            //check if the username object exists
            if (userName[i]) {
                //get their screen name
                console.log('User Name: ' + userName[i].textContent.toString());
            }

            //get user text as array of nodes for the current speaker
            var userSpeach = ccElements[0].getElementsByClassName(textDIV);

            if (userSpeach[i]) {
                //pull count of the spans for the user
                //console.log("text Lines: " + userSpeach[0].getElementsByClassName(textSPAN).length);
                var textSpanArray = userSpeach[i].getElementsByClassName(textSPAN);

                //console.log('textSpanArray: ' + textSpanArray.length.toString());

                //see if the speaker is the current one, or a new speaker.
                if (isCurrentSpeaker(userName[i].textContent.toString())) {
                    //look at speaker's text array via a ref link to the array member
                    var person = listOfAttendees[(listOfAttendees.length - 1)];

                    //compare element by element with current 'array' of span elements
                    //first find the 'begining' of the array to search
                    if (person.text.length = 0) {
                        person.index = 0;
                    } else {
                        //if the current 'start' index text does not match the first SPAN text
                        if (person.text[person.index] != textSpanArray[0].textContent) {
                            //find where the first match is
                            //////look for first span text in array and store that index as first
                            for (var j = person.index; j < (person.text.length - person.index); j++) { //make sure it is not out of bounds
                                //if the text matches
                                if (person.text[j] == textSpanArray[0].textContent) {
                                    //capture the new index
                                    person.index = j;
                                    break;
                                }
                            }
                        } else {
                            //they do match
                        }
                    }

                    if (ccElements[0].childNodes.length > 1) {
                        if (i == 0) {
                            //finalize text for previous speaker
                            updateSpeakerText(person, textSpanArray, true);
                        } else {
                            //append text as normal
                            updateSpeakerText(person, textSpanArray, false);
                        }
                    } else {
                        //update the text for the current speaker object
                        updateSpeakerText(person, textSpanArray, false);
                    }

                } else {
                    //
                }

            }





            //if a difference is found, replace all elements in array, starting with that point forward
            //else, insert new text into end of array
            /*
            //get the nodes removed from the text area and take off the ones that are being updated, not the scrolled off ones.
            mutations.forEach(function(mutation) {
                //search for the text content in the span against the user's text array
                console.log('<rem> mutation length: ' + mutation.removedNodes.length.toString() + '<add> mutation length: ' + mutation.addedNodes.length.toString());
                //console.log(mutation.type.toString());

                if (mutation.removedNodes.length > 0) {
                    mutation.removedNodes.forEach(function(nodes) {
                        if (nodes.nodeName.toString() == "SPAN") {
                            console.log('removed node name: ' + nodes.nodeName.toString() + ' : ' + nodes.textContent);
                        }
                    });
                }

                if(mutation.addedNodes.length>0){
                    mutation.removedNodes.forEach(function(nodes){
                        nodes.
                    });
                }
            });
            */




            //get the nodes added and append them to the array
            //mutations.forEach(function(mutation) {
            //    console.log(mutation.addedNodes.getElementsByClassName(textSPAN).length.toString());
            //});

            for (i = 0; i < textSpanArray.length; i++) {
                //append text content to user's object
                //meetingAttendee[0].text = meetingAttendee[0].text + textStorage[i].textContent.toString();
                //console.log(textStorage[i].textContent.toString());
            }
        }

    } else if (listOfAttendees.length != 0) {
        //finalize person who dropped off the screen
        listOfAttendees[(listOfAttendees.length - 1)].finalized = true;
    }
});


// call `observe` on that MutationObserver instance, 
// passing it the element to observe, and the options object
observer.observe(elementToObserve, { subtree: true, childList: true });

// Later, you can stop observing
//observer.disconnect();
console.log('End of content.js');


/**
 * See if the speaker is the current one, or a new speaker (appends to speaker array).
 *
 * @param {string} varPerson The name of the speaker to check.
 * @return {boolean} Is this the current speaker?
 */
function isCurrentSpeaker(varPerson) {
    //create a variable to store the array's length
    var len = 0;

    //if there are people in the list of speakers
    if (listOfAttendees.length != 0) {
        //check to see if the speaker is the same
        if (listOfAttendees[(listOfAttendees.length - 1)].name.toString() != varPerson.toString()) {
            //push new person onto queue
            len = listOfAttendees.push(person = new MeetingAttendee(varPerson));
            return false;
        } else {
            //same person talking
            return true;
        }
    } else {
        //push new person into queue as this is the first person talking
        len = listOfAttendees.push(person = new MeetingAttendee(varPerson));
        return true;
    }
}

/**
 * Update the speakers text array and set finalized status.
 *
 * @param {MeetingAttendee} p The Speaker to check.
 * @param {HTMLCollection} t The array of SPAN elements of text
 * @param {boolean} b Finalize the text for the Speaker?
 */
function updateSpeakerText(p, t, b) {
    //reduce text array to correct size by removing changed items
    for (var i = p.text.length; i > p.index; i--) {
        //pop off the last element in the array
        p.text.pop();
    }

    //capture all of the span's text into the array, from array index person.index
    for (var i = 0; i < t.length; i++) {
        //push new text to end of the array
        p.text.push(t[i].textContent);
    }

    //set the finzlized value for the object
    p.finalized = b;
}