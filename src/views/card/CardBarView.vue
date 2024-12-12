<template>
    <section>
        <!--是否登录-->
        <LoginWelcomeView />

        <!--今日赠言-->
        <TipView />

        <!--资源推介-->
        <PromotionView />
    </section>
</template>

<script>
import TipView from '@/views/card/TipView'
import PromotionView from '@/views/card/PromotionView'
import LoginWelcomeView from '@/views/card/LoginWelcomeView'

export default {
    name: 'CardBarView',
    components: { TipView, PromotionView, LoginWelcomeView }
}
</script>

<style scoped></style>