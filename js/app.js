

window.utag = window.utag || {};
utag.globals = utag.globals || {};
utag.globals.dle = utag.globals.dle || {};
utag.globals.dle.enrichments = utag.globals.dle.enrichments || {};

window.utag_data = window.utag_data || {};

window.activeAccountStrategy = false;
window.activeAbmData = false;
window.abmKeySID = false;

// Device Handling
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
var handleDeviceClick = isMobile ? 'touchend' : 'click';

// for an alias use
var params = document.location.search,
    forceUseAlias = params.indexOf('abmUseAlias') > -1 ? true : false;
if (forceUseAlias) {
    window.widgetForceAlias = window.utag_data.account_marketing_alias = decodeURI((params.split('abmUseAlias=')[1]).split('&')[0]);
}

function slideOutput(close, open) {
    if (close) {
        console.log("CLOSING!");
        close.slideToggle(function(e){
            close.removeClass('output-visible').addClass('hidden');
        });    
    }
    if (open) {
        console.log("OPENING!!");
        open.slideToggle(function(e){
            open.removeClass('hidden').addClass('output-visible');
        });
    }

};

$('#input-run').on(handleDeviceClick, function(e){
    runFetch();
});

// function to run the fetching of data
function runFetch() {
    $('#output-data-raw').html('');
    slideOutput($('.output-visible'), $('#output-fetching'));
    try {
        var sid = $('#input-sid').val().trim().length > 0 ? $('#input-sid').val().trim() : false,
            csn = $('#input-csn').val().trim().length > 0 ? $('#input-csn').val().trim() : false,
            duns = $('#input-duns').val().trim().length > 0 ? $('#input-duns').val().trim() : false
            useId = sid ? sid : (csn ? window.abm.lookup.csn[csn] : (duns ? window.abm.lookup.duns[duns] : false));

        console.log(sid);
        console.log(csn);
        console.log(duns);

        if (useId) {
            var lookType = sid ? 'SID' : (csn ? 'CSN' : (duns ? 'DUNS' : 'nothing'));
            console.log('grabbing the data for SID: ' + useId + ' derived from the ' + lookType + ' value');
            getSidRecord(useId);
        } else if (!sid && !csn && !duns) {
            slideOutput($('#output-fetching'), $('#output-initial'));
        }
        else {
            console.log("no SID mapping found");
            slideOutput($('#output-fetching'), $('#output-no-sid'));
        }
    } catch(err) {
        console.log("ERROR");
        console.log(err.message);
        slideOutput($('#output-fetching'), $('#output-error'));
    }
}


// function to get the Tealium UTAG JS resource
function getSidRecord (key) {
    window.abmKeySID = key;
    var key = 'dbsid-' + key;
    console.log('attempting to get data for : ' + key);
    var getData = document.createElement('script');
    getData.src = 'https://tags.tiqcdn.com/dle/autodesk/zzz-wap-dev/' + key + '.js?' + Math.round(Math.random() * 99999999);
    document.getElementsByTagName('body')[0].appendChild(getData);
    console.log(utag.globals.dle.enrichments); 
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
                clearInterval(waiting);
                setTimeout(function(){
                    consumeSidData(key);    
                }, 1500);
            }
        }
    }, 50);
}

// function to consume the data, once it's avaiable
function consumeSidData(key) {
    var data = utag.globals.dle.enrichments[key];
    console.log(key);
    console.log(data);

    var testerData = key.indexOf('test') > -1 ? true : false;

    if (typeof data !== "undefined") {
        window.utag_data = window.utag_data || {}; 
        for (var index in data) {
            // console.log(index);
            window.utag_data[index] = data[index];
            if (index === "account_online_message") activeAccountStrategy = data[index];
            if (testerData && index === "account_name") {
                window.___companyData = {
                    'marketingAlias' : data[index]
                };
            }
        };
        console.log(data);
        window.activeAbmData = data;
        // $('#output-data-raw').html(JSON.stringify(data, null, 2));
        populateDataToUi(data);
        slideOutput($('#output-fetching'), $('#output-data'));
    } else {
        slideOutput($('#output-fetching'), $('#output-no-data'));
    }

    
};

