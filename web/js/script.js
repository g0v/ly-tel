//var url = "https://raw.github.com/g0v/ruby_twly_crawler/master/data/mly-10.json";
//sortable table solution: http://jsfiddle.net/VAKrE/105/
var url = "data/mly-10.json";
var data_cache = undefined;

iso3166tw = {
    "CHA": "彰化縣",
    "CYI": "嘉義市",
    "CYQ": "嘉義縣",
    "HSQ": "新竹縣",
    "HSZ": "新竹市",
    "HUA": "花蓮縣",
    "ILA": "宜蘭縣",
    "KEE": "基隆市",
    "KHH": "高雄市",
    "KHQ": "高雄縣",
    "MIA": "苗栗縣",
    "NAN": "南投縣",
    "PEN": "澎湖縣",
    "PIF": "屏東縣",
    "TAO": "桃園市",
    "TNN": "台南市",
    "TNQ": "台南縣",
    "TPE": "台北市",
    "TPQ": "新北市",
    "NWT": "新北市",
    "TTT": "台東縣",
    "TXG": "台中市",
    "TXQ": "台中縣",
    "YUN": "雲林縣",
    "JME": "金門縣",
    "KIN": "金門縣",
    "LIE": "連江縣",
    "LJF": "連江縣"
}

var constituency_parser = function (constituency) {
    switch (constituency[0]) {
    case 'proportional':
        return '全國不分區';
        break;
    case 'aborigine':
        return '山地原住民';
        break;
    case 'foreign':
        return '僑居國外國民';
        break;
    default:
        if (constituency[0] in iso3166tw) {
            if (constituency[1] == 0) {
                result = iso3166tw[constituency[0]];
            } else {
                result = iso3166tw[constituency[0]] + '第' + constituency[1] + '選區';
            }
        } else {
            result = constituency[0] + '<br>' + constituency[1];
        }
        return result;
        break;
    }
};

var party_parser = function (party) {
    switch (party) {
    case 'KMT':
        return '中國國民黨';
        break;
    case 'DPP':
        return '民主進步黨';
        break;
    case 'TSU':
        return '台灣團結聯盟';
        break;
    case 'PFP':
        return '親民黨';
        break;
    case 'NSU':
        return '無黨團結聯盟';
        break;
    case 'MKT':
        return '民國黨';
        break;
    case 'NPP':
        return '時代力量';
        break;
    default:
        if (party === null){
            return '無黨籍';
        }else{
            return '不明';
        }
        break;
    }
};

function sortResults(prop, asc) {
    data_cache = data_cache.sort(function(a, b) {
        var val_1, val_2;
        if(!asc){
            a=[b, b=a][0];
	};
        if(prop=="constituency"){
           val_1=a.constituency.join();
           val_2=b.constituency.join();
        }else{
            val_1=a[prop]==null?"":a[prop];
            val_2=b[prop]==null?"":b[prop];
        }
        if( val_1 == val_2){
            if(a.avatar > b.avatar){
                return 1;
            }else{
                return -1;
            }
        }else if(val_1 > val_2){
            return 1;
        }else{
            return -1;
        }
    });
    showResults();
}

$(function() {
    $('#contact-list th').click(function() {
        var id = $(this).attr('uid');
        if(id ==undefined) return;
        var asc = (!$(this).attr('asc')); // switch the order, true if not set

        // set asc="asc" when sorted in ascending order
        $('#contact-list th').each(function() {
            $(this).removeAttr('asc');
        });
        if (asc) $(this).attr('asc', 'asc');

        sortResults(id, asc);
    });

    //showResults();
});

function showResults(){
    $('#results').html('');
    var num = 0;
    var today = new Date();
    $.each(data_cache, function (key, val) {
        if (!val['term_end'] || new Date(val['term_end']['date']) > today) {
            if ((num % 2) == 0) {
                var html = '<tr>';
            } else {
                var html = '<tr class="even">';
            }
            var avatar_url = "images/legislators/" + val['uid'] + ".jpg"
            html = html + '<td><img src="' + avatar_url + '" alt="' + val['name'] + '" width="160" height="214"></td>';
            html = html + '<td>' + val['name'] + '</td>';
            html = html + '<td>' + party_parser(val['party']) + '</td>';
            html = html + '<td>' + constituency_parser(val['constituency']) + '</td>';
            var contacts = val['contacts'];
            html = html + '<td class="tleft">';
            $.each(contacts, function (key, val) {
                var name = $.trim(val['name']);
                if(name){
                    html = html + '<div class="contact"><strong>' + name + '</strong><br>';
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
            html = html + '</td><tr>';
            num = num + 1;
            //console.log(html);
            $('#results').append(html);
        }
    });

}

$.getJSON(url, function (data) {
    //console.log(data);
    data_cache = data;
    showResults();
});
