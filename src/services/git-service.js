/**
 * API Service layer to make calls to external REST API Calls
 */

const axios = require('axios')

/**
 * Makes a call to github REST API to fetch the publich repositories 
 * @param {*} page : current page to be fetched
 * @param {*} count : no. of repos to be fetched in that page
 */
const fetchGitPublicRepositories = (page, count) => {
    return axios
        .get(`https://api.github.com/repositories?page=${page}&per_page=${count}`)
        .then(res => {
            return res.data
        })
}

module.exports = {
    fetchGitPublicRepositories
}