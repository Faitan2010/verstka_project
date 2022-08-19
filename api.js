'use strict';
const getData = {
    API_KEY: '18c5ded70673077016efa068226c43a4',
    host: 'api.openweathermap.org',
    units: 'metric',
    getTipsList(cityName = '', limit = 5) {
        const protocol = 'http';
        const pathname = 'geo/1.0/direct';

        const url = new URL(`${protocol}://${this.host}/${pathname}`)
        url.searchParams.set('q', cityName);
        url.searchParams.set('limit', limit);
        url.searchParams.set('appid', this.API_KEY);
        url.searchParams.set('units', this.units);

        return fetch(url).then(res => res.json());
    },
    getWeatherData(lat, lon) {
        const protocol = 'https';
        const pathname = 'data/2.5/weather';

        const url = new URL(`${protocol}://${this.host}/${pathname}`)
        url.searchParams.set('lat', lat);
        url.searchParams.set('lon', lon);
        url.searchParams.set('appid', this.API_KEY);
        url.searchParams.set('units', this.units);

        return fetch(url).then(res => res.json());
    }
}