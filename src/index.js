import ReactDom from './lib/reactdom'
import Component from './test/refs/ref'

let component = new Component()

let main = document.getElementById('main')
ReactDom.render(component, main)
