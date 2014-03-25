//var url = "https://raw.github.com/g0v/twlyparser/master/data/mly-8.json";
//sortable table solution: http://jsfiddle.net/VAKrE/105/

(function(window, document, $){

"use strict";

var dataCache;
var url = "data/mly-8.json";

var iso3166tw = {
    "CHA": "彰化縣",
    "CYI": "嘉義市",
    "CYQ": "嘉義縣",
    "HSQ": "新竹縣",
    "HSZ": "新竹市",
    "HUA": "花蓮縣",
    "ILA": "宜蘭縣",
    "KEE": "基隆市",
    "KHH": "高雄市",
    "KHQ": "高雄市",
    "MIA": "苗栗縣",
    "NAN": "南投縣",
    "PEN": "澎湖縣",
    "PIF": "屏東縣",
    "TAO": "桃園縣",
    "TNN": "台南市",
    "TNQ": "台南市",
    "TPE": "台北市",
    "TPQ": "新北市",
    "TTT": "台東縣",
    "TXG": "台中市",
    "TXQ": "台中市",
    "YUN": "雲林縣",
    "JME": "金門縣",
    "LJF": "連江縣"
}

var constituencyParser = function (constituency) {
    var result;
    switch (constituency[0]) {
    case 'proportional':
        return '全國不分區';
    case 'aborigine':
        return '山地原住民';
    case 'foreign':
        return '僑居國外國民';
    default:
        if (iso3166tw[constituency[0]]) {
            if (constituency[1] == 0) {
                return iso3166tw[constituency[0]];
            } else {
                return iso3166tw[constituency[0]] + '第' + constituency[1] + '選區';
            }
        } else {
            return constituency[0] + '<br>' + constituency[1];
        }
    }
};

var partyParser = function (party) {
    switch (party) {
    case 'KMT':
        return '中國國民黨';
    case 'DPP':
        return '民主進步黨';
    case 'TSU':
        return '台灣團結聯盟';
    case 'PFP':
        return '親民黨';
    case 'NSU':
        return '無黨團結聯盟';
    default:
        if (party === null){
            return '無黨籍';
        }else{
            return '不明';
        }
    }
};

// function sortResults(prop, asc) {
//     dataCache = dataCache.sort(function(a, b) {
//         if (asc) return (a[prop] > b[prop]);
//         else return (b[prop] > a[prop]);
//     });
//     showResults();
// }

// $(function() {
//     $('#contact-list th').click(function() {
//         var id = $(this).attr('id');
//         var asc = (!$(this).attr('asc')); // switch the order, true if not set

//         // set asc="asc" when sorted in ascending order
//         $('#contact-list th').each(function() {
//             $(this).removeAttr('asc');
//         });
//         if (asc) $(this).attr('asc', 'asc');

//         sortResults(id, asc);
//     });

//     //showResults();
// });

function showResults(){
    $('#results').html('');
    /*
        Structure:

        <article>
            <header>
                <img alt="avatar">
                <h1>Legislator name</h1>
                <h2><small>Party<br>Zone</small></h2>
            </header>
            <main>
                Telephone data
            </main>
        </article>

    */

    var html = '';
    $.each(dataCache, function (key, val) {
        html += '<article class="row">';
        html +=   '<div class="col-xs-1">'
        html +=     '<img src="' + val['avatar'] + '" alt="' + val['name'] + '" class="img-circle">';
        html +=   '</div>'
        html +=   '<header class="col-xs-3">';
        html +=     '<h1>' + val['name'] + '</h1>';
        html +=     '<h2><small>' + partyParser(val['party']) + '<br>' + constituencyParser(val['constituency']) + '</small></h2>';
        html +=   '</header>';

        var contact = val['contact'];
        html += '<main class="col-xs-8">';
        $.each(contact, function (key, val) {
            key = $.trim(key);
            if(key){
                html = html + '<div class="contact"><h3>' + key + '</h3>';
                if (val['phone'] != undefined){
                    html = html + '電話：<a href="tel:' + val['phone'] + '">' + val['phone'] + '</a><br>';
                }
                if (val['address'] != undefined){
                    html = html + '地址：<a href="http://maps.google.com.tw/?q=' + val['address'] + '">' + val['address'] + '</a>';
                }
                if (val['fax'] != undefined){
                    html = html + '<br>傳真：<a href="fax:' + val['fax'] + '">' + val['fax'] + '</a>';
                }
                html = html + '</div>';
            }
        });
        html += '</main></article>';
    });
    $('#results').append(html);
}

$.getJSON(url, function (data) {
    dataCache=data;
    showResults();
});

$('.sidebar').affix({
    offset: {top: 60}
});
}(window, document, jQuery));
