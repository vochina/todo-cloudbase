import {Dialog, Loading} from "quasar";

export function showErrorMessage(errorMessage) {
  Loading.hide()
  Dialog.create({
    title: '出错啦',
    message: errorMessage
  })
}
