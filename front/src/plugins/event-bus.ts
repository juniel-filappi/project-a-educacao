import mitt from "mitt"

const emitter = mitt()

export const EventBus = {
  $on: (event: string, callback: (event: any) => void) => emitter.on(event, callback),
  $off: (event: string, callback: (event: any) => void) => emitter.off(event, callback),
  $emit: (event: string, callback: any) => emitter.emit(event, callback),
}
