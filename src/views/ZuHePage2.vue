<template>
  <div class="main-layer">
    <x-header class="is-new" :left-options="{showBack: false}">车贷计算器</x-header>
    <group>
      <popup-picker :data="vehicleList" title="车型:" v-model="vehicle" style="text-align:left">
      </popup-picker>
      <x-input title="车价:" placeholder="请输入车辆价格" v-model="cartMoney">
        <span slot="right">元</span>
      </x-input>
      <x-input title="贷款金额:" placeholder="请输入贷款金额" v-model="sloanMoney">
        <span slot="right">元</span>
      </x-input>
      <x-input title="利率:" placeholder="请输入贷款利率" v-model="rate">
        <span slot="right">%</span>
      </x-input>
      <x-button style="margin: 20px auto; width: 95%;" type="primary" @click.native="caculateLoan">
        开始计算
      </x-button>
    </group>
  </div>
</template>
<script>
    import {PopupPicker, XInput, Group, Cell, XButton, XHeader} from "vux";
    import storage from '../sessionStore'

    export default {
        components: {
            PopupPicker,
            XInput,
            Group,
            Cell,
            XButton,
            XHeader
        },
        mounted() {
            let initalLoanYears = [];
            for (let i = 2; i < 4; i++) {
                initalLoanYears.push(i + "年" + "(" + i * 12 + "期)")
            }
            this.sloanYearsList.push(initalLoanYears);
        },
        data() {
            return {
                cartMoney: storage.get('cartMoney') || "",
                sloanMoney: storage.get('sloanMoney') || "",
                rate: storage.get('rate') || "",
                sloanYearsList: [],
                sloanYear: storage.get('sloanYear') ? [storage.get('sloanYear')] : ["3年(36期)"],
                vehicle: ['二手车'],
                vehicleList: [['新车', '二手车']]
            };
        },
        watch: {
            cartMoney(value) {
                storage.set('cartMoney', value)
            },
            sloanMoney(value) {
                storage.set('sloanMoney', value)
            },
            rate(value) {
                storage.set('rate', value)
            },
            sloanYear(value) {
                storage.set('sloanYear', value)
            }
        },
        computed: {},
        methods: {
            caculateLoan() {
                let smonth = this.sloanYear[0].match(/\((\S*)\)/);
                let smonths = smonth[1].substr(0, smonth[1].length - 1);
                this.$router.push({
                    path: "/ZuhePayment2",
                    query: {
                        cartMoney: this.cartMoney,//车价
                        sloanMoney: this.sloanMoney,//商业贷款总额
                        smonths: 36,//商业贷款年限
                        rate: this.rate,
                        type: this.vehicle[0] === '二手车' ? "1" : "2",
                        jx: this.$route.fullPath === '/jx' ? "1" : ""
                    }
                });
            }
        }
    };
</script>
<style>
  .payRate {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #ffffff
  }
</style>
