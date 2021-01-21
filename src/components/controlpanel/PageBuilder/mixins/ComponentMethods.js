export  const forstyles = {

    methods:{
        // computeStyle(array){
        //     const reducer = (accumulator, currentValue) => currentValue.styleElement && currentValue.styleElement !== "font-size" && currentValue.styleElement !== "line-height"? accumulator + currentValue.styleElement+':'+currentValue.val+'; ':accumulator +"";
        //     return array instanceof Object? Object.values(array).reduce(reducer,[]):array.reduce(reducer,[]);
        // },
        computeStyle(array){
            const reducer = (accumulator, currentValue) => currentValue.styleElement? accumulator + currentValue.styleElement+':'+currentValue.val+'; ':accumulator +"";
            return array instanceof Object? Object.values(array).reduce(reducer,[]):array.reduce(reducer,[]);
        },
    }
}

export const linkRoute = {

    methods:{
        pushRoute(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!this.linkitem.val){return}

            if(this.linkitem.val.startsWith('#'))
            {
                 document.getElementById(this.linkitem.val).scrollIntoView({block: "start", behavior: "smooth"});
            }
            else
            {
                if (this.linkitem.target) {
                    if (this.linkitem.linkinit === 'href') {
                        window.open(this.linkitem.val, '_blank')
                    }
                    if (this.linkitem.linkinit === 'route') {
                        var resolve = this.$router.resolve({path: this.linkitem.val});
                        window.open(resolve.href, '_blank')
                    }

                } else {
                    if (this.linkitem.linkinit === 'href') {
                        window.open(this.linkitem.val)
                    }
                    if (this.linkitem.linkinit === 'route') {
                        this.$router.push(this.linkitem.val);
                    }
                }
            }

        }
    }
}