import { bgMagenta } from "colors"
import { CANCEL } from "bdsx/common"
import { command } from "bdsx/command"
import { events } from "bdsx/event"

export class CompassWarp {
    static command = command.register("compasswarp", "made by waternoob1005", 0)
    static enableCompassWarp = true
}

CompassWarp.command.overload((p, o) => {
    if (o.isServerCommandOrigin()) console.log(bgMagenta("[CompassWarp] made by waternoob1005"))
    else o.getEntity()?.runCommand(`tellraw @s {"rawtext":[{"text":"§dCompassWarp - made by waternoob1005"}]}`)
}, {})

CompassWarp.command.overload((p, o) => {
    if (o.isServerCommandOrigin()) {
        if (p.enable === "true") {
            console.log(bgMagenta("[CompassWarp] enable CompassWarp!"))
            CompassWarp.enableCompassWarp = true
        } else {
            console.log(bgMagenta("[CompassWarp] disable CompassWarp!"))
            CompassWarp.enableCompassWarp = false
        }
    } else {
        if (o.getEntity()?.getCommandPermissionLevel() !== 1) {
            o.getEntity()?.runCommand(`tellraw @s {"rawtext":[{"text":"§cyou are not a operator!"}]}`)
            return CANCEL
        }

        if (p.enable === "true") {
            o.getEntity()?.runCommand(`tellraw @s {"rawtext":[{"text":"§denable CompassWarp!"}]}`)
            CompassWarp.enableCompassWarp = true
        } else {
            o.getEntity()?.runCommand(`tellraw @s {"rawtext":[{"text":"§ddisable CompassWarp!"}]}`)
            CompassWarp.enableCompassWarp = false
        }
    }
}, {
    enable : command.enum("compasswarp.boolean", "true", "false")
})

events.blockDestroy.on((ev) => {
    if (ev.player.getMainhandSlot().getName().includes("compass") && CompassWarp.enableCompassWarp) {
        ev.player.runCommand(`tp @s ${ev.blockPos.x} ${ev.blockPos.y + 1} ${ev.blockPos.z}`)
        ev.player.sendMessage(`§dWhoosh!`)
        return CANCEL
    }
})