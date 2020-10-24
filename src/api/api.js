import axios from 'axios'


export default class API {
    static endpoint = "https://pinatic-api.herokuapp.com/"


    static getProfileInfo(callback) {
        axios.get(API.endpoint + 'summary').then(res => callback(res.data))
    }

    static getOwnedGames(callback) {
        axios.get(API.endpoint + 'owned-games').then(res => callback(res.data.response))
    }
}