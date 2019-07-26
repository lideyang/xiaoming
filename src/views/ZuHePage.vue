<template>
  <div class="main-layer">
    <x-header :left-options="{showBack: false}">车贷计算器</x-header>
    <group>
      <popup-picker :data="vehicleList" title="车型:" v-model="vehicle" style="text-align:left">
      </popup-picker>
      <x-input title="贷款金额:" placeholder="请输入贷款金额" v-model="sloanMoney">
        <span slot="right">元</span>
      </x-input>
      <popup-picker :data="sloanYearsList" title="贷款期限:" v-model="sloanYear" style="text-align:left">
      </popup-picker>
      <x-input title="利率:" placeholder="请输入贷款利率" v-model="rate">
        <span slot="right">%</span>
      </x-input>
      <x-button style="margin: 20px auto; width: 95%;" type="warn" @click.native="caculateLoan">开始计算</x-button>
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
      console.log(this.sloanYearsList)
    },
    data() {
      return {
        sloanMoney: storage.get('sloanMoney') || "",
        rate: storage.get('rate') || "",
        sloanYearsList: [],
        sloanYear: storage.get('sloanYear') ? [storage.get('sloanYear')] : ["3年(36期)"],
        vehicle: ['二手车'],
        vehicleList: [['新车', '二手车']]
      };
    },
    watch: {
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
    computed: {
      syears() {
        const month = this.sloanYear[0].match(/\((\S*)\)/);
        return parseInt(month[1].substr(0, month[1].length - 1) / 12);
      },
      gyears() {
        const month = this.gloanYear[0].match(/\((\S*)\)/);
        return parseInt(month[1].substr(0, month[1].length - 1) / 12);
      }
    },
    methods: {
      caculateLoan() {
        let smonth = this.sloanYear[0].match(/\((\S*)\)/);
        let smonths = smonth[1].substr(0, smonth[1].length - 1);
        this.$router.push({
          path: "/ZuhePayment",
          query: {
            sloanMoney: this.sloanMoney,//商业贷款总额
            smonths: smonths,//商业贷款年限
            rate: this.rate,
            type: this.vehicle[0] === '二手车' ? 1 : 2
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
