<template>
  <div class="footer">
    <div class="footer-main">
      <div class="footer-main-left">
        <dl>
          <dt>关于</dt>
          <dd><a href="/about">公司简介</a></dd>
          <dd><a href="/site/news">新闻动态</a></dd>
          <dd><a href="http://www.lagou.com/gongsi/2480.html" target="_blank">加入我们</a></dd>
          <dd><a href="/service">服务条款</a></dd>
          <dd><a href="/privacy">隐私政策</a></dd>
          <dd><a href="/partners">合作伙伴</a></dd>
        </dl>
        <dl>
          <dt>产品</dt>
          <!-- <dd><a href="/products">共享版服务</a></dd> -->
          <!-- <dd><a href="/products">专享版服务</a></dd> -->
          <dd><a href="/products">产品介绍</a></dd>
          <dd><a href="http://www.bmobcloud.com" target="_blank">小程序 SaaS</a></dd>
          <dd><a href="/shop/index/platform/2">小程序源码</a></dd>
          <dd><a href="/function">云函数</a></dd>
          <dd><a href="/weixin">微信小程序</a></dd>
        </dl>
        <dl>
          <dt>联系</dt>
          <!-- <dd class="consult"><span>在线咨询：</span><a href="tencent://message/?Menu=yes&amp;uin=800152098&amp;Service=58&amp;SigT=A7F6FEA02730C98849F61E63992B867DC11B3D4530D56226B8B75DB405D5F05EB61178A87E0B7549A17115C3FF45D5C918CF2632D62FC4EF0069FDDD5E1959C52A2DA3058023E4A04EF0C8041E9A26C8E137A14CA0D0A117861CC516C8615DD43C17BC543AA8EF3AC86E0E07A351146E6F42EABA91673044&amp;SigU=30E5D5233A443AB222ABF7AAD09311795BC074396E9702DB63EB477AFEAA35C68117513CF003470DF072255C00E563AD278E821CBFBE23A480BCBD55FB813690330ED5DCCDC61B54"><img src="static/picture/chat.png"></a></dd> -->
          <dd class="consult"><span>问题咨询：</span><a href="/workOrder/create"><span class="fontwhite">工单留言</span></a></dd>
          <dd><span>技术支持：</span><span class="fontwhite">support#bmob.cn(将#替换为@)</span></dd>
          <dd><span>市场合作：</span><span class="fontwhite">ritscher#bmob.cn(将#替换为@)</span></dd>
        </dl>
        <dl class="footer-main-right">
          <dd class="qr">
            <img src="static/picture/footer-qr.png" alt="" id="weixin_qr"/>
            <p>关注 Bmob 微信</p>
            <div class="other-menu">
              <a href="javascript:;"  id="weixin"></a>
              <a href="http://weibo.com/bmob" target="_blank"></a>
              <a href="https://github.com/bmob" target="_blank"></a>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebBottom'
}
</script>

<style scoped>

.footer-main dt {
  font-size: 1.6rem;
  color: #cfd1d4;
  margin-bottom: .3rem;
  font-family: "Microsoft Yahei","\5FAE\8F6F\96C5\9ED1", "Hiragino Sans GB", "WenQuanYi Micro Hei", "\5B8B\4F53", "sans-serif";
  font-weight: 400;
}
</style>
