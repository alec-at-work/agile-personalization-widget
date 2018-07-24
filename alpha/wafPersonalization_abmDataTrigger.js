(function abmEnrichmentTrigger(){

/* Cookie Methods */
function checkCookie(n){for(var t=n+"=",e=document.cookie.split(";"),r=0;r<e.length;r++){for(var i=e[r];" "===i.charAt(0);)i=i.substring(1,i.length);if(0===i.indexOf(t))return i.substring(t.length,i.length)}return!1};
function setCookie(e,o,n){void 0===n&&(n=null);var t=new Date;t.setTime(t.getTime()+24*n*60*60*1e3);var i=null===n?"":"expires="+t.toUTCString(),a=encodeURIComponent(o);document.cookie=e+"="+a+"; "+i+";domain="+utag.cfg.domain+";path=/"};

window.adskAbm = window.adskAbm || {};
window.adskAbm.app = window.adskAbm.app || {};
window.adskWafPersonalizeMsgRan = window.adskWafPersonalizeMsgRan || false;

if (!window.adskAbm.app.loaded) {
    window.adskAbm.app.loaded = true;
    window.adskAbm.app.spoof = window.adskAbm.app.spoof || false;

    window.utag_data = window.utag_data || {};

    /**** URL CONFIGS 
    	detect some URL parameter Configs...

    	- ?abmUseMsg=[app config string] -> force use of an window.adskWafPersonalizeConfig config
    	*************/

    var params = document.location.search,
        forceSidUse = window.adskAbm.app.spoof || params.indexOf('abmUseSid') > -1 ? true : false,
        forceMsgUse = params.indexOf('abmUseMsg') > -1 ? true : false,
        stopAutoTrigger = params.indexOf('abmDisableAuto') > -1 ? true : false,
        forceDemoMsg = params.indexOf('forceWidgetMsg') > -1 ? true : false,
        forceMessage = false;

    // order of preference, in case multiple are used
    if (forceSidUse) {
        forceMsgUse = false;
    } else if (forceMsgUse) {
        forceMessage = (params.split('abmUseMsg=')[1]).split('&')[0];
    }
    if (forceDemoMsg) {
        window.forceDemoMsg = true;
    }

    // force logic for messaging
    if (forceMessage && window.adskWafPersonalizeConfig[forceMessage]) {
        window.utag_data.account_online_message = forceMessage;
    }

    // LOGIC to see if we run it....
    if (typeof window.utag_data.account_online_message !== "undefined") {
        if (window.utag_data.account_online_message !== "none") {
            try {

                // cancel conditions
                    var clickParamDetected = document.location.search.indexOf('abmCampaignClicked') > -1 ? true : false,
                        clickCookieDetected = checkCookie('adsk_abm_click') ? true : false,
                        cancel = clickParamDetected || clickCookieDetected || stopAutoTrigger || false;
                        
                    if ((!cancel && !window.adskWafPersonalizeMsgRan) || window.forceDemoMsg) {
                        window.adskWafPersonalizeMsgRan = true;
                        console.log('[ABM App] will load ABM messaging in 3 seconds');
                        setTimeout(function() {
                            console.log('[ABM App] attempting to load messaging for: ' + window.utag_data.account_online_message);
                            window.adskWafPersonalizeMsg(window.utag_data.account_online_message, 'abm-tealium-flow');
                        }, 3000);
                    } else {
                        // see if a clickCancelCookie needs setting...
                        if (clickParamDetected && !clickCookieDetected) {
                            
                            console.warn("ADSK WAF PERSONALIZAITON -> Click Cookie not being set for now...");
                            // setCookie('adsk_abm_click', 'y', null);
                        }
                    }

                
            } catch (err) {
                console.warn("[ABM App] ERROR in the ABM Message Generator");
                console.warn("[ABM App] error = " + err.message);
            }
        }
    }
}

})();