// function to build out the existing data fields
function populateDataToUi(data) {

    console.log("is there data?");
    console.log(data || 'no data');

    var strategySelected = false;
    $('#output-data-raw').html('');

    for (var key in data) {
        console.log(key + ' -> ' + data[key]);
        
        let pairEl = $('<div class="abm-data-pair" data-abm-field="' + key + '" />'),
            keyEl = $('<div class="abm-data-key" />'),
            valEl = $('<div class="abm-data-val" />');
            
        if (key === "account_online_message") {
            let valInput = $('<select id="abm-strategy-select"> \
                    <option value="none">None</option> \
                    <option value="subscription-benefits">Subscription Benefits</option> \
                    <option value="special-offer">Special Offer</option> \
                    <option value="maintenance-to-subscription">Maintenance to Subscription</option> \
                    <option value="industry-collection-m_and_e">Collection: M & E</option> \
                    <option value="industry-collection-pd_and_m">Collection: PD & M</option> \
                    <option value="industry-collection-aec">Collection: AEC</option> \
                    <option value="contact-sales-rep-amer">Contact AMER Sales</option> \
                    <option value="contact-sales-rep-emea">Contact EMEA Sales</option> \
                    <option value="contact-sales-rep-apac">Contact APAC Sales</option> \
                    <option value="tester">Tester</option> \
                </select> \
                <button id="abm-strategy-save">Update</button>');    
    
                strategySelected = data[key];
            // let valInput = $('<input type="text" \
               //     data-abm-value="' + data[key] + '" \
                 //   value="' + data[key] + '" />');
            valEl.append(valInput);
        } else {
            valEl.html(data[key]);
        }
        keyEl.html(key);
        pairEl.append(keyEl).append(valEl);
        $('#output-data-raw').append(pairEl);

    };

    // add a status bar
    $('#output-data-raw').append('<div id="abm-strategy-save-status" class="hidden"> Saving... </div>');

    // now pick it
    let pickIts = $('#abm-strategy-select option');
    console.log("pickits = " + pickIts);
    console.log(pickIts.length);
    console.log(pickIts);
    $.each(pickIts, function(ind, obj){
        if (obj.value === strategySelected) {
            obj.selected = true;
        }
    });

};

// method to rebuild the ABM data package
function buildAbmDataPackage(newStrategy) {
    window.activeAbmData['account_online_message'] = newStrategy;
    return window.activeAbmData;
};

// status when editing single message
function editMessage(response){
    try { 
        var reset = false;
        if (response.status == 200) {
            $('#abm-strategy-save-status').html('<span style="color:green;">SAVED!</span>');
            $('#abm-strategy-save-status').css('background-color','GreenYellow');
        } else {
            $('#abm-strategy-save-status').html('<span style="color:FireBrick;">Error in saving...</span>')
            $('#abm-strategy-save-status').css('background-color','Salmon');
            reset = true;
        }
        setTimeout(function(){
            $('#abm-strategy-save-status').slideToggle();
            if (reset) {
                // $('#output-data').slideToggle();
                runFetch();    
            }
        },2000)
    } catch(err) {
        console.log("ERROR in the Done Function for the ABM Data update");
    }
    
};

// enable updating of the STRATEGY thing
$(document).on(handleDeviceClick, '#abm-strategy-save', function(e){

    let newStrategy = $('#abm-strategy-select option:selected').val();
    
        console.log("old strategy = " + activeAccountStrategy);
        console.log("new strategy = " + newStrategy);

    if (newStrategy !== activeAccountStrategy) {
        activeAccountStrategy = newStrategy;
        $('#abm-strategy-save-status').slideToggle();
        let newAbmData = buildAbmDataPackage(newStrategy);
        window.abmDataUpdate(window.abmKeySID, newAbmData, editMessage);

    } else {
        console.log('no update needed...');
    }

});


// bulk Upload
window.bulkUploadValids = false;
window.bulkUploadInvalids = false;
$("#abm-upload-form").on("submit",function(e){
    e.preventDefault();
    var fileObj = $('#abm-bulk-upload-file'),
        theFile = fileObj[0].files[0];

    $('#abm-upload-submit').slideToggle(function(e){
        $('#abm-upload-status').show();
    });

    Papa.parse(theFile, {
        header: true,
        complete: function(results) {
            window.bulkUploadValids = []; 
            window.bulkUploadInvalids = [];
            console.log("Finished:", results.data);
            window.inputData = results.data;
            $.each(inputData, function(index, obj){
                validateRow(obj);
            });

            console.log("valids");
            console.log(window.bulkUploadValids);
            console.log("invalids");
            console.log(window.bulkUploadInvalids);

            runBulkUpload(window.bulkUploadValids)
        }
    });
});

// make sure all fields are there
function validateRow(record) {
    if (record.sid 
        && record.account_name 
        && record.account_type
        && record.account_industry
        && record.account_segment
        && record.account_sales_rep
        && record.account_hq_geo
        && record.account_online_message) {
        console.log('found a valid record');
        window.bulkUploadValids.push(record);
    } else {
        console.log('found invalid record');
        window.bulkUploadInvalids.push(record);
    }
}

function doneBulk() {
    recordsProcessed += 1;
    console.log('progress = ' + recordsProcessed / bulkRecordsInUpload);
    console.log(recordsProcessed + " / " + bulkRecordsInUpload + " left = " + bulkRecordsLeft);
    // $('#abm-upload-status').html(recordsProcessed + " / " + bulkRecordsInUpload + ' processed');
    var percentDone = (Math.floor((recordsProcessed / bulkRecordsInUpload) * 100) + '%').toString();
    $('#abm-upload-status-complete').css('width',percentDone);
    if (recordsProcessed === bulkRecordsInUpload) {
        $('#abm-upload-status').html('Done!');
        setTimeout(function(){
            $('#abm-upload-status').slideToggle(function(e){
                $('#abm-upload-submit').show();
            });
        },2000);
    }
}

var bulkRecordsInUpload = false,
    bulkRecordsLeft = false,
    recordsProcessed = false;
