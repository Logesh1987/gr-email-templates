<template>
  <transition name="loader">
    <div v-if="status" class="loaderWrapper">
      <div class="cssload-fond">
        <div class="cssload-container-general">
          <div class="cssload-internal">
            <div class="cssload-ballcolor cssload-ball_1">&nbsp;</div>
          </div>
          <div class="cssload-internal">
            <div class="cssload-ballcolor cssload-ball_2">&nbsp;</div>
          </div>
          <div class="cssload-internal">
            <div class="cssload-ballcolor cssload-ball_3">&nbsp;</div>
          </div>
          <div class="cssload-internal">
            <div class="cssload-ballcolor cssload-ball_4">&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Loader",
  props: ["status"]
};
</script>
<style lang="less" scoped>
.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.5s;
}
.loader-enter,
.loader-leave-to {
  opacity: 0;
}
.loaderWrapper {
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 1.2em;
  color: #000;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10002;
}
.cssload-fond {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -22px 0 0 -22px;
}
.cssload-container-general {
  animation: cssload-animball_two 1.15s infinite;
  -o-animation: cssload-animball_two 1.15s infinite;
  -ms-animation: cssload-animball_two 1.15s infinite;
  -webkit-animation: cssload-animball_two 1.15s infinite;
  -moz-animation: cssload-animball_two 1.15s infinite;
  width: 43px;
  height: 43px;
}
.cssload-internal {
  position: absolute;
  width: 43px;
  height: 43px;
}
.cssload-ballcolor {
  width: 19px;
  height: 19px;
  border-radius: 50%;
}
.cssload-ball_1,
.cssload-ball_2,
.cssload-ball_3,
.cssload-ball_4 {
  position: absolute;
  animation: cssload-animball_one 1.15s infinite ease;
  -o-animation: cssload-animball_one 1.15s infinite ease;
  -ms-animation: cssload-animball_one 1.15s infinite ease;
  -webkit-animation: cssload-animball_one 1.15s infinite ease;
  -moz-animation: cssload-animball_one 1.15s infinite ease;
}
.cssload-ball_1 {
  background-color: rgb(203, 32, 37);
  top: 0;
  left: 0;
}
.cssload-ball_2 {
  background-color: rgb(248, 179, 52);
  top: 0;
  left: 23px;
}
.cssload-ball_3 {
  background-color: rgb(0, 160, 150);
  top: 23px;
  left: 0;
}
.cssload-ball_4 {
  background-color: rgb(151, 191, 13);
  top: 23px;
  left: 23px;
}
@keyframes cssload-animball_one {
  0% {
    position: absolute;
  }
  50% {
    top: 12px;
    left: 12px;
    position: absolute;
    opacity: 0.5;
  }
  100% {
    position: absolute;
  }
}
@-o-keyframes cssload-animball_one {
  0% {
    position: absolute;
  }
  50% {
    top: 12px;
    left: 12px;
    position: absolute;
    opacity: 0.5;
  }
  100% {
    position: absolute;
  }
}
@-ms-keyframes cssload-animball_one {
  0% {
    position: absolute;
  }
  50% {
    top: 12px;
    left: 12px;
    position: absolute;
    opacity: 0.5;
  }
  100% {
    position: absolute;
  }
}
@-webkit-keyframes cssload-animball_one {
  0% {
    position: absolute;
  }
  50% {
    top: 12px;
    left: 12px;
    position: absolute;
    opacity: 0.5;
  }
  100% {
    position: absolute;
  }
}
@-moz-keyframes cssload-animball_one {
  0% {
    position: absolute;
  }
  50% {
    top: 12px;
    left: 12px;
    position: absolute;
    opacity: 0.5;
  }
  100% {
    position: absolute;
  }
}
@keyframes cssload-animball_two {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(360deg) scale(1.3);
  }
  100% {
    transform: rotate(720deg) scale(1);
  }
}
@-o-keyframes cssload-animball_two {
  0% {
    -o-transform: rotate(0deg) scale(1);
  }
  50% {
    -o-transform: rotate(360deg) scale(1.3);
  }
  100% {
    -o-transform: rotate(720deg) scale(1);
  }
}
@-ms-keyframes cssload-animball_two {
  0% {
    -ms-transform: rotate(0deg) scale(1);
  }
  50% {
    -ms-transform: rotate(360deg) scale(1.3);
  }
  100% {
    -ms-transform: rotate(720deg) scale(1);
  }
}
@-webkit-keyframes cssload-animball_two {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
  }
  50% {
    -webkit-transform: rotate(360deg) scale(1.3);
  }
  100% {
    -webkit-transform: rotate(720deg) scale(1);
  }
}
@-moz-keyframes cssload-animball_two {
  0% {
    -moz-transform: rotate(0deg) scale(1);
  }
  50% {
    -moz-transform: rotate(360deg) scale(1.3);
  }
  100% {
    -moz-transform: rotate(720deg) scale(1);
  }
}
</style>
