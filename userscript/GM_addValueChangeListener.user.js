// ==UserScript==
// @name         Test for GM_addValueChangeListener
// @version      0.1
// @description  Script for Testing usage and browsercompatibility of GM_addValueChangeListener
// @author       Ralf Schmitt, ralf_schmitt@yahoo.de
// @match		 https://www.amnesty.org/en/
// @match		 https://www.eff.org/
// @run-at 		 document-idle
// @grant 		 GM_addValueChangeListener
// @grant 		 GM_setValue
// @grant 		 GM_getValue
//
// @history		 0.1 initial release
// ==/UserScript==

	(function() {
	    'use strict';
	    var urlstring;

	    // set some var in local storage
	    GM_setValue('foo','bar');

	    // add changelistener to var 'foo'
	    const listenerId = GM_addValueChangeListener('foo', (name, oldValue, newValue, remote) => {

	    	// here goes, what should happen, when value of 'foo' changes
	        console.log('GM_addValueChangeListener triggered:' + "\t" + 'Variable-Name: ' + name);
	        console.log("\t\t\t\t\t\t" + 'Old Value: ' + oldValue);
	        console.log("\t\t\t\t\t\t" + 'New Value: ' + newValue);
	        console.log("\t\t\t\t\t\t" + 'changed by other tab: ' + remote);
        });

	    urlstring = window.location.href;

	    // open console with ctrl + shift + j (for chrome and firefox)

	    // now if you open https://www.amnesty.org/
	    // you should get a modal 
	    if(urlstring.indexOf('amnesty') > 0){ alert(', page = amnesty, value: ' + GM_getValue('foo')); }
	    // then open new tab and go to https://www.eff.org/
	    // you should get 2 modals
	    // afterwards compare console-output on both tabs. Focus on "changed by other tab:" :-)
	    else if(urlstring.indexOf('eff') > 0){

	    	alert('page = eff, first call of \'foo\': ' + GM_getValue('foo'));
	    	GM_setValue('foo','barbarbar!');
	    	alert('page = eff, second call: ' + GM_getValue('foo'));
	    }
	})();


