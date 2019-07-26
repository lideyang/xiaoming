<template>
  <div class="main-layer outerLayerDiv">
    <x-header>车贷计算器</x-header>
    <div class="content">
      <!--<canvas ref="totalCanvas"></canvas>-->
      <flexbox>
        <flexbox-item>
          <div class="name">贷款金额：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{money|formatCurrency}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="name">贷款期限：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{month}}</span>期</div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="name">综合服务费：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{comCost|formatCurrency}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="name">分期本金：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{splitAmount|formatCurrency}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="name">银行手续费：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{bankCost|formatCurrency}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="name">总还款：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{totalRepay|formatCurrency}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <!--<flexbox>-->
      <!--<flexbox-item>-->
      <!--<div class="name">真实率利：</div>-->
      <!--</flexbox-item>-->
      <!--<flexbox-item align="right">-->
      <!--<div class="flex-demo">{{realRate}}%</div>-->
      <!--</flexbox-item>-->
      <!--</flexbox>-->
      <!--<flexbox>-->
      <!--<flexbox-item>-->
      <!--<div class="name">总率利：</div>-->
      <!--</flexbox-item>-->
      <!--<flexbox-item align="right">-->
      <!--<div class="flex-demo">{{totalRate}}%</div>-->
      <!--</flexbox-item>-->
      <!--</flexbox>-->
      <!--<flexbox>-->
      <!--<flexbox-item>-->
      <!--<div class="name">真实分期本金：</div>-->
      <!--</flexbox-item>-->
      <!--<flexbox-item align="right">-->
      <!--<div class="flex-demo">{{realSplitAmount|formatCurrency}}元</div>-->
      <!--</flexbox-item>-->
      <!--</flexbox>-->

      <!--<flexbox>-->
      <!--<flexbox-item>-->
      <!--<div class="name">每月还款本金：</div>-->
      <!--</flexbox-item>-->
      <!--<flexbox-item align="right">-->
      <!--<div class="flex-demo">{{monthRepayAmount|formatCurrency}}元</div>-->
      <!--</flexbox-item>-->
      <!--</flexbox>-->
      <!--<flexbox>-->
      <!--<flexbox-item>-->
      <!--<div class="name">每月还款利息：</div>-->
      <!--</flexbox-item>-->
      <!--<flexbox-item align="right">-->
      <!--<div class="flex-demo">{{monthRepayInterest|formatCurrency}}元</div>-->
      <!--</flexbox-item>-->
      <!--</flexbox>-->


      <flexbox>
        <flexbox-item>
          <div class="name">每月还款：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{monthRepay|formatCurrency}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="name">首月多还：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{firstMonthRepay|formatCurrency}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="this.type===1">
        <flexbox-item>
          <div class="name">车损保额：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{cardInsured|formatCurrency}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="this.type===2">
        <flexbox-item>
          <div class="name">发票金额：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{invoiceAmount|formatCurrency}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <!--<p class="disctext" style="text-align:center">以上结果仅供参考</p>-->
    </div>
  </div>

</template>
<script>
  import {Flexbox, FlexboxItem, XButton, XHeader} from 'vux'
  //import {Ring, setArea} from '../chart'
  import {formatCurrency} from '../unilt'

  export default {

    components: {
      Flexbox,
      FlexboxItem,
      XButton,
      XHeader
    },
    data() {
      return {
        money: 0,
        month: 0,
        rate: 0,
        type: 1,
        ringList: [],
        houseTotalPrice: ''
      }
    },
    created() {
      this.money = Number(this.$route.query.sloanMoney)
      this.month = Number(this.$route.query.smonths)
      this.rate = Number(this.$route.query.rate)
      this.type = Number(this.$route.query.type)
    },
    mounted() {
      // const totalArr = [{text: '贷款金额', color: '#2FC25B', val: (this.money / this.totalRepay)*100}, {
      //   text: '银行手续费',
      //   color: '#FACC14',
      //   val: (this.bankCost / this.totalRepay)*100
      // }, {text: '综合服务费', color: '#1890FF', val: (this.comCost / this.totalRepay)*100}];
      // let ctx = setArea(this.$refs['totalCanvas'], 120, 120);//设置宽高倍数
      // let ring = new Ring(55, 20, {title: `总还款${formatCurrency(this.totalRepay)}元`, bgColor: '#fff'}, "butt");
      // ring.drawRing(ctx, 1.5 * Math.PI, totalArr, 70, 70);
    },
    filters: {
      formatCurrency
    },
    computed: {
      realRate() {
        if (this.type === 2) {
          return this.rate + (this.rate - 12) * .1
        }
        return this.rate + (this.rate - 14.5) * .1
      },
      totalRate() {
        return 1 + this.realRate * .01
      },
      realSplitAmount() {
        return (this.money * this.totalRate / 1.09).toFixed(2)
      },
      splitAmount() {
        return Math.ceil(this.realSplitAmount / 100) * 100
      },
      monthRepayAmount() {
        return Math.floor(this.splitAmount / this.month)
      },
      monthRepayInterest() {
        return Math.floor(this.bankCost / this.month)
      },
      totalRepay() {
        return (this.splitAmount * 1.09).toFixed(2)
      },
      bankCost() {
        return this.totalRepay - this.splitAmount
      },
      comCost() {
        return this.splitAmount - this.money
      },
      monthRepay() {
        return this.monthRepayAmount + this.monthRepayInterest
      },
      firstMonthRepay() {
        return this.totalRepay - this.monthRepay * this.month
      },
      cardInsured() {
        return Math.ceil((this.splitAmount / 0.7 / 1.2) / 100) * 100
      },
      invoiceAmount() {
        return this.splitAmount / 0.8
      }
    },
    methods: {},
  }
</script>
