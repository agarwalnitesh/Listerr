
class AppToast {

    static toastRef = undefined;

    setToastRef(ref) {
        if (AppToast.toastRef === undefined) {
            AppToast.toastRef = ref;
        }
    }
}

export default AppToast;