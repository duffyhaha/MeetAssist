/*
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

    /*
    //attempt to show all of the 'mutations' that were caught
    mutations.forEach(function(mutation) {
        console.log(mutation.removedNodes.length + ' nodes removed');
        for (var i = 0; i < mutation.removedNodes.length; i++) {
            console.log('  "' + mutation.removedNodes[i].textContent.trim() + ' Type:<' + mutation.removedNodes[i].nodeType.toString() + '>' + '" removed');
        }
    });
    */


    //pull a list of the CC DIV elements from the DOM
    var ccElements = elementToObserve.getElementsByClassName(ccDIV);

    //if a CC element is found in the DOM
    if (ccElements.length != 0 && ccElements[0].childNodes.length != 0) {
        //test script to show the number of people talking
        console.log("# people talking: " + ccElements[0].childNodes.length.toString()); //number of people talking

        //variable to store array index for speaker
        var elementToQuery = ccElements[0].childNodes.length - 1; //takes the array length and converts to index

        //get the node that has the user's name
        var userName = ccElements[0].getElementsByClassName(nameDIV); //there will only ever be one ccDIV element.  index is always zero

        //check if the username object exists
        if (userName[elementToQuery]) {
            //get their screen name
            console.log('User Name: ' + userName[elementToQuery].textContent.toString());
            //console.log('unique: ' + userName[0].getElementsByTagName('img')[0].getAttribute('data-iml').textContent.toString());
        }

        //get user text as array of nodes for the current speaker
        var userSpeach = ccElements[0].getElementsByClassName(textDIV);

        if (userSpeach[elementToQuery]) {
            //pull count of the spans for the user
            //console.log("text Lines: " + userSpeach[0].getElementsByClassName(textSPAN).length);
            var textStorage = userSpeach[elementToQuery].getElementsByClassName(textSPAN);

            console.log('textstorage: ' + textStorage.length.toString());

            //see if the speaker is the current one, or a new speaker.
            if (isCurrentSpeaker(userName[elementToQuery].textContent.toString())) {
                /**********notes on next functionality****************/
                //look at speaker's text array via a ref link to the array member
                var person = listOfAttendees[(listOfAttendees.length - 1)];

                //compare element by element with current 'array' of span elements
                //first find the 'begining' of the array to search
                if (person.text.length = 0) {
                    person.index = 0;
                } else {
                    //if the current 'start' index text does not match the first SPAN text
                    if (person.text[person.index] != textStorage[0].textContent) {
                        //find where the first match is
                        //////look for first span text in array and store that index as first
                        for (var i = person.index; i < (person.text.length - person.index); i++) { //make sure it is not out of bounds
                            //if the text matches
                            if (person.text[i] == textStorage[0].textContent) {
                                //capture the new index
                                person.index = i;
                                break;
                            }
                        }
                    } else {
                        //they do match
                    }
                }

                //reduce text array to correct size by removing changed items
                for (var i = person.text.length; i > person.index; i--) {
                    //pop off the last element in the array
                    person.text.pop();
                }

                //capture all of the span's text into the array, from array index person.index
                for (var i = 0; i < textStorage.length; i++) {
                    //push new text to end of the array
                    person.text.push();
                }




                //////if that span's text does not match the index stored as first, 
                ////////////find the index that matches the span's text and store the index as first
                //////else, the first span is still on the screen and the text has not rolled off yet (compare as normal, else compare from first index)
            } else {
                //
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

            for (i = 0; i < textStorage.length; i++) {
                //append text content to user's object
                //meetingAttendee[0].text = meetingAttendee[0].text + textStorage[i].textContent.toString();
                //console.log(textStorage[i].textContent.toString());
            }
        }

    }

});


// call `observe` on that MutationObserver instance, 
// passing it the element to observe, and the options object
observer.observe(elementToObserve, { subtree: true, childList: true });

// Later, you can stop observing
//observer.disconnect();
console.log('End of content.js');


//function to see if the speaker is the current one, or a new speaker.
//takes a string name as the argument
function isCurrentSpeaker(varPerson) {
    //create a variable to store the array's length
    var len = 0;

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
        //push new person into queue
        len = listOfAttendees.push(person = new MeetingAttendee(varPerson));
        return false;
    }
}