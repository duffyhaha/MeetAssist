//define a constructor method for the attendee objects
function MeetingAttendee(n) {
    this.name = n;
    this.text = [];
}

MeetingAttendee.prototype = {
    toString: function() { return "(" + this.name + ") : " + this.text.toString(); }
};