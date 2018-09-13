/**
 * Created by danielhe on 7/29/16.
 */
import {escapeRegex} from '../util/string-helper';



    var searchCity = function (cities, term) {
        if(!term) return;
        var reg = new RegExp('^' + escapeRegex(term), 'i');
        
        var filteredCities = [];
        var itor = function(city){
            if(reg.test(city.py) || reg.test(city.jp) || reg.test(city.name)){
                filteredCities.push(city);
            }
        }

        for(var i = 0, len = cities.length; i< len ;i++) {
            var item = cities[i];
            if(Array.isArray(item.cities)) {
                item.cities.forEach(function(city){
                    itor(city);
                })
            } else {
                for(var key in item.cities) {
                    itor(item.cities[key]);
                }
            }

        }

        return filteredCities;
    }

    export default searchCity