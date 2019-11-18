<template>
  <div class="main-layer outerLayerDiv">
    <x-header class="is-new">车贷计算器</x-header>
    <div class="content is-new">
      <!--<canvas ref="totalCanvas"></canvas>-->
      <flexbox>
        <flexbox-item>
          <div class="name">车价：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{cartMoney|formatCurrency}}</span>元</div>
        </flexbox-item>
      </flexbox>
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
          <div class="name">首付金额：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{firstPay|formatCurrency}}</span>元</div>
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
          <div class="name">分期金额：</div>
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
          <div class="flex-demo"><span>{{bankCost|formatCurrency(true)}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="name">总还款：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{totalRepay|formatCurrency(true)}}</span>元</div>
        </flexbox-item>
      </flexbox>
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
          <div class="name">首月还款：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span>{{firstMonthRepay|formatCurrency(true)}}</span>元</div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="name" :span="4">车价：</div>
        </flexbox-item>
        <flexbox-item :span="8" align="right">
          <div class="flex-demo"><span>{{cartMoneyCap}}</span></div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="4">
          <div class="name">分期本金：</div>
        </flexbox-item>
        <flexbox-item :span="8" align="right">
          <div class="flex-demo"><span>{{splitAmountCap}}</span></div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="4">
          <div class="name">首付金额：</div>
        </flexbox-item>
        <flexbox-item :span="8" align="right">
          <div class="flex-demo"><span>{{firstPayCap}}</span></div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="name">首付比例校验：</div>
        </flexbox-item>
        <flexbox-item align="right">
          <div class="flex-demo"><span style="color:red">{{rateCheck}}</span></div>
        </flexbox-item>
      </flexbox>
      <!--<p class="disctext" style="text-align:center">以上结果仅供参考</p>-->
    </div>
  </div>

</template>
<script>
    import {Flexbox, FlexboxItem, XButton, XHeader} from 'vux'
    //import {Ring, setArea} from '../chart'
    import {formatCurrency, digitUppercase} from '../unilt'

    export default {

        components: {
            Flexbox,
            FlexboxItem,
            XButton,
            XHeader
        },
        data() {
            return {
                cartMoney: 0,
                money: 0,
                month: 0,
                rate: 0,
                type: 1,
                ringList: [],
                houseTotalPrice: ''
            }
        },
        created() {
            this.cartMoney = Number(this.$route.query.cartMoney)
            this.money = Number(this.$route.query.sloanMoney)
            this.month = Number(this.$route.query.smonths)
            this.type = Number(this.$route.query.type)
            this.rate = Number(this.$route.query.rate)
        },
        mounted() {

        },
        filters: {
            formatCurrency
        },
        computed: {
            bankMark() {
                if (this.month === 36) {
                    return 8.5
                } else if (this.month === 24) {
                    return 8.75
                }
                return 3
            },
            firstPay() {
                if (this.money == 0) {
                    return 0
                }
                return this.cartMoney - this.splitAmount
            },
            cartMoneyCap() {
                return digitUppercase(this.cartMoney)
            },
            splitAmountCap() {
                return digitUppercase(this.splitAmount)
            },
            firstPayCap() {
                return digitUppercase(this.firstPay)
            },
            rateCheck() {
                let rate = 1 - this.splitAmount / this.cartMoney
                if ((this.type == 1 && rate > .3) || (this.type == 2 && rate > .2)) {
                    return "正确"
                }
                return "错误"
            },
            realRate() {
                let constant = this.type === 2 ? 12 : 14.5
                let base = this.month === 24 ? 3 : 0
                return this.rate + (this.rate - constant + base) * .1
            },
            totalRate() {
                console.log(this.realRate)
                return 1 + this.realRate * .01
            },
            realSplitAmount() {
                let base = this.month === 24 ? 0.03 : 0
                console.log((this.money * this.totalRate / (1.09 - base)).toFixed(2))
                return (this.money * this.totalRate / (1.09 - base)).toFixed(2)
            },
            splitAmount() {
                return this.money + this.comCost
            },
            totalRepay() {
                return this.splitAmount + this.bankCost
            },
            bankCost() {
                return Number((this.splitAmount * this.bankMark / 100).toFixed(2))
            },
            comCost() {
                return Math.ceil(((this.rate - this.bankMark) * this.money) / 1000) * 10 + 250
            },
            monthRepay() {
                return parseInt(this.splitAmount / this.month) + parseInt(this.bankCost / this.month)
            },
            firstMonthRepay() {
                return Number((this.totalRepay - this.monthRepay * (this.month - 1)).toFixed(2))
            },
            cardInsured() {
                return Math.ceil((this.splitAmount / 0.7 / 1.2) / 100) * 100
            },
            invoiceAmount() {
                return Math.ceil(this.splitAmount / 0.8 / 1000) * 1000
            }
        },
        methods: {},
    }
</script>
