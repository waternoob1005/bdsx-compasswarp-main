import { events } from "bdsx/event"
import { bgMagenta } from "colors"

events.serverOpen.on(() => {
    import ("./compasswarp")
    console.log(bgMagenta("[CompassWarp] made by waternoob1005"))
})