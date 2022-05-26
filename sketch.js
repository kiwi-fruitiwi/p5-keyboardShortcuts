/**
 *  @author kiwi
 *  @date 2022.05.26
 *
 *  component project for recognizing keyboard input combinations such as
 *  shift+s, ctrl+alt+e, or ctrl+x for keyboard shortcuts in other projects
 *
 *  ☒ get basic keyPress switch statement working → action dictionary
 *  ☐ try modifier keys
 *  ☐ hardcode one set with icons flashing up
 *  ☐ 2.5s with gcd "bar"
 */

let font
let instructions
let debugCorner /* output debug text in the bottom left corner of the canvas */

let player
let abilityName

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

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        numpad 1 → freeze sketch</pre>`)

    debugCorner = new CanvasDebugCorner(5)
}


function draw() {
    background(234, 34, 24)

    /* WASD movement */
    if ((keyIsPressed === true) && (key === 'a'))
        player.x -= 1
    if ((keyIsPressed === true) && (key === 'd'))
        player.x += 1
    if ((keyIsPressed === true) && (key === 'w'))
        player.y -= 1
    if ((keyIsPressed === true) && (key === 's'))
        player.y += 1

    stroke(0, 0, 100, 100)
    fill(0, 0, 100, 20)
    circle(player.x, player.y, 20)

    /* debugCorner needs to be last so its z-index is highest */
    debugCorner.setText(`frameCount: ${frameCount}`, 2)
    debugCorner.setText(`fps: ${frameRate().toFixed(0)}`, 1)
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

    switch (key) {
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
            }
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