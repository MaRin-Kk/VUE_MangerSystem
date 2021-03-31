import http from './axios'

// 封装菜单接口
// ===============菜单接口===============
export function addMenu (data) {
  return http.post('/api/menuadd', data)
}
// 菜单编辑
export function postEditMenu (data) {
  return http.post('/api/menuedit', data)
}
// 菜单删除
export function deleteMenu (data) {
  return http.post('/api/menudelete', data)
}
// 获取菜菜单列表
export function getMenuList () {
  return http.get('/api/menulist', {
    params: {
      istree: true
    }
  })
}
// 菜单添加
export function getMenuInfo (params) {
  return http.get('/api/menuinfo', {
    params
  })
}


// ===============角色接口===============
export function addRole (data) {
  return http.post('/api/roleadd', data)
}
// 角色编辑
export function postEditRole (data) {
  return http.post('/api/roleedit', data)
}
// 角色删除
export function deleteRole (data) {
  return http.post('/api/roledelete', data)
}
// 获取菜角色列表
export function getRoleList () {
  return http.get('/api/rolelist')
}
// 角色添加
export function getRoleInfo (params) {
  return http.get('/api/roleinfo', {
    params
  })
}


/* =========封装管理员接口========= */
//管理员添加
export function addUser (data) {
  return http.post('/api/useradd', data)
}
//管理员编辑
export function postEditUser (data) {
  return http.post('/api/useredit', data)
}
//管理员单条删除
export function deleteUser (data) {
  return http.post('/api/userdelete', data)
}
//管理员列表
export function getUserList (params) {
  return http.get('/api/userlist', {
    params
  })
}
//管理员单条查询
export function getUserInfo (params) {
  return http.get('/api/userinfo', {
    params
  })
}
//管理员列表总数查询
export function getUserCount () {
  return http.get('/api/usercount')
}

//管理员登录（后台管理登录项）
export function userLogin (data) {
  return http.post('/api/userlogin', data)
}




// ==============分类接口===============
export function addCate (data) {
  return http.post('/api/cateadd', data)
}
// 分类编辑
export function postEditCate (data) {
  return http.post('/api/cateedit', data)
}
// 分类删除
export function deleteCate (data) {
  return http.post('/api/catedelete', data)
}
//分类列表
export function getCateList () {
  return http.get('/api/catelist', {
    params: {
      istree: true
    }
  })
}
// 分类单条查询
export function getCateInfo (params) {
  return http.get('/api/cateinfo', {
    params
  })
}



/* 商品规格管理接口 */
//商品规格添加
export function getSpecsAdd (data) {
  return http.post('/api/specsadd', data)
}
//商品规格列表
export function getSpecsList (params) {
  return http.get('/api/specslist', {
    params
  })
}
//商品规格获取（一条）
export function getSpecsInfo (params) {
  return http.get('/api/specsinfo', {
    params
  })
}
//商品规格修改
export function getSpecsEdit (data) {
  return http.post('/api/specsedit', data)
}
//商品规格删除
export function getSpecsDelete (data) {
  return http.post('/api/specsdelete', data)
}
//商品规格总数（用于计算分页)
export function getSpecsCount () {
  return http.get('/api/specscount')
}

/* 商品管理接口 */
//商品管理添加
export function getGoodsAdd (data) {
  return http.post('/api/goodsadd', data)
}
//商品管理列表
export function getGoodsList (params) {
  return http.get('/api/goodslist', {
    params
  })
}
//商品管理获取（一条）
export function getGoodsInfo (params) {
  return http.get('/api/goodsinfo', {
    params
  })
}
//商品管理修改
export function getGoodsEdit (data) {
  return http.post('/api/goodsedit', data)
}
//商品管理删除
export function getGoodsDelete (data) {
  return http.post('/api/goodsdelete', data)
}
//商品管理总数（用于计算分页)
export function getGoodsCount () {
  return http.get('/api/goodscount')
}



/* =========封装轮播图接口========= */
//轮播图添加
export function addbanner (data) {
  return http.post('/api/banneradd', data)
}
//轮播图编辑
export function postEditbanner (data) {
  return http.post('/api/banneredit', data)
}
//轮播图单条删除
export function deletebanner (data) {
  return http.post('/api/bannerdelete', data)
}
//轮播图列表
export function getbannerList () {
  return http.get('/api/bannerlist')
}
//轮播图单条查询
export function getbannerInfo (params) {
  return http.get('/api/bannerinfo', {
    params
  })
}

/* =========封装会员接口========= */
//会员列表
export function getMemberList () {
  return http.get('/api/memberlist')
}

//会员编辑
export function postEditMemeber (data) {
  return http.post('/api/memberedit', data)
}

//会员单条查询
export function getMemberInfo (params) {
  return http.get('/api/memberinfo', {
    params
  })
}

/* 限时秒杀管理接口 */
//封装限时秒杀添加接口
export function getSeckAdd (data) {
  return http.post('/api/seckadd', data)
}
//封装限时秒杀列表接口
export function getSeckList () {
  return http.get('/api/secklist')
}
//封装限时秒杀获取（一条）接口
export function getSeckInfo (params) {
  return http.get('/api/seckinfo', {
    params
  })
}
//封装限时秒杀修改接口
export function getSeckEdit (data) {
  return http.post('/api/seckedit', data)
}
//封装限时秒杀删除接口
export function getSeckDelete (data) {
  return http.post('/api/seckdelete', data)
}
