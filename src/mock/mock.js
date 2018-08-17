import Mock from 'mockjs'

const mockdata = Mock.mock({
  'blogList|1-10': [{
    'title|1-5': '标题',
    'subTitle|1-5': '子标题',
    image: Mock.Random.dataImage('770x250'),
    time: Mock.Random.date(),
    'eye|1-500': 500,
    'like|1-100': 30,
    'category|1': ['NodeJS', 'ES6', 'Vue', 'CSS', 'Webpack'],
    comment: {
      'count|1-100': 100,
      'list|1-10': [{
        time: Mock.Random.datetime(),
        'content|1-10': '评论',
        'arthur|1': ['张三', '李四', '王五', '赵六']
      }]
    }
  }]
})

export default mockdata
