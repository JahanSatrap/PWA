export const isTouchable = () => {
    try{
        document.createEvent('TouchEvent');
        return true;
    }catch(e){
        return false;
    }
}