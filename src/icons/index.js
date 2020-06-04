import Vue from 'vue'
import Icon from '@/components/Icon'

const req = require.context('@/icons/svg', false, /\.svg$/)
req.keys().map(req)

Vue.component('Icon', Icon)
