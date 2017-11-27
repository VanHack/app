
export const ENV = {
    PRODUCTION    : false,
    'services' : {
        'providers' : {
            'tomato' : {
                'url'       : 'https://developers.zomato.com/api/v2.1',
                'token'     : 'f8216020db0ddcd5081730299d5336fd',
                'headers'   : [
                    { 'header' : 'Accept',   'value': 'application/json' },
                    { 'header' : 'user-key', 'value': 'f8216020db0ddcd5081730299d5336fd' }
                ]
            },
            'jsonserver' : {
                'url'       : 'http://thiagofalencar.com/hackathon/api',
                'token'     : 'f8216020db0ddcd5081730299d5336fd',
                'headers'   : []
            }
        },
        'actions' : {
            'authentication'   : {
                'action'   : '/users',
                'provider' : 'jsonserver',
            },
            'tastes'  : {
                'action'   : '/cuisines?city_id=346',
                'provider' : 'tomato',
                'params' : [
                    'city_id'
                ]
            },
            'cities'  : {
                'action'   : '/cities',
                'provider' : 'tomato',
                'params' : [
                    'lat',
                    'lon'
                ]
            },
            'suggestion'  : {
                'action'   : '/search',
                'provider' : 'tomato',
                'params' : [
                    'entity_id',
                    'entity_type',
                    'cuisines',
                    'sort',
                    'order',
                    'asc',
                ]
            },
        }
    }
}
