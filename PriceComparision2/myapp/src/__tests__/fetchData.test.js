const fetchData = require('../functions/fetchData')
const axios = require('axios')

describe('fetchData', () => {
    it('mock axios', async () => {
        jest.spyOn(axios, 'get').mockReturnValueOnce({
            data:{
                priceWeth: "0.075", 
                priceUsdc: "120.50", 
                date: "2024-01-01"
            }
        })
        const results = await fetchData()
        console.log(results)
        expect(results.priceWeth).toBe("0.075")
        expect(results.date).toBe("2024-01-01")
    })
})
