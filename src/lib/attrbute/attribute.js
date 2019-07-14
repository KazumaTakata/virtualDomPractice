class ManipulateAttribute {
  setProp(Node, name, value) {
    if (name === 'className') {
      Node.setAttribute('class', value)
    } else if (name.startsWith('on')) {
      let eventKind = name.split('on')[1].toLowerCase()
      Node.addEventListener(eventKind, value)
    } else if (name === 'ref') {
      this.$refs[value] = Node
    } else {
      Node.setAttribute(name, value)
    }
  }

  setProps($target, props) {
    Object.keys(props).forEach(name => {
      this.setProp($target, name, props[name])
    })
  }

  setBooleanProp($target, name, value) {
    if (value) {
      $target.setAttribute(name, value)
      $target[name] = true
    } else {
      $target[name] = false
    }
  }

  removeBooleanProp($target, name) {
    $target.removeAttribute(name)
    $target[name] = false
  }
  removeProp($target, name, value) {
    if (name === 'className') {
      $target.removeAttribute('class')
    } else if (name.startsWith('on')) {
      let eventKind = name.split('on')[1].toLowerCase()
      $target.removeAttribute(eventKind)
    } else if (typeof value === 'boolean') {
      this.removeBooleanProp($target, name)
    } else {
      $target.removeAttribute(name)
    }
  }

  updateProps($target, newProps, oldProps = {}) {
    const props = Object.assign({}, newProps, oldProps)
    Object.keys(props).forEach(name => {
      this.updateProp($target, name, newProps[name], oldProps[name])
    })
  }

  updateProp($target, name, newVal, oldVal) {
    if (!newVal) {
      this.removeProp($target, name, oldVal)
    } else if (!oldVal || newVal !== oldVal) {
      this.setProp($target, name, newVal)
    }
  }
}

export default ManipulateAttribute
