<template>
  <div class="category">
    <h1>架构师的成长之路</h1>
    <h3>知识，要靠一点一滴的积累</h3>
    <hr />
    <div>
      <p><img src="../../assets/img/vue-logo.png" alt=""><span>Vue</span><span>(20)</span></p>
      <p><img src="../../assets/img/vue-logo.png" alt=""><span>Vue</span><span>(20)</span></p>
      <p><img src="../../assets/img/vue-logo.png" alt=""><span>Vue</span><span>(20)</span></p>
      <p><img src="../../assets/img/vue-logo.png" alt=""><span>Vue</span><span>(20)</span></p>
      <p><img src="../../assets/img/vue-logo.png" alt=""><span>Vue</span><span>(20)</span></p>
      <p><img src="../../assets/img/vue-logo.png" alt=""><span>Vue</span><span>(20)</span></p>
      <p><img src="../../assets/img/vue-logo.png" alt=""><span>Vue</span><span>(20)</span></p>
    </div>
  </div>
</template>

<style lang="scss">
.category{
  box-sizing: border-box;
  border-radius: 10px;
  padding: 20px 20px 40px 20px;
  background: $hui-bai;
  color: $hui-hei;

  p{
    display: flex;
    align-items: center;
    img{
      width: 20px;
      margin-right: 10px;
    }
    :nth-child(2){
      margin-right: 5px;
    }
  }
}
</style>
