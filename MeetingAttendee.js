//define a constructor method for the attendee objects
function MeetingAttendee(n) {
    this.name = n; //used to capture user's screen name
    this.text = []; //used to store all CC text
    this.index = 0;
    this.finalized = false; //store if text should be considered final.
}

MeetingAttendee.prototype = {
    toString: function() { return "(" + this.name + ") : " + this.text.toString(); }
};