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
    if (ccElements.length != 0) {
        //test script to show the number of people talking
        console.log("# people talking: " + ccElements[0].childNodes.length.toString()); //number of people talking

        //ccElements[0].childNodes[0].childNodes.length.toString()

        //get the node that has the user's name
        var userName = ccElements[0].getElementsByClassName(nameDIV);

        //check if the username object exists
        if (userName[0]) {
            //get their screen name
            console.log('User Name: ' + userName[0].textContent.toString());

        }

        //get user text as array of nodes for the current speaker
        var userSpeach = ccElements[0].getElementsByClassName(textDIV);

        if (userSpeach[0]) {
            //pull count of the spans for the user
            console.log("text Lines: " + userSpeach[0].getElementsByTagName("span").length);
            var textStorage = userSpeach[0].getElementsByTagName("span");

            console.log(textStorage.length.toString());

            for (j = 0; j < textStorage.length; j += 2) {
                //append text content to user's object
                //meetingAttendee[0].text = meetingAttendee[0].text + textStorage[j].textContent.toString();
                //console.log(textStorage[j].textContent.toString());
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
function isCurrentSpeaker(varPerson) {
    //create a variable to store the array's length
    var len = 0;

    if (listOfAttendees.length != 0) {
        //check to see if the speaker is the same
        if (listOfAttendees[0].name.toString() != varPerson.toString()) {
            //push new person into queue
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