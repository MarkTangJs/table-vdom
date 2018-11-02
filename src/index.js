//全局变量 vnode  用于保存当前vnode
var vnode

(function (window) {
    const snabbdom = require('snabbdom')
    //初始化 patch函数
    const patch = snabbdom.init([
        require('snabbdom/modules/class').default,
        require('snabbdom/modules/props').default,
        require('snabbdom/modules/style').default,
        require('snabbdom/modules/eventlisteners').default
    ])

    //申明h函数，用于生成vnode
    const h = require('snabbdom/h').default

    //渲染函数
    function render(container, data) {
        let _tds = []
        let _newVnode = h('table', {}, data.map(function (item) {
            let _i
            for (_i in item) {
                if (item.hasOwnProperty(_i)){
                    tds.push(h('td', {}, item[_i] + ''))
                }
            }

            return h('tr', {}, _tds)
        }))

        if (vnode) {
            // re-render
            patch(vnode, _newVnode)
        } else {
            // 初次渲染
            patch(container)
        }

        // 存储当前 vnode 结果
        vnode = newVnode
    }

    //验证初始化参数
    function validationInitData(container, data, tableHead) {
        if (container !== 'string' || container === '') {
            throw new Error('container 参数类型不对或为空!')
            return false
        }

        if (!data instanceof Array || data.length === 0) {
            throw new Error('data 参数类型不对或为空!')
            return false
        }

        if (!tableHead instanceof Object || tableHead.length > 0) {
            throw new Error('tableHead 参数类型不对或为空!')
            return false
        }

        return true
    }

    /**
     * 
     * @param String container 
     * @param Object data 
     */
    function tableVdom(container, data, tableHead) {
        this.container = container
        this.data = data
        this.tableHead  = tableHead
        this.isInit = false

        // 初始化
        this.init = () => {
            let result = validationInitData(this.container, this.data, this.tableHead)
            if(result === false){
                return null
            }

            //把表头放进data中
            this.data.unshift(this.tableHead)
            
            this.isInit = true

            // 方便链式调用
            return this
        }

        // 渲染
        this.render = () => {
            if (this.isInit === false) {
                throw new Error('还未进行初始化，请调用init函数进行初始化!')
                return null
            }

            render(this.container, this.data)

            return this
        }
    }

    // 向全局开放 构造函数 tableVdom
    window.tableVdom = tableVdom
})(window)