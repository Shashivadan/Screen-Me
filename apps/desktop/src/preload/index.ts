import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    console.log("electronAPI",electronAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  console.log("electronAPI",electronAPI)
  // @ts-ignore (define in dts)
  window.electron = electronAPI



  // @ts-ignore (define in dts)
  window.api = api
}
