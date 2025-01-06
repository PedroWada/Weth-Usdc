const handleConvert = require('../functions/handleConvert')

describe('HandleConvert', () => {
    it('should make the convertion between weth to usdc', () => {
        const result = handleConvert(1)
        expect(result).toBeGreaterThan(1)
    })
})