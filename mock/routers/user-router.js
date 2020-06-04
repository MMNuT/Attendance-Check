

module.exports = app => {
  app.post('/dev-api/user/login', (req, res) => {
    // 做一些有的沒的身份校驗
    const { username } = req.body
    if (username === 'admin' || username === 'jerry') {
      res.json({
        code: 1,
        data: username
      })
    } else {
      res.json({
        code: 10204,
        message: '用戶名稱或密碼錯誤'
      })
    }
  })

  // <=這裡應該要攔截所有請求, 驗證令牌是否合法, 可以才 next() 往下走 (懶)=> //

  app.get('/dev-api/user/info', (req, res) => {
    const auth = req.headers['authorization']
    // 前面權限控制設置cookie只是用帳號名而已, 所以這裡判斷令牌是不是 admin
    const roles = auth.split(' ')[1] === 'admin' ? ['admin']: ['editor']
    res.json({
      code: 1,
      data: roles
    })
  })
}