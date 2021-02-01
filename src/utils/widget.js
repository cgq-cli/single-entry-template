import { Toast, Dialog } from 'vant-green'
const widget = {
    toast(message, complete) {
        Toast({
            message: message,
            duration: 2000
        })
        setTimeout(() => {
            complete && complete instanceof Function && complete()
        }, 2000)
    },
    toastWarn(message, complete) {
        Toast.fail({
            message: message,
            duration: 2000
        })
        setTimeout(() => {
            complete && complete instanceof Function && complete()
        }, 2000)
    },
    toastSuccess(message, complete) {
        Toast.success({
            message: message,
            duration: 2000
        })
        setTimeout(() => {
            complete && complete instanceof Function && complete()
        }, 2000)
    },
    alert(title = '', message = '', complete) {
        Dialog.alert(
            title
                ? {
                    title: title,
                    message: message
                }
                : {
                    message: message
                }
        ).then(() => {
            complete && complete instanceof Function && complete()
        })
    }
}

export default widget
