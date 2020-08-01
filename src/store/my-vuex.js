import Vue from 'vue'

class Store {
  constructor(options) {
    this.vm = new Vue({
      data: {
        state: options.state || {}
      }
    });

    let getters = options.getters || {};
    this.getters = {};
    // 使用getters时：
    /*
    store.js:
      getters: {
        name: (state) => state.fname + state.sname
      }
    */
   /*
   xxx.vue:
      {{ this.$store.getters.name }}
   */
    Object.keys(getters).forEach(key => {
      // 设置get方法，每次get对应的gettersName时，触发getters中的方法并返回结果
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](this.state)
      });
    });

    /*
      mutations: {
        increment (state, payload) {
          state.count += payload.amount
        }
      }
    */
    this.mutations = options.mutations || {};

    /*
      actions: {
        incrementAsync ({ commit }) {
          setTimeout(() => {
            commit('increment')
          }, 1000)
        }
      }
    */
    this.actions = options.actions || {};
    // 解决在actions中触发commit时this指向问题
    this.commit = this.commit.bind(this);
  }

  get state() {
    return this.vm.state;
  }

  /*
    store.commit('increment', {
      amount: 10
    })
    或
    store.commit({
      type: 'increment',
      amount: 10
    })
  */
  commit(...args) {
    let type, payload;
    if (typeof args[0] === 'object') {
      type = args[0].type;
      payload = { ...args[0] };
      Reflect.deleteProperty(payload, type);
    } else if (typeof args[0] === 'string') {
      type = args[0];
      payload = args[1];
    }
    if (Object.prototype.hasOwnProperty.call(this.mutations, type)) {
      this.mutations[type](this.state, payload);
    } else {
      console.error(`"${type}" is not in mutations`);
    }
  }

  /*
    // 以载荷形式分发
    store.dispatch('incrementAsync', {
      amount: 10
    })

    // 以对象形式分发
    store.dispatch({
      type: 'incrementAsync',
      amount: 10
    })
  */
  dispatch(...args) {
    let type, payload;
    if (typeof args[0] === 'object') {
      type = args[0].type;
      payload = { ...args[0] };
      Reflect.deleteProperty(payload, type);
    } else if (typeof args[0] === 'string') {
      type = args[0];
      payload = args[1];
    }
    if (Object.prototype.hasOwnProperty.call(this.actions, type)) {
      this.actions[type](this, payload);
    } else {
      console.error(`"${actions}" is not in mutations`);
    }
  }
}

let install = function(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else  {
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  })
}

let Vuex = {
  Store,
  install
}

export default Vuex;