
<template>
    <transition 
        name="message-fade">
        <div v-show="visible" class="message-item" 
            :style="positionStyle">
            <div class="txt-div">
                <!-- <img src="../assets/imgs/error.png" alt=""> -->
                <p>{{msg}}</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "message",
    data() {
        return {
            verticalOffset: 0,
            duration: 3000,
            closed: false,
            visible: false,
            msg: ""
        };
    },
    computed: {
        positionStyle() {
            return {
                bottom: `${ this.verticalOffset }px`
            };
        }
    },
    watch: {
        closed(newVal) {
            if (newVal) {
                this.visible = false;
                this.$el.addEventListener('animationend', this.destroyElement);
            }
        }
    },
    methods: {
        destroyElement() {
            this.$el.removeEventListener('animationend', this.destroyElement);
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        close() {
            this.closed = true;
            if (typeof this.onClose === 'function') {
                this.onClose();
            }
        }
    },
    mounted() {
        this.visible = true
        if (this.duration > 0) {
            this.timer = setTimeout(() => {
                if (!this.closed) {
                    this.close();
                }
            }, this.duration);
        }
    }
}
</script>

<style lang="scss" scoped>
    .message-item {
        position: fixed;
        margin-bottom: 28px;
        padding: 33px 22px 27px 23px;
        width: 328px;
        min-height: 100px;
        border-left: 5px solid #EB4E5C;
        border-radius: 5px;
        background-color: #fff;
        left: 32px;
        transition: all .5s;
        .txt-div {
            display: flex;
            flex-direction: row;
            img {
                width: 22px;
                height: 22px;
                flex: 0 0 auto;
            }
            p {
                padding-left: 10px;
                flex-grow: 1;
                font-size: 18px;
                color: #666;
                margin: 0;
            }
        }
    }
    .message-fade-enter-active {
        animation: message-in .5s;
    }
    .message-fade-leave-active {
        animation: message-in .5s reverse;
    }
    @keyframes message-in {
        0% {
            left: -328px;
            transform: scale(0);
            opacity: 0;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            left: 32px;
            transform: scale(1);
            opacity: 1;
        }
    }

</style>