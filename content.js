function countOfDIV() {
    console.log('script file message:');
    //var divCounter = document.getElementsByClassName("a4cQT");
    console.log('count: ' + document.URL.toString());
}


//console.log('1 count: ' + document.URL.toString());

// pull reference to the 'body' element from the DOM for observation
var elementToObserve = document.getElementsByTagName("body")[0];
//var elementToObserve = document.getElementsByClassName('a4cQT')[0]; //this DIV that holds CC text

var meetingAttendee = { name, text };



// create a new instance of `MutationObserver` named `observer`, 
// passing it a callback function to be processed when changes are detected.
var observer = new MutationObserver(function() {
    console.log('callback that runs when observer is triggered');

    //pull a list of the CC DIV elements from the DOM
    var ccElements = elementToObserve.getElementsByClassName('a4cQT');

    //if a CC element is found in the DOM
    if (ccElements.length != 0) {
        //test log to show count of CC elements detected
        //console.log(ccElements.length);

        //get the number of child elements for each CC DIV tag in the list
        console.log(ccElements.toString());

        console.log(ccElements[0].childNodes.length.toString()); //number of people talking

        //ccElements[0].childNodes[0].childNodes.length.toString()

        //for each person talking
        for (i = 0; i < ccElements.length; i++) {
            var userName = ccElements[i].getElementsByClassName('zs7s8d');

            //check if the username object exists
            if (userName[0]) {
                //get their screen name
                console.log('User Name: ' + userName[0].textContent.toString());

                meetingAttendee[0].name = userName[0].textContent.toString();
            }

            //get user text as array of nodes
            var userSpeach = ccElements[i].getElementsByClassName('iTTPOb');

            if (userSpeach[0]) {
                console.log("text Lines: " + userSpeach[0].getElementsByTagName("span").length);
                var textStorage = userSpeach[0].getElementsByTagName("span");

                for (j = 0; j < textStorage.length; j++) {
                    //append text content to user's object
                    meetingAttendee[0].text = meetingAttendee[0].text + textStorage[j].textContent.toString();
                }
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