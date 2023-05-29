<template>
  <div class="css-lib__wrap">
    <div class="line-wrap w-flex-cen">
      <h5>垂直居中，两端对其:</h5>
      <p class="w-line-ellipsis">w-flex-cen</p>
    </div>
    <div class="line-wrap w-flex-cen-all">
      <h5>垂直居中，水平居中:</h5>
      <p class="w-line-ellipsis">w-flex-cen-all</p>
    </div>
    <div class="line-wrap w-flex-cen">
      <h5>一行超出省略：</h5>
      <p class="w-line-ellipsis" style="flex: 1">
        略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略
      </p>
    </div>
    <div class="line-wrap w-flex-cen" style="width: 200px">
      <h5>多行超出省略：</h5>
      <p class="lines-ellipsis" style="flex: 1">
        略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略
      </p>
    </div>
    <div class="line-wrap w-flex-cen-all">
      <h5>滚动条：</h5>
      <p class="scroll-bar" style="flex: 1; height: 50px; max-width: 200px">
        略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略略
      </p>
    </div>
    <div class="line-wrap" style="position: relative; margin: 0">
      <h5>绝对定位水平垂直居中：</h5>
      <p class="w-absolute-1/2" style="border: 1px solid red; margin: 0">我是absolute</p>
    </div>
    <div class="line-wrap" style="position: relative; margin: 0">
      <h5>绝对定位水平居中top是30%：</h5>
      <p class="absolute-30" style="border: 1px solid red; margin: 0">我是absolute</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.css-lib__wrap {
  * {
    margin: 10px 0;
    padding: 0;
  }
  .line-wrap {
    width: 500px;
    border: 1px solid #ddd;
    h5 {
      font-weight: normal;
    }
    & > p {
      font-size: 14px;
    }
  }
  .lines-ellipsis {
    @include w-lines-ellipsis(3);
  }
  .scroll-bar {
    @include w-scroll-bar();
  }
  .absolute-30 {
    @include w-absolute-cen-top(30%);
  }
}
</style>
