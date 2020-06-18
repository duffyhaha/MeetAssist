// Saves options to chrome.storage
function save_options() {
    var talkKey = document.getElementById('p2tKey').value;
    var p2tEnable = document.getElementById('p2t').checked;
    chrome.storage.sync.set({
        talkKey: talkKey,
        p2tEnable: p2tEnable
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        talkKey: '`',
        p2tEnable: true
    }, function(items) {
        document.getElementById('p2tKey').value = items.talkKey;
        document.getElementById('p2t').checked = items.p2tEnable;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);