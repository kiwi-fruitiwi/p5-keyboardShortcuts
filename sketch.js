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
 *  ☒ implement ^e→prognosis, e→dosis, +e→zoe ^+e→panhaima
 *  ☐ kerachole expanding circle animation demo
 *  ☒ gcd bar prototype
 *  ☐ 2.5s dumb gcd 'bar'
 *  ☐ autorun, jump
 *  ☐ hardcode one set with icons flashing up
 */

let font
let instructions
let debugCorner /* output debug text in the bottom left corner of the canvas */

let player
let playerIcon
let abilityName
let eukrasia = false /* toggle for eukrasian abilities */

let lastGcdActionTimestamp
let gcdProgress
const GCD_DURATION = 2500


function preload() {
    font = loadFont('data/consola.ttf')
    playerIcon = loadImage('sage96px.png')
}


function setup() {
    let cnv = createCanvas(600, 300)
    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    player = new p5.Vector(width/2, height/2)
    abilityName = 'none'
    lastGcdActionTimestamp = 0
    gcdProgress = 0

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        numpad 1 → 🥝 freeze sketch 🐳</pre>`)

    debugCorner = new CanvasDebugCorner(5)
    playerIcon.resize(32, 0)
}


function draw() {
    background(234, 34, 24)

    /* GCD bar, bottom right */
    const GCD_BAR_WIDTH = 350
    const GCD_BAR_HEIGHT = 10
    const GCD_BAR_RIGHT_MARGIN = 10
    const GCD_BAR_BOTTOM_MARGIN = 10

    strokeWeight(1.25)
    stroke(0, 0, 100, 100)
    noFill()
    rect(width - GCD_BAR_RIGHT_MARGIN - GCD_BAR_WIDTH,
        height - GCD_BAR_BOTTOM_MARGIN - GCD_BAR_HEIGHT,
        GCD_BAR_WIDTH, /* should be mapped */
        GCD_BAR_HEIGHT,
        1)


    // let gcdProgress = map(mouseX, width - GCD_BAR_RIGHT_MARGIN - GCD_BAR_WIDTH,
    //     width, 0, GCD_BAR_WIDTH)
    // gcdProgress = constrain(gcdProgress, 0, GCD_BAR_WIDTH)

    /* progress should be number of seconds since last gcd */
    gcdProgress = millis() - lastGcdActionTimestamp

    noStroke()
    // fill(91, 100, 100, 30)
    fill(0, 0, 100, 30)
    rect(width - GCD_BAR_RIGHT_MARGIN - GCD_BAR_WIDTH,
        height - GCD_BAR_BOTTOM_MARGIN - GCD_BAR_HEIGHT,
        map(gcdProgress, 0, GCD_DURATION, 0, GCD_BAR_WIDTH),
        GCD_BAR_HEIGHT,
        1)

    /* reset progress when it reaches the full gcd duration */
    if (gcdProgress >= GCD_DURATION)
        lastGcdActionTimestamp = millis()


    /* draw tick mark for queueing */

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

    // strokeWeight(1.5)
    // stroke(0, 0, 100)
    // fill(91, 100, 100, 40)
    // rect(player.x, player.y, 32, 32, 10)
    image(playerIcon, player.x, player.y)

    let fps = `${frameRate().toFixed(0)}`

    /* debugCorner needs to be last so its z-index is highest */
    debugCorner.setText(`position → [${player.x}, ${player.y}]`, 3)
    debugCorner.setText(`frameCount → ${frameCount}, fps → ${fps}`, 2)
    debugCorner.setText(`eukrasia → ${eukrasia}`, 1)
    debugCorner.setText(`ability → ${abilityName}`, 0)
    debugCorner.show()

    if (frameCount > 3000)
        noLoop()
}


/* starts the GCD lock. called when a GCD ability is activated */
function activateGCD() {

}


/* starts an offGCD ability; usually you can weave two oGCDs */
function activateOffGCD() {

}


/* if the GCD isn't available, we'll need to queue the next ability */
function isGcdAvailable() {
    return millis() - lastGcdActionTimestamp > GCD_DURATION
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
        case 'y': /* testing new functionality */

            break
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
        case 'e': /* ^e→prognosis, e→dosis, +e→zoe ^+e→panhaima */
        case 'E': /* fall through; capslock+e gives 'E'. SHIFT check required*/
            if (keyIsDown(CONTROL)) {
                if (keyIsDown(SHIFT)) { /* ^+e→panhaima */
                    abilityName = 'panhaima'
                } else { /* ^e→prognosis */
                    if (eukrasia === true) {
                        abilityName = 'eukrasian prognosis!'
                        eukrasia = false
                    } else
                        abilityName = 'prognosis'
                }
                return false/* chrome opens address bar dropdown */
            } else if (keyIsDown(SHIFT)) {
                abilityName = 'zoe'
            } else if (eukrasia) {
                abilityName = 'eukrasian dosis!'
                eukrasia = false
            } else
                abilityName = 'dosis'
            break
        case 'r': /* toxikon, phlegma */
            abilityName = 'toxikon'
            break
        case 'f': /* diagnosis, pneuma */
            if (keyIsDown(CONTROL)) {
                abilityName = 'pneuma'
                return false
            } else if (eukrasia) {
                abilityName = 'eukrasian diagnosis!'
                eukrasia = false
            } else
                abilityName = 'diagnosis'

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