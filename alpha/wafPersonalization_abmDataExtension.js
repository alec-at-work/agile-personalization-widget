(function abmEnablement(){

window.adskAbm = window.adskAbm || {};
window.adskAbm.app = window.adskAbm.app || {};

// other Tealium objects
window.utag_data = window.utag_data || {}; 
window.adskGdpr = window.adskGdpr || {};

window.utag = window.utag || {};
window.utag.globals = window.utag.globals || {};
window.utag.globals.dle = window.utag.globals.dle || {};
window.utag.globals.dle.enrichments = window.utag.globals.dle.enrichments || {};

/**** URL CONFIGS 
    detect some URL parameter Configs...

    - ?abmUseSid=###### -> force use of a SID for API / Data Layer
    *************/

var params = document.location.search,
    forceSidUse = params.indexOf('abmUseSid') > -1 ? true : false,
    forceMsgUse = params.indexOf('abmUseMsg') > -1 ? true : false,
    forceUseAlias = params.indexOf('abmUseAlias') > -1 ? true : false,
    forceDemoMsg = params.indexOf('forceWidgetMsg') > -1 ? true : false;

// order of preference, in case multiple are used
if (forceSidUse) {
    window.adskAbm.app.spoof = true;
    window.adskAbm.app.sid = (params.split('abmUseSid=')[1]).split('&')[0];
}
if (forceMsgUse) {
    window.utag_data.abm_data_ready = 'true';
}
if (forceUseAlias) {
    window.widgetForceAlias = window.utag_data.account_marketing_alias = decodeURI((params.split('abmUseAlias=')[1]).split('&')[0]);
}
if (forceDemoMsg) {
    window.forceDemoMsg = true;
}

// a global flag, to make turning an additional EVENT HOOK ON / OFF
// to use this, put another extension that sets this value to TRUE
window.__abmEventOn = window.__abmEventOn || false;

// function to WAIT and DETECT if this should run
// default TIMEOUT is 2 minutes...
var abmInterval = 500,
    abmTimeout = 120000,
    abmElapsed = 0;
    abmCheck = setInterval(function(){
        if (window.adskGdpr.gdprCheck) {
            // use an override if there...
            if (window.adskAbm.app.spoof) {
                clearInterval(abmCheck);
                getSidRecord(window.adskAbm.app.sid);
            }
            else if (typeof window.___companyData !== "undefined" && window.___companyData !== "non") {
                clearInterval(abmCheck);
                setTimeout(function(){
                    if (window.adskGdprAnalytics && window.adskGdprAdvertising) {
                
                        // get the key and run with it...
                        if (typeof window.___companyData.dbSID !== "undefined") {
                            getSidRecord(window.___companyData.dbSID);
                        }
                    }
                }, 100);
            }
        }    
        else if (abmElapsed >= abmTimeout) {
            clearInterval(abmCheck);
        } else {
            console.info('abm timer going: ' + abmElapsed + 'ms');
            abmElapsed += abmInterval;
        }
    }, abmInterval);

// function to get the Tealium UTAG JS resource
function getSidRecord(key) {

    window.adskAbm.app.sid = key;
    var key = 'dbsid-' + key;
    console.log('attempting to get data for : ' + key);
    var getData = document.createElement('script');
    getData.src = 'https://tags.tiqcdn.com/dle/autodesk/zzz-wap-dev/' + key + '.js?' + Math.round(Math.random() * 99999999);
    document.getElementsByTagName('body')[0].appendChild(getData);
    // console.log(utag.globals.dle.enrichments); 
    fetchSidData(key);
};

// check for the script and then do custom consumption of data
function fetchSidData(key) {
    let waiting = setInterval(function(){
        // Look through scripts to match the one included...
        var scripts = document.getElementsByTagName("script");  
        for (var i = 0; i < scripts.length; i++ ) {
            // find the JS script
            if (scripts[i].src.indexOf(key + '.js') > -1) {
                consumeSidData(key);
                clearInterval(waiting);
            }
        }
    }, 50);
}

// function to consume the data, once it's avaiable
// put the "account_" keys into UTAG_DATA
// also fires an optional event
function consumeSidData(key) {

    window.utag = window.utag || {};
    window.utag.globals = window.utag.globals || {};
    window.utag.globals.dle = window.utag.globals.dle || {};
    window.utag.globals.dle.enrichments = window.utag.globals.dle.enrichments || {};

    console.log('attempting to consumeSidData()');
    var data = window.utag.globals.dle.enrichments[key];
    console.log(data);
    if (typeof data === "object") {
        console.log('processing the data...');
        processAbmData(data);
    } else {
        console.log('no data yet, will run again in 100ms');
        setTimeout(function(){
            consumeSidData(key)
        }, 100);
    }
};

// a process method, for reals
function processAbmData(data) {
    for (var index in data) {
        window.utag_data[index] = data[index];
    };
    // utag flag
    window.utag_data.abm_data_ready = 'true';
    // condition inclusion of an event....
    if (window.__abmEventOn && typeof window.utag.link === "function") {
        console.info('triggering the ABM Event (abm-data-ready)');
        window.utag_data.event_name = 'abm-data-ready';
        window.utag.link(window.utag_data);
    }
};

})();