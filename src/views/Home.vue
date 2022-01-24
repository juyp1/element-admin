<template>
  <div class="home">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>广告增长</span>
            </div>
          </template>
          <div id="container1"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>心跳频次</span>
            </div>
          </template>
          <div id="container2"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" style="margin-top:20px">
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>统计</span>
            </div>
          </template>
          <div id="container3"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>心跳频次</span>
            </div>
          </template>
          <div id="container4"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Line, Column, Pie, DualAxes } from '@antv/g2plot'
const lineData = ref([
  { year: '2010', value: 3123 },
  { year: '2011', value: 4441 },
  { year: '2012', value: 5700 },
  { year: '2013', value: 7111 },
  { year: '2014', value: 10000 },
  { year: '2015', value: 8982 },
  { year: '2016', value: 19999 },
  { year: '2017', value: 30000 },
  { year: '2018', value: 60000 }
])
const columnData = ref([
  { type: '1-3秒', value: 0.16 },
  { type: '4-10秒', value: 0.125 },
  { type: '11-30秒', value: 0.24 },
  { type: '31-60秒', value: 0.19 },
  { type: '1-3分', value: 0.22 },
  { type: '3-10分', value: 0.05 },
  { type: '10-30分', value: 0.01 },
  { type: '30+分', value: 0.015 }
])
const barData = ref([
  { type: '短视频', value: 27 },
  { type: 'App开屏', value: 25 },
  { type: '文章内', value: 18 },
  { type: 'App内顶部', value: 15 },
  { type: 'App切换', value: 10 },
  { type: '其他', value: 5 }
])
const dualAxesData = ref([
  { year: '2012', value: 3, count: 10 },
  { year: '2013', value: 13, count: 20 },
  { year: '2015', value: 4, count: 4 },
  { year: '2017', value: 3.5, count: 5 },
  { year: '2018', value: 5, count: 5 },
  { year: '2019', value: 4.9, count: 4.9 },
  { year: '2020', value: 6, count: 35 },
  { year: '2021', value: 7, count: 7 },
  { year: '2022', value: 9, count: 1 }
])
const paletteSemanticRed = ref('#F4664A')
const brandColor = ref('#5B8FF9')
const initLine = () => {
  const linePlot = new Line('container1', {
    data: lineData.value,
    xField: 'year',
    yField: 'value',
    autoFit: true,
    height: 300
  })

  linePlot.render()
}
const initColumn = () => {
  const columnPlot = new Column('container2', {
    data: columnData.value,
    xField: 'type',
    yField: 'value',
    autoFit: true,
    height: 300,
    seriesField: '',
    color: ({ type }) => {
      if (type === '10-30分' || type === '30+分') {
        return paletteSemanticRed.value
      }
      return brandColor.value
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value)
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%'
        }
      },
      offset: 10
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    }
  })

  columnPlot.render()
}

const initBar = () => {
  const piePlot = new Pie('container3', {
    appendPadding: 10,
    data: barData.value,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center'
      }
    },
    interactions: [{ type: 'element-active' }]
  })
  piePlot.render()
}
const initDualAxes = () => {
  const dualAxesPlot = new DualAxes('container4', {
    data: [dualAxesData.value, dualAxesData.value],
    xField: 'year',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9'
      },
      {
        geometry: 'line',
        color: '#5AD8A6'
      }
    ]
  })

  dualAxesPlot.render()
}
onMounted(() => {
  initLine()
  initColumn()
  initBar()
  initDualAxes()
})
</script>
