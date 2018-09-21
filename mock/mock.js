import Mock from 'mockjs'

const mockdata = Mock.mock({
  'blogList|1-10': [{
    'title|1-5': '标题',
    'subTitle|1-5': '子标题',
    image: Mock.Random.dataImage('600x210'),
    publishTime: Mock.Random.date(),
    'see|1-500': 500,
    'like|1-100': 30,
    'category|1': ['NodeJS', 'ES6', 'Vue', 'CSS', 'Webpack'],
    'comments|1-10': [{
      time: Mock.Random.datetime(),
      'content|1-10': '评论',
      'arthur|1': ['张三', '李四', '王五', '赵六']
    }]
  }],
  'slideImage': Mock.Random.dataImage('600x210'),
  'categoryList': ['NodeJS', 'ES6', 'Vue', 'CSS', 'Webpack', 'NodeJS', 'ES6', 'Vue', 'CSS', 'Webpack', 'NodeJS', 'ES6', 'Vue', 'CSS', 'Webpack', 'NodeJS', 'ES6', 'Vue', 'CSS', 'Webpack', 'NodeJS', 'ES6', 'Vue', 'CSS', 'Webpack']
})

export default mockdata
