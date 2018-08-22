export default {
    bind(el){
        el.addEventListener('click',function (e){
            e.preventDefault();
            if(this.getAttribute('url')){
                window.location = this.getAttribute('url');
                return
            }
            if(document.referrer.indexOf('tuniu'>=0)){
                if(/qq/i.test(navigator.userAgent)){
                    window.location = document.referrer
                } else {
                    history.go(-1)
                }
            }else{
                window.location = '/'
            }
        },false)
    }
}