//% color="#EEAA00" icon="\uf018"
//% block="ET: Line follower"
//% block.loc.nl="ET: Lijn volger"
namespace EtLineFollow {
    let MODULE = "EtLineFollow"

    export enum Mode {
        //% block="a dark line on a light surface"
        //% block.loc.nl="een donkere lijn met een lichte ondergrond"
        BonW,
        //% block="a light line on a dark surface"
        //% block.loc.nl="een lichte lijn met een donkere ondergrond"
        WonB
    }

    export enum Sensor {
        //% block="far left"
        //% block.loc.nl="meest linkse"
        FarLeft,
        //% block="left"
        //% block.loc.nl="linker"
        Left,
        //% block="right"
        //% block.loc.nl="rechter"
        Right,
        //% block="far right"
        //% block.loc.nl="meest rechtse"
        FarRight
    }

    let EventFarLeftOn: EtCommon.eventHandler
    let EventFarLeftOff: EtCommon.eventHandler
    let EventLeftOn: EtCommon.eventHandler
    let EventLeftOff: EtCommon.eventHandler
    let EventRightOn: EtCommon.eventHandler
    let EventRightOff: EtCommon.eventHandler
    let EventFarRightOn: EtCommon.eventHandler
    let EventFarRightOff: EtCommon.eventHandler

    export function onEventFarLeft(id: string, value: string) {
        if (value == "on") {
            if (EventFarLeftOn) EventFarLeftOn(id)
        }
        else {
            if (EventFarLeftOff) EventFarLeftOff(id)
        }
    }

    export function onEventLeft(id: string, value: string) {
        if (value == "on") {
            if (EventLeftOn) EventLeftOn(id)
        }
        else {
            if (EventLeftOff) EventLeftOff(id)
        }
    }

    export function onEventRight(id: string, value: string) {
        if (value == "on") {
            if (EventRightOn) EventLeftOn(id)
        }
        else {
            if (EventRightOff) EventRightOff(id)
        }
    }

    export function onEventFarRight(id: string, value: string) {
        if (value == "on") {
            if (EventFarRightOn) EventFarRightOn(id)
        }
        else {
            if (EventFarRightOff) EventFarRightOff(id)
        }
    }

    //% block="ID"
    //% block.loc.nl="ID"
    export function id(): string {
        return MODULE
    }

    //% block="set module id to %id"
    //% block.loc.nl="stel de module id in op %id"
    //% id.defl="EtLineFollow"
    export function setModuleId(id: string) {
        MODULE = id
    }

    //% block="when the %sensor sensor of %id leaves the line"
    //% block.loc.nl="wanneer de %sensor sensor van %id van de lijn gaat"
    //% id.defl="EtLineFollow"
    export function onNoHover(sensor: Sensor, id: string, programmableCode: () => void): void {
        switch (sensor) {
            case Sensor.FarLeft:
                EventFarLeftOn = programmableCode
                EtCommon.events.register(MODULE, "off", onEventFarLeft)
                break
            case Sensor.Left:
                EventLeftOn = programmableCode
                EtCommon.events.register(MODULE, "off", onEventLeft)
                break
            case Sensor.Right:
                EventRightOn = programmableCode
                EtCommon.events.register(MODULE, "off", onEventRight)
                break
            case Sensor.FarRight:
                EventFarRightOn = programmableCode
                EtCommon.events.register(MODULE, "off", onEventFarRight)
                break
        }
    }

    //% block="when the %sensor sensor of %id hovers the line"
    //% block.loc.nl="wanneer de %sensor sensor van %id boven de lijn komt"
    //% id.defl="EtLineFollow"
    export function onHover(sensor: Sensor, id: string, programmableCode: () => void): void {
        switch (sensor) {
            case Sensor.FarLeft:
                EventFarLeftOn = programmableCode
                EtCommon.events.register(MODULE, "on", onEventFarLeft)
                break
            case Sensor.Left:
                EventLeftOn = programmableCode
                EtCommon.events.register(MODULE, "on", onEventLeft)
                break
            case Sensor.Right:
                EventRightOn = programmableCode
                EtCommon.events.register(MODULE, "on", onEventRight)
                break
            case Sensor.FarRight:
                EventFarRightOn = programmableCode
                EtCommon.events.register(MODULE, "on", onEventFarRight)
                break
        }
    }

    //% block="with %id ride on %mode"
    //% block.loc.nl="rijd met %id over %mode"
    //% id.defl="EtLineFollow"
    export function setMode(id: string, mode: Mode) {
        let sig = (mode == Mode.BonW ? "bonw" : "wonb")
        EtCommon.sendSignal(id, sig, "")
    }
}
