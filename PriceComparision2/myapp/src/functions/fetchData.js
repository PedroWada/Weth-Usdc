const axios = require('axios')
const fetchData = () => {
    const resp = axios.get('http://localhost:5000/getPrices')
        return resp.data
}
module.exports = fetchData