//var url = "https://raw.github.com/g0v/twlyparser/master/data/mly-8.json";
var url = "data/mly-8.json";

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
    default:
        if (party === null){
            return '無黨籍';
        }else{
            return '不明';
        }
        break;
    }
};



$.getJSON(url, function (data) {
    //console.log(data);
    var num = 0;
    $.each(data, function (key, val) {
        if ((num % 2) == 0) {
            var html = '<tr>';
        } else {
            var html = '<tr class="even">';
        }
        html = html + '<td><img src="' + val['avatar'] + '" alt="' + val['name'] + '" width="32" height="32"></td>';
        html = html + '<td>' + val['name'] + '</td>';
        html = html + '<td>' + party_parser(val['party']) + '</td>';
        html = html + '<td>' + constituency_parser(val['constituency']) + '</td>';
        var contact = val['contact'];
        html = html + '<td class="tleft">';
        $.each(contact, function (key, val) {
            key = $.trim(key);
            if(key){
                html = html + '<div class="contact"><strong>' + key + '</strong><br>';
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
        $('#contact-list').append(html);
    });
});
