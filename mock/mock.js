import Mock from 'mockjs'

const mockdata = Mock.mock({
  'blogList': [
    {
      'title': '维护中',
      'subTitle': '维护中，等等再来吧...',
      'image': 'https://www.test.com/down.png',
      'content': '<p>维护中，等等再来吧...</p>',
      'isOriginal': true,
      'publishTime': Mock.Random.now(),
      'see': 100,
      'like': 100,
      'category': '维护',
      'tags': ['维护'],
      'comments': [{
        time: Mock.Random.now(),
        'content': '维护中',
        'arthur': '维护中'
      }]
    }
  ]
})

export default mockdata
