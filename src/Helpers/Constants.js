export const baseUrl = 'https://fndrisr.herokuapp.com/';

export const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const countryList = ["Afghanistan","AlandIslands","Albania","Algeria","AmericanSamoa","Andorra","Angola","Anguilla","Antarctica","AntiguaAndBarbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","BonaireSaintEustatiusAndSaba","BosniaAndHerzegovina","Botswana","BouvetIsland","Brazil","BritishIndianOceanTerritory","BruneiDarussalam","Bulgaria","BurkinaFaso","Burundi","Cambodia","Cameroon","Canada","CanaryIslands","CapeVerde","CaymanIslands","CentralAfricanRepublic","CeutaAndMelilla","Chad","Chile","China","ChristmasIsland","CocosKeelingIslands","Colombia","Comoros","CongoDemocraticPeoplesRepublic","CongoRepublicOf","CookIslands","CostaRica","CoteDIvoire","CroatiaHrvatska","Cuba","Curacao","Cyprus","CzechRepublic","Denmark","Djibouti","Dominica","DominicanRepublic","EastTimor","Ecuador","Egypt","ElSalvador","EquatorialGuinea","Eritrea","Estonia","Ethiopia","FalklandIslands","FaroeIslands","Fiji","Finland","France","FrenchGuiana","FrenchPolynesia","FrenchSouthernTerritories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","GuineaBissau","Guyana","Haiti","HeardAndMcDonaldIslands","HolySeeCityVaticanState","Honduras","HongKong","Hungary","Iceland","India","Indonesia","IranIslamicRepublicOf","Iraq","Ireland","IsleOfMan","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","KoreaDemocraticPeoplesRepublic","KoreaRepublicOf","Kosovo","Kuwait","Kyrgyzstan","LaoPeoplesDemocraticRepublic","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","MarshallIslands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","MicronesiaFederalStateOf","MoldovaRepublicOf","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","NewCaledonia","NewZealand","Nicaragua","Niger","Nigeria","Niue","NorfolkIsland","NorthernMarianaIslands","Norway","Oman","Pakistan","Palau","Panama","PapuaNewGuinea","Paraguay","Peru","Philippines","PitcairnIsland","Poland","Portugal","PuertoRico","Qatar","ReunionIsland","Romania","RussianFederation","Rwanda","SaintBarthelemy","SaintHelena","SaintKittsAndNevis","SaintLucia","SaintMartin","SaintVincentAndTheGrenadines","Samoa","SanMarino"];

export const getToken = () => {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
}

export const chartData = [
    {
        "id": "japan",
        "color": "hsl(207, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 23
            },
            {
                "x": "helicopter",
                "y": 218
            },
            {
                "x": "boat",
                "y": 252
            },
            {
                "x": "train",
                "y": 254
            },
            {
                "x": "subway",
                "y": 153
            },
            {
                "x": "bus",
                "y": 124
            },
            {
                "x": "car",
                "y": 296
            },
            {
                "x": "moto",
                "y": 259
            },
            {
                "x": "bicycle",
                "y": 96
            },
            {
                "x": "horse",
                "y": 182
            },
            {
                "x": "skateboard",
                "y": 253
            },
            {
                "x": "others",
                "y": 22
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(156, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 67
            },
            {
                "x": "helicopter",
                "y": 139
            },
            {
                "x": "boat",
                "y": 222
            },
            {
                "x": "train",
                "y": 203
            },
            {
                "x": "subway",
                "y": 119
            },
            {
                "x": "bus",
                "y": 93
            },
            {
                "x": "car",
                "y": 44
            },
            {
                "x": "moto",
                "y": 231
            },
            {
                "x": "bicycle",
                "y": 143
            },
            {
                "x": "horse",
                "y": 123
            },
            {
                "x": "skateboard",
                "y": 188
            },
            {
                "x": "others",
                "y": 35
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(94, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 36
            },
            {
                "x": "helicopter",
                "y": 254
            },
            {
                "x": "boat",
                "y": 258
            },
            {
                "x": "train",
                "y": 55
            },
            {
                "x": "subway",
                "y": 285
            },
            {
                "x": "bus",
                "y": 208
            },
            {
                "x": "car",
                "y": 1
            },
            {
                "x": "moto",
                "y": 24
            },
            {
                "x": "bicycle",
                "y": 183
            },
            {
                "x": "horse",
                "y": 52
            },
            {
                "x": "skateboard",
                "y": 50
            },
            {
                "x": "others",
                "y": 51
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(74, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 280
            },
            {
                "x": "helicopter",
                "y": 126
            },
            {
                "x": "boat",
                "y": 286
            },
            {
                "x": "train",
                "y": 85
            },
            {
                "x": "subway",
                "y": 196
            },
            {
                "x": "bus",
                "y": 290
            },
            {
                "x": "car",
                "y": 47
            },
            {
                "x": "moto",
                "y": 261
            },
            {
                "x": "bicycle",
                "y": 262
            },
            {
                "x": "horse",
                "y": 13
            },
            {
                "x": "skateboard",
                "y": 112
            },
            {
                "x": "others",
                "y": 118
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(207, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 100
            },
            {
                "x": "helicopter",
                "y": 58
            },
            {
                "x": "boat",
                "y": 55
            },
            {
                "x": "train",
                "y": 105
            },
            {
                "x": "subway",
                "y": 15
            },
            {
                "x": "bus",
                "y": 59
            },
            {
                "x": "car",
                "y": 285
            },
            {
                "x": "moto",
                "y": 168
            },
            {
                "x": "bicycle",
                "y": 36
            },
            {
                "x": "horse",
                "y": 142
            },
            {
                "x": "skateboard",
                "y": 255
            },
            {
                "x": "others",
                "y": 3
            }
        ]
    }
]