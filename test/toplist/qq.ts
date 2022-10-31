import request from 'supertest'
import app from '@src'
describe('GET /toplist', () => {
  test('request success', async () => {
    const response = await request(app)
      .get('/toplist/info/qq').set('Accept', 'application/json')
    // expect(response.headers['Content-Type']).toMatch(/json/)
    expect(response.status).toEqual(200)
  })
  afterAll(() => {
    app.close()
  })
})
