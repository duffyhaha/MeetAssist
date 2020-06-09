// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//'use strict';

// When the extension is installed or upgraded ...

var a = 0;

chrome.runtime.onInstalled.addListener(function() {

    console.log('onInstalled.addListener');

    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

        console.log('onPageChanged.removeRules');

        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([{
            // That fires when a page's HOST is 'meet.google.com' ...
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'meet.google.com',
                        schemes: ['https']
                    }
                })
            ],
            // And shows the extension's page action.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
        a++;
    });
    console.log(a.toString());
});

console.log('end');