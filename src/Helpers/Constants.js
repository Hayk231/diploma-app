export const baseUrl = 'https://fndrisr.herokuapp.com/';

export const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const countryList = ["Afghanistan","AlandIslands","Albania","Algeria","AmericanSamoa","Andorra","Angola","Anguilla","Antarctica","AntiguaAndBarbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","BonaireSaintEustatiusAndSaba","BosniaAndHerzegovina","Botswana","BouvetIsland","Brazil","BritishIndianOceanTerritory","BruneiDarussalam","Bulgaria","BurkinaFaso","Burundi","Cambodia","Cameroon","Canada","CanaryIslands","CapeVerde","CaymanIslands","CentralAfricanRepublic","CeutaAndMelilla","Chad","Chile","China","ChristmasIsland","CocosKeelingIslands","Colombia","Comoros","CongoDemocraticPeoplesRepublic","CongoRepublicOf","CookIslands","CostaRica","CoteDIvoire","CroatiaHrvatska","Cuba","Curacao","Cyprus","CzechRepublic","Denmark","Djibouti","Dominica","DominicanRepublic","EastTimor","Ecuador","Egypt","ElSalvador","EquatorialGuinea","Eritrea","Estonia","Ethiopia","FalklandIslands","FaroeIslands","Fiji","Finland","France","FrenchGuiana","FrenchPolynesia","FrenchSouthernTerritories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","GuineaBissau","Guyana","Haiti","HeardAndMcDonaldIslands","HolySeeCityVaticanState","Honduras","HongKong","Hungary","Iceland","India","Indonesia","IranIslamicRepublicOf","Iraq","Ireland","IsleOfMan","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","KoreaDemocraticPeoplesRepublic","KoreaRepublicOf","Kosovo","Kuwait","Kyrgyzstan","LaoPeoplesDemocraticRepublic","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","MarshallIslands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","MicronesiaFederalStateOf","MoldovaRepublicOf","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","NewCaledonia","NewZealand","Nicaragua","Niger","Nigeria","Niue","NorfolkIsland","NorthernMarianaIslands","Norway","Oman","Pakistan","Palau","Panama","PapuaNewGuinea","Paraguay","Peru","Philippines","PitcairnIsland","Poland","Portugal","PuertoRico","Qatar","ReunionIsland","Romania","RussianFederation","Rwanda","SaintBarthelemy","SaintHelena","SaintKittsAndNevis","SaintLucia","SaintMartin","SaintVincentAndTheGrenadines","Samoa","SanMarino"];

export const getToken = () => {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
}
export const getDeviceToken = () => {
    return localStorage.getItem('deviceToken') || ''
}

export const chartData = [
    {
        "id": "data",
        "color": "hsl(207, 70%, 50%)",
        "data": [
            {
                "x": "2021-02-08",
                "y": 23
            },
            {
                "x": "2021-02-09",
                "y": 218
            },
            {
                "x": "2021-02-10",
                "y": 252
            },
            {
                "x": "2021-02-12",
                "y": 254
            },
            {
                "x": "2021-02-13",
                "y": 153
            },
            {
                "x": "2021-02-14",
                "y": 124
            },
            {
                "x": "2021-02-15",
                "y": 296
            },
            {
                "x": "2021-02-16",
                "y": 259
            },
            {
                "x": "2021-02-18",
                "y": 96
            },
            {
                "x": "2021-03-26",
                "y": 182
            },
        ]
    }
]