<template>
  <div class="login">
    <div class="cube">
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="left"></div>
      <div class="right"></div>
      <div class="front"></div>
      <div class="back"></div>
    </div>
    <h1 style='font-family:STXingkai'>Background Management System</h1>
    <el-form class="box" ref="loginForm" :model="loginForm" label-width="80px" :rules="rules">
      <h2>Login In For Manger</h2>
      <i class="iconfont">&#xe65b;</i>
      <el-form-item prop='username'>
        <el-input class="input" v-model="loginForm.username" clearable></el-input>
      </el-form-item><br>
      <i class="iconfont">&#xe6a0;</i>
      <el-form-item prop='password'>
        <el-input class="input" v-model="loginForm.password" show-password></el-input>
      </el-form-item><br>
      <el-form-item>
        <el-button type="primary" @click='login("loginForm")'>Login </el-button>
      </el-form-item>
    </el-form>
    <div class="poem">
      <p class="title">离歌</p>
      <p>谁言别后终无悔，</p>
      <p>寒月清宵绮梦回。</p>
      <p>深知身在情长在，</p>
      <p>前尘不共彩云飞。</p>
    </div>

  </div>
</template>

<script>
import '../../node_modules/jquery/dist/jquery'
import { userLogin } from "../util/axios";
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      img: {
        img1: require('../assets/img/dnf1.jpg'),
        img2: require('../assets/img/dnf2.jpg'),
        img3: require('../assets/img/bg.jpg')
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    }

  },

  //组件内部守卫，离开前触发的守卫
  beforeRouteLeave (to, from, next) {
    if (sessionStorage.getItem("user") == null) {
      next("/login");
      location.reload();
    } else {
      next();
    }
  },
  components: {

  },
  mounted () {
    let $ = this.$
    /*样式一*/
    $.fn.snow = function (options) {
      var $flake = $('<div id="snowbox" />').css({ 'position': 'absolute', 'z-index': '9999', 'top': '-50px' }).html('&#10052;'),
        documentHeight = $(document).height(),
        documentWidth = $(document).width(),
        defaults = {
          minSize: 10,
          maxSize: 20,
          newOn: 1000,
          flakeColor: "#AFDAEF" /* 此处可以定义雪花颜色，若要白色可以改为#FFFFFF */
        },
        options = $.extend({}, defaults, options);
      var interval = setInterval(function () {
        var startPositionLeft = Math.random() * documentWidth - 100,
          startOpacity = 0.5 + Math.random(),
          sizeFlake = options.minSize + Math.random() * options.maxSize,
          endPositionTop = documentHeight - 200,
          endPositionLeft = startPositionLeft - 500 + Math.random() * 500,
          durationFall = documentHeight * 10 + Math.random() * 5000;
        $flake.clone().appendTo('body').css({
          left: startPositionLeft,
          opacity: startOpacity,
          'font-size': sizeFlake,
          color: options.flakeColor
        }).animate({
          top: endPositionTop,
          left: endPositionLeft,
          opacity: 0.2
        }, durationFall, 'linear', function () {
          $(this).remove()
        });
      }, options.newOn);
    };
    $.fn.snow({
      minSize: 5, /* 定义雪花最小尺寸 */
      maxSize: 50,/* 定义雪花最大尺寸 */
      newOn: 500  /* 定义密集程度，数字越小越密集 */
    });
    //鼠标点击雪花特效
    (function fairyDustCursor () {

      var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"]
      var width = window.innerWidth;
      var height = window.innerHeight;
      var cursor = { x: width / 2, y: width / 2 };
      var particles = [];

      function init () {
        bindEvents();
        loop();
      }

      // Bind events that are needed
      function bindEvents () {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchMove);

        window.addEventListener('resize', onWindowResize);
      }

      function onWindowResize (e) {
        width = window.innerWidth;
        height = window.innerHeight;
      }

      function onTouchMove (e) {
        if (e.touches.length > 0) {
          for (var i = 0; i < e.touches.length; i++) {
            addParticle(e.touches[i].clientX, e.touches[i].clientY, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
          }
        }
      }

      function onMouseMove (e) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;

        addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
      }

      function addParticle (x, y, color) {
        var particle = new Particle();
        particle.init(x, y, color);
        particles.push(particle);
      }

      function updateParticles () {

        // Updated
        for (var i = 0; i < particles.length; i++) {
          particles[i].update();
        }

        // Remove dead particles
        for (var i = particles.length - 1; i >= 0; i--) {
          if (particles[i].lifeSpan < 0) {
            particles[i].die();
            particles.splice(i, 1);
          }
        }

      }

      function loop () {
        requestAnimationFrame(loop);
        updateParticles();
      }

      /**
       * Particles
       */

      function Particle () {

        this.character = "*";
        this.lifeSpan = 120; //ms
        this.initialStyles = {
          "position": "fixed",
          "top": "0", //必须加
          "display": "block",
          "pointerEvents": "none",
          "z-index": "10000000",
          "fontSize": "20px",
          "will-change": "transform"
        };

        // Init, and set properties
        this.init = function (x, y, color) {

          this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            y: 1
          };

          this.position = { x: x - 10, y: y - 20 };
          this.initialStyles.color = color;


          this.element = document.createElement('span');
          this.element.innerHTML = this.character;
          applyProperties(this.element, this.initialStyles);
          this.update();

          document.body.appendChild(this.element);
        };

        this.update = function () {
          this.position.x += this.velocity.x;
          this.position.y += this.velocity.y;
          this.lifeSpan--;

          this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
        }

        this.die = function () {
          this.element.parentNode.removeChild(this.element);
        }

      }

      /**
       * Utils
       */

      // Applies css `properties` to an element.
      function applyProperties (target, properties) {
        for (var key in properties) {
          target.style[key] = properties[key];
        }
      }

      init();
    })();
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          userLogin(this.loginForm).then(res => {
            if (res.data.code == 200) {

              this.$message.success(res.data.msg);
              this.changeUserInfoAction(res.data.list)
              this.$router.push("/index");
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }
      })
    }
  },

};
</script>
<style lang="" scoped>
.el-form-item {
  display: inline-block;
  margin-left: -80px;
}
.input >>> .el-input__inner {
  width: 180px;
  height: 30px !important;
  border: none;
  background-color: rgba(0, 0, 0) t;
  border-bottom: white solid 2px;
  outline: none;
  color: white;
}
.el-button {
  height: 40px;
  width: 250px;
  background: linear-gradient(to right, #f52443, #2c80c5 80%);
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 15px;
}
.login {
  width: 100vw;
  height: 100vh;
  background: url(../assets/img/1.jpg);
  background-size: 100% 100%;
}
.el-form {
  overflow: hidden;
  width: 600px;
  height: 260px;
  margin: 80px auto;
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(255, 255, 255);
  text-align: center;
  transition: all 0.3s;
  border-radius: 20px;
}
.el-form:hover {
  transform: scale(1.05);
}
h1 {
  text-align: center;
  padding-top: 80px;
  font-size: 22px;
  font-size: 60px;
  background-image: linear-gradient(to right, red 30%, blue 50%, gold 70%);
  -webkit-background-clip: text;
  color: transparent;
}
h2 {
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 20px;
}
@keyframes shici {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.3);
    text-shadow: 2px 2px 13px white;
  }
}
.poem {
  position: fixed;
  right: 20px;
  top: 30px;
  cursor: pointer;
}
.poem .title {
  font-size: 20px;
  font-weight: bold;
}
.poem p {
  color: white;
  display: inline-block;
  writing-mode: vertical-lr;
}
.poem p:nth-of-type(2) {
  animation: shici 3s linear infinite alternate;
}
.poem p:nth-of-type(3) {
  animation: shici 3s linear 1s infinite alternate;
}
.poem p:nth-of-type(4) {
  animation: shici 3s linear 2s infinite alternate;
}
.poem p:nth-of-type(5) {
  animation: shici 3s linear 3s infinite alternate;
}

/* 立方体 */
@keyframes zhuan {
  0% {
    transform: rotateX(0) rotateY(0) rotateZ(0);
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
}

/*划过盒子  操作动画 */
.cube:hover .top {
  transform: rotateX(90deg) translatez(50px);
}

.cube:hover .bottom {
  transform: rotateX(-90deg) translatez(50px);
}

.cube:hover .left {
  transform: rotateY(-90deg) translatez(50px);
}

.cube:hover .right {
  transform: rotateY(90deg) translatez(50px);
}

.cube:hover .front {
  transform: translatez(50px);
}

.cube:hover .back {
  transform: rotateY(180deg) translateZ(50px);
}
.cube {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 50px;
  height: 50px;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(-30deg);
  animation: zhuan 4s linear infinite;
}
/* 动态立方体的css */

.cube div {
  transition: transform 0.5s;
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  text-align: center;
  line-height: 100px;
  font-size: 40px;
}

/* 形成盒子 */
.top {
  background-color: chartreuse;
  opacity: 0.5;
  transform: rotateX(90deg) translatez(25px);
}

.bottom {
  background-color: coral;
  opacity: 0.5;
  transform: rotateX(-90deg) translatez(25px);
}

.left {
  background-color: cyan;
  opacity: 0.5;
  transform: rotateY(-90deg) translatez(25px);
}

.right {
  background-color: indianred;
  opacity: 0.5;
  transform: rotateY(90deg) translatez(25px);
}

.front {
  background-color: gold;
  transform: translatez(25px);
  opacity: 0.5;
}

.back {
  background-color: white;
  opacity: 0.5;
  transform: rotateY(180deg) translateZ(25px);
}
</style>
