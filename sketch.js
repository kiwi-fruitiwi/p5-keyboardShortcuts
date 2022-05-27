/**
 *  @author kiwi
 *  @date 2022.05.26
 *
 *  component project for recognizing keyboard input combinations such as
 *  shift+s, ctrl+alt+e, or ctrl+x for keyboard shortcuts in other projects
 *
 *  ☒ get basic keyPress switch statement working → action dictionary
 *  ☒ try modifier keys
 *  ☒ add shells for all sage abilities
 *  ☐ hardcode one set with icons flashing up
 *  ☐ 2.5s with gcd "bar"
 */

let font
let instructions
let debugCorner /* output debug text in the bottom left corner of the canvas */

let player
let abilityName
let eukrasia /* toggle for eukrasian abilities */

let lastGcdActionTimestamp
const GCD = 2500


function preload() {
    font = loadFont('data/consola.ttf')
}


function setup() {
    let cnv = createCanvas(600, 300)
    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    player = new p5.Vector(width/2, height/2)
    abilityName = 'none'
    lastGcdActionTimestamp = 0

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        numpad 1 → freeze sketch</pre>`)

    debugCorner = new CanvasDebugCorner(5)
}


function draw() {
    background(234, 34, 24)

    /* WASD movement a=65, d=68, w=87, s=83; handles multiple key presses */
    /* todo insert space to continue current direction for .5s */
    const MOVEMENT_PER_FRAME = 2
    if (!keyIsDown(17) && !keyIsDown(16)) {
        /* make sure control or shift are not held */
        if (keyIsDown(65))
            player.x -= MOVEMENT_PER_FRAME
        if (keyIsDown(68))
            player.x += MOVEMENT_PER_FRAME
        if (keyIsDown(87))
            player.y -= MOVEMENT_PER_FRAME
        if (keyIsDown(83))
            player.y += MOVEMENT_PER_FRAME
    }

    strokeWeight(1.5)
    stroke(0, 0, 100)
    fill(91, 100, 100, 40)
    rect(player.x, player.y, 32, 32, 10)

    /* debugCorner needs to be last so its z-index is highest */
    debugCorner.setText(`frameCount: ${frameCount}`, 3)
    debugCorner.setText(`fps: ${frameRate().toFixed(0)}`, 2)
    debugCorner.setText(`eukrasia: ${eukrasia}`, 1)
    debugCorner.setText(`ability: ${abilityName}`, 0)
    debugCorner.show()
}


function keyPressed() {
    /* stop sketch */
    if (keyCode === 97) { /* numpad 1 */
        noLoop()
        instructions.html(`<pre>
            sketch stopped</pre>`)
    }

    /* make an ability dictionary with only GCD commands?
        lastGcdActionTimestamp = millis()
        maybe this belongs in every case statement that's a GCD action
    */


    switch (key) {
        case 'w': /* holos is sadly ctrl+w */
            break
        case 's': /* soteria shift+s, krasis ctrl+s */
            if (keyIsDown(CONTROL)) {
                abilityName = 'krasis'
                return false
            }
            break
        case 'a': /* rhizomata */
            break
        case 'q':
            abilityName = 'eukrasia'
            eukrasia = true
            break
        case 'd':
            if (keyIsDown(CONTROL)) {
                abilityName = 'swiftcast'
                return false  /* chrome opens bookmark dialog */
            }
            break
        case 'e':
            if (keyIsDown(CONTROL)) {
                abilityName = 'prognosis'
                return false  /* chrome opens address bar dropdown */
            } else {
                abilityName = 'dosis'
            } /* add zoe as shift+e */
            break
        case 'r': /* toxikon, phlegma */
            abilityName = 'toxikon'
            break
        case 'f': /* diagnosis, pneuma */
            break
        case 't': /* pepsis */
            break
        case 'g': /* druochole */
            break
        case 'v': /* taurochole, kerachole */
            break
        case 'c': /* ixochole, physis */
            break
        case 'b': /* esuna */
            break
        case 'x': /* haima, lucid dreaming */
            break
        case '1': /* icarus */
            break
        case '2': /* egeiro */
            break
        case '3': /* dyskrasia */
            break
        case '4': /* rescue */
            break
        case '5': /* surecast */
            break
        default:
            console.log(key)
    }

    /* prototype for eukrasian dosis */
    if (key === 'e' && eukrasia === true) {
        abilityName = 'eukrasian dosis!'
        eukrasia = false
    }
}


/** 🧹 shows debugging info using text() 🧹 */
class CanvasDebugCorner {
    constructor(lines) {
        this.size = lines
        this.debugMsgList = [] /* initialize all elements to empty string */
        for (let i in lines)
            this.debugMsgList[i] = ''
    }

    setText(text, index) {
        if (index >= this.size) {
            this.debugMsgList[0] = `${index} ← index>${this.size} not supported`
        } else this.debugMsgList[index] = text
    }

    show() {
        textFont(font, 14)
        strokeWeight(1)

        const LEFT_MARGIN = 10
        const DEBUG_Y_OFFSET = height - 10 /* floor of debug corner */
        const LINE_SPACING = 2
        const LINE_HEIGHT = textAscent() + textDescent() + LINE_SPACING
        fill(0, 0, 100, 100) /* white */
        strokeWeight(0)

        for (let index in this.debugMsgList) {
            const msg = this.debugMsgList[index]
            text(msg, LEFT_MARGIN, DEBUG_Y_OFFSET - LINE_HEIGHT * index)
        }
    }
}