function uploadBulk(set) {
    let thisOne = set.shift();
    bulkRecordsLeft -= 1;
    console.log(thisOne);
    if (thisOne) {
        let sid = thisOne.sid;
        delete thisOne.sid;

        console.log(thisOne);
        window.abmDataUpdate(sid, thisOne, doneBulk);
        /*
        window.abmDataUpdate(sid, {
            account_name : thisOne.account_name,
            account_type : thisOne.account_type,
            account_industry : thisOne.account_industry,
            account_segment : thisOne.account_segment,
            account_sales_rep : thisOne.account_sales_rep,
            account_hq_geo : thisOne.account_hq_geo,
            account_online_message : thisOne.account_online_message
        }, doneBulk);
        */
        // pace of ten per second
        setTimeout(function(){
            uploadBulk(set);
        },100);
    }
};

function runBulkUpload(set){
    recordsProcessed = 0;
    bulkRecordsInUpload = set.length;
    bulkRecordsLeft = set.length;
    uploadBulk(set);
}

// menu control
$('.menu-link').on(handleDeviceClick, function(e){
    var but = $(e.target);
    if (but.hasClass('active-section')) return;
    else {
        var open = but.attr('data-app-section');
        $('.app-section').addClass('hidden');
        $('#' + open).removeClass('hidden');
        $('.menu-link').removeClass('active-section');
        but.addClass('active-section');
    }
});

// demo buttons
$('[data-abm-demo]').on(handleDeviceClick, function(e){

    var demoConfig = $(this).attr('data-abm-demo'),
        customs = false,
        valid = true;
    if (demoConfig === "copy") {
        var copyText = document.getElementById("custom-json-input");
        copyText.select();
        document.execCommand("copy");
        alert("Copied the config: " + copyText.value);

        // Google Tagging...
        gtag('event', 'Copy Custom Config', {
          'event_category': 'Message Development'
        });

        return;
    }
    if (demoConfig === "custom") {
        if (!$("#custom-error").hasClass('hidden')) {
            $("#custom-error").fadeOut(function(){
                $("#custom-error").addClass('hidden');
            });
        }
        try {
            customs = JSON.parse($('#custom-json-input').val());  
            // Google Tagging...
            gtag('event', 'Valid config', {
              'event_category': 'Message Development'
            });  
        } catch(err) {
            valid = false;
            $("#custom-error").html(err.message);
            $("#custom-error").fadeIn(function(){
                $(this).removeClass('hidden');
                
                // Google Tagging...
                gtag('event', 'Invalid config', {
                  'event_category': 'Message Development',
                  'event_label' : err.message
                });  

                $(this).on(handleDeviceClick, function(e){
                    $(this).fadeOut(function(){
                        $(this).addClass('hidden');
                    });
                });
            })
            // console.log(err);
            // alert(err.message);
            return;
        }
        
    }
    // remove one if there
    if ($('#waf-pers-bubble-holder').length > 0) {
        $('#waf-pers-bubble-holder').fadeOut(function(){
            $('#waf-pers-bubble-holder').remove();

            userEneteredAlias();
            window.adskWafPersonalizeMsg(demoConfig, 'demo', customs);
        });    
    }
    else {
        userEneteredAlias();
        window.adskWafPersonalizeMsg(demoConfig, 'demo', customs);
    }

    // track it 
    if (valid) {
        if (demoConfig === "custom") {
            // Google Tagging...
            gtag('event', 'Custom Config Shown', {
              'event_category': 'Message Development'
            });  
        } else {
            gtag('event', 'Demo Config Shown', {
              'event_category': 'Widget Examples',
              'event_label' : demoConfig
            });  
        }
    }
    
});

function userEneteredAlias() {
    var userVal = $("#custom-alias-input").val();
    if (userVal && userVal !== "") {
        window.___companyData = window.___companyData || {};
        window.___companyData.marketingAlias = userVal;   
    }
    
};

function replacer(key, value) {
    console.log(key);
    // return key.replace(/"/g, '');
    var newKey = key.replace(/"/g, ''); 
    console.log(newKey);
    return (newKey, value);
};


// apply the CUSTOM JSON to the placeholder:
var jsonPlaceholder = JSON.stringify({
    personalize : false,
    style : {
        palette : "waf-pers-generic-palette-red",
        width: 300
    },
    banner : {
        text : 'Banner text here'
    },
    primaryMessage : {
        link : false,
        text : " [primary message] "
    },
    primaryCta : {
        link : false,
        text : " [cta #1] "
    },
    secondaryMessage : {
        link : false,
        text : " [secondary message] "
    },
    secondaryCta : {
        link : false,
        text : " [cta #2] "
    },
    closeText : " [close] ",
    personalizations : {
        banner : " Custom text replaces ##marketingAlias## with the Marketing Alias",
        secondaryMessage : "Custom text replaces ##marketingAlias## with the Marketing Alias",
        logo : false
    }
// }, null, 4);
}, replacer, 4);

$('#custom-json-input').val(jsonPlaceholder);

function showLoc() {
    bubEl = $("#waf-pers-bubble-holder");
    console.info(bubEl.position());
}
