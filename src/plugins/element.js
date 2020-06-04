import Vue from 'vue'
import {
  Button,
  Message,
  Scrollbar,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Aside,
  Header,
  Main,
  Row,
  Col,
  Table,
  TableColumn,
  MessageBox,
  MenuItemGroup,
  Form,
  FormItem,
  Input,
  RadioButton,
  RadioGroup,
  Select,
  Option,
  DatePicker,
  Dialog
} from 'element-ui'

// import lang from 'element-ui/lib/locale/lang/zh-TW'
// import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'

// locale.use(lang)
// Vue.use(Message)
// Vue.use(Button)

// Vue.use(Element, { locale })
Vue.use(Button)
Vue.use(Scrollbar)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(MenuItemGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.prototype.$_message = Message
Vue.prototype.$_confirm = MessageBox.confirm
