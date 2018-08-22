export function toggleBodyOverFlow(isHidden){
    if(isHidden){
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('html').style.overflow = 'hidden';
    }else{
        document.querySelector('body').style.overflow = '';
        document.querySelector('html').style.overflow = '';
    }
}