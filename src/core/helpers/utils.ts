export const isTouchable = () => {
    try{
        document.createEvent('TouchEvent');
        return true;
    }catch(e){
        return false;
    }
}

export const isBigScreen = () => {
    return window.innerWidth > 1200;
}

export const isPortraitScreen  = () => {
    return window.innerHeight > window.innerWidth
}