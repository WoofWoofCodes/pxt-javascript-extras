enum SpriteFlag {
    //% block="use hitbox overlaps"
    HitboxOverlaps = sprites.Flag.HitboxOverlaps,
    //% block="destroyed"
    Destroyed = sprites.Flag.Destroyed
}

namespace sprites {

    //% blockID="extras_has_sprite_flags"
    //% block="$s=variables_get(mySprite) has flag $f"
    //% group="Effects" weight=0
    export function hasFlag(s: Sprite, f: SpriteFlag) {
        return (s.flags & f) ? true : false
    }

    //% blockID="extras_undestroy_sprite"
    //% block="undestroy sprite $s=variables_get(mySprite)"
    //% group="Effects" weight=79
    export function unDestroySprite_block(s: Sprite) { // this too so long to figure out :D
        s.setFlag(SpriteFlag.Destroyed, false)
        game.currentScene().spritesByKind[s.kind()].add(s)
        game.currentScene().physicsEngine.addSprite(s)
        game.currentScene().allSprites.push(s)
        game.currentScene().createdHandlers.filter(h => h.kind == s.kind()).forEach(h => h.handler(s))
    }
}

//% weight=10 icon="\uf03e" color="#1d073d"
//% advanced=true
namespace extras {
    /**
     * Causes an error if the condition is false. Error code can be seen when using debug mode.
     */
    //% blockId="extras_assert"
    //% block="assert $cond code $code"
    export function assert_block(cond: boolean, code: number) {
        control.assert(cond, code)
    }

    /**
     * Causes an error with a code that shows up in the panic message.
     */
    //% blockId="extras_panic"
    //% block="panic code $code"
    export function panic_block(code: number) {
        control.panic(code)
    }
}

namespace loops {
    /**
     * Run code seemingly at the same time that other code is running
     */
    //% blockId="extras_run_in_parallel"
    //% block="run in parallel"
    //% handlerStatement
    export function runInParallel_block(a: ()=>void) {
        control.runInParallel(a)
    }
}

namespace controller {
    /**
     * Change the system keys. 'Gif' is only used when sharing the project.
     */
    //% blockId="extras_setSystemKeys"
    //% block="set system keys | screenshot $screenshot git $gif menu $menu reset $reset"
    export function setSystemKeys_block(screenshot: keymap.KeyCode, gif: keymap.KeyCode, menu: keymap.KeyCode, reset: keymap.KeyCode) {
        keymap.setSystemKeys(screenshot, gif, menu, reset)
    }
}

namespace scene {
    //% blockId="extras_get_screen_brightness"
    //% block="screen brightness"
    //% group="System Menu"
    //% weight=0
    export function screenBrightness_block() {
        return screen.brightness()
    }

    //% blockId="extras_set_screen_brightness"
    //% block="set screen brightness $brightness"
    //% brightness.default=100
    //% group="System Menu"
    //% weight=0
    export function setScreenBrightness_block(brightness: number) {
        screen.setBrightness(brightness)
    }

    //% blockId="extras_open_system_menu"
    //% block="open system menu"
    //% group="System Menu"
    //% weight=0
    export function openSystemMenu_block() {
        scene.systemMenu.showSystemMenu()
    }

    //% blockId="extras_close_system_menu"
    //% block="close system menu"
    //% group="System Menu"
    //% weight=0
    export function closeSystemMenu_block() {
        scene.systemMenu.closeMenu()
    }

    //% blockId="extras_is_system_menu_open"
    //% block="is system menu open"
    //% group="System Menu"
    //% weight=0
    export function isSystemMenuOpen_block() {
        return scene.systemMenu.isVisible()
    }

    //% blockId="extras_add_system_menu_entry"
    //% block="add entry to system menu with image $image and text $text"
    //% image.shadow=screen_image_picker
    //% group="System Menu"
    //% weight=1
    export function addSystemMenuEntry_block(image: Image, text: string, onClick: ()=>void) {
        scene.systemMenu.addEntry(()=>text, onClick, image)
    }

}

namespace Math {
    //% blockID="extras_return_if"
    //% block="$bool ? $x : $y"
    //% weight=0
    export function returnIf_block(bool: boolean, x: any, y: any) {
        return bool ? x : y
    }

    export enum BitOp {
        //% block="&"
        and,
        //% block="|"
        or,
        //% block="^"
        xor,
        //% block=">>"
        shift_right,
        //% block="<<"
        shift_left,
        //% block=">>>"
        shift_right_0_fill
    }

    /**
     * Bit operations! Since blocks call functions, this is most certainly slower than using these outside of block code.
     */
    //% blockID="extras_bit_ops"
    //% block="$a $op $b"
    //% group="Bit Operations"
    export function bitOp_block(a: number, op: BitOp, b: number) {
        switch (op) {
            case 0: return a & b
            case 1: return a | b
            case 2: return a ^ b
            case 3: return a >> b
            case 4: return a << b
            case 5: return a >>> b
        }
        return 0
    }

    //% blockID="extras_bit_op_not"
    //% block="~$a"
    //% group="Bit Operations"
    export function bitOp_not_block(a: number) {
        return ~a
    }
}

namespace info {

    //% blockID="extras_info_set_font_color"
    //% block="set info font color $c"
    //% c.shadow=colorindexpicker
    //% group="Style"
    export function setFontColor_block(c: number) {
        info.setFontColor(c)
    }

    //% blockID="extras_info_set_border_color"
    //% block="set info border color $c"
    //% c.shadow=colorindexpicker
    export function setBorderColor_block(c: number) {
        info.setBorderColor(c)
    }

    //% blockID="extras_info_set_background_color"
    //% block="set info background color $c"
    //% c.shadow=colorindexpicker
    export function setBackgroundColor_block(c: number) {
        info.setBackgroundColor(c)
    }

    //% blockID="extras_info_set_life_imagee"
    //% block="set life image $image"
    //% image.shadow="screen_image_picker"
    export function setLifeImage_block(image: Image) {
        info.setLifeImage(image)
    }

    //info.

}

namespace music {
    //% blockID="extras_play_instruction"
    //% block="play instructions $instructions || after $when ms"
    //% blockNamespace=music 
    //% inBasicCategory = true
    //% blockGap=8
    //% group="Tone"
    //% instructions.shadow=variables_get
    //% instructions.defl="buffer"
    export function playInstructions_block(instructions: Buffer, when: number = 0) {
        music.playInstructions(when, instructions)
    }

    /**
    * Writes info to be played by the Play Instructions block. Buffer should be 12 bytes long.
    */
    //% blockID="extras_add_note"
    //% block="write sound instructions to buffer $target ms $ms start volume $beg end volume $end wave type $soundWave start hz $hz end hz $endHz total volume $volume start byte $writeLoc"
    //% blockNamespace=music 
    //% inBasicCategory = true
    //% blockGap=8
    //% group="Tone"
    //% target.shadow=variables_get
    //% target.defl="buffer"
    //% volume.shadow="extras_music_volume"
    export function addNote_block(target: Buffer, ms: number, beg: number, end: number, soundWave: number, hz: number, endHz: number, volume: number = -1, writeLoc: number = 0) {
        if (volume < 0) volume = music.volume()
        music.addNote(target, writeLoc, ms, beg, end, soundWave, hz, volume, endHz)
    }

    /**
    * The volume set by the user in the system menu.
    */
    //% blockId="extras_music_volume"
    //% block="system volume"
    //% group="Volume"
    export function volume_block() {
        return music.volume()
    }
}

namespace images {

    //% blockId="extras_color_bubble"
    //% block="$color"
    //% color.shadow=colorindexpicker
    //% group="Create"
    //% weight=0
    export function color_block(color: number): number { // stolen from unsignedArduino's colorBlock extension >:)
        return color
    }
    
    /** 
    * Returns an image rotated by -90, 90, -180, 180, -270, 270 deg clockwise. Only works well with square images.
    */
    //% blockId="extras_rotate_image"
    //% block="rotate $image cardinal degrees $deg"
    //% image.shadow=variables_get
    //% image.defl="picture"
    //% group="Transformations"
    export function rotate_image_block(image: Image, deg: number): Image {
        return helpers.imageRotated(image, deg)
    }

    /** 
    * Returns a transposed image (with X/Y swapped). Only works well with square images.
    */
    //% blockID="extras_rotate_image"
    //% block="transpose $image"
    //% image.shadow=variables_get
    //% image.defl="picture"
    //% group="Transformations"
    export function transpose_image_block(image: Image): Image {
        return image.transposed()
    }

    /**
     * Copy an image from a source rectangle to a destination rectangle, stretching or compressing to fit the dimensions of the destination rectangle, if necessary.
     */
    //% block="Blit source $source at sx $sx sy $sy with width $sw and height $sh onto $target at x $tx y $ty with width $tw and height $th"
    //% blockId="extras_Blit_Block_API"
    //% source.shadow=variables_get
    //% source.defl=picture
    //% target.shadow=variables_get
    //% target.defl="picture"
    //% sx.defl=0
    //% sy.defl=0
    //% sw.defl=16
    //% sh.defl=16
    //% tx.defl=0
    //% ty.defl=0
    //% tw.defl=16
    //% th.defl=16
    //% group="Drawing"
    export function blit(source: Image, sx: number, sy: number, sw: number, sh: number, target: Image, tx: number, ty: number, tw: number, th: number) {
        target.blit(tx, ty, tw, th, source, sx, sy, sw, sh, true, false)
    }

    /**
     * Creates a new image by scaling a source image
     */
    //% block="Create image of $source scaled by width $width height $height"
    //% blockId="extras_Stretch_Image_API"
    //% source.shadow=variables_get
    //% source.defl="picture"
    //% group="Drawing"
    export function stretchImage(source: Image, width: number, height: number) {
        let i = image.create(source.width * width, source.height * height)
        i.blit(0, 0, source.width * width, source.height * height, source, 0, 0, source.width, source.height, true, false)
        return i
    }

    export enum Imagefonts {
        font8,
        font5,
        font12
    }

    /**
     * Draws text on an image
     */
    //% block="Print text $text on $target at x $x y $y color $c||font $font"
    //% blockId="extras_print_text"
    //% target.shadow=variables_get
    //% target.defl="picture"
    //% group="Text"
    export function print_block(text: string, target: Image, x: number, y: number, c: number = 1, font: Imagefonts = Imagefonts.font8) {
        target.print(text, x, y, c, [image.font8, image.font5, image.font12][font])
    }

    /**
     * Draws text on an image
     */
    //% block="Print centered (x) text $text on $target at y $y color $c||font $font"
    //% blockId="extras_print_center_text"
    //% target.shadow=variables_get
    //% target.defl="picture"
    //% group="Text"
    //% weight=1
    export function printCenter_block(text: string, target: Image, y: number, c: number = 1, font: Imagefonts = Imagefonts.font8) {
        target.printCenter(text, y, c, [image.font8, image.font5, image.font12][font])
    }

    /**
     * One byte, per color channel (rgb), per color, so total 48 bytes.
     */
    //% blockId=extras_set_palette
    //% group="Create"
    //% blockNamespace="images"
    //% block="set palette $palette"
    //% palette.shadow=variables_get
    //% palette.defl="buffer"
    export function setPalette_block(palette: Buffer) {
        image.setPalette(palette)
    }
}

//% weight=71 color="#a5b1c3"
//% advanced="true"
namespace buffer {

    //% blockID="extras_create_buffer"
    //% block="create empty buffer with length $l"
    //% group="create"
    //% weight=100
    export function createBuffer_block (l: number) {
        return control.createBuffer(l)
    }

    //% blockID="extras_create_buffer"
    //% block="create buffer from array $a"
    //% a.shadow=variables_get
    //% a.defl="list"
    //% group="create"
    export function createBufferFromArray_block(a: Array<number>) {
        return Buffer.fromArray(a)
    }

    //% blockID="extras_create_buffer"
    //% block="create buffer from base 64 string $s"
    //% group="create"
    export function createBufferFromBase64_block(s: string) {
        return Buffer.fromBase64(s)
    }

    //% blockID="extras_create_buffer"
    //% block="create buffer from hex string $s"
    //% group="create"
    export function createBufferFromHex_block(s: string) {
        return Buffer.fromHex(s)
    }
    
    //% blockID="extras_write128_buffer"
    //% block="$b write $n at $p"
    //% b.shadow=variables_get
    //% b.defl="buffer"
    //% group="Modify"
    export function bufferWrite128_block(b: Buffer, p: number, n: number) {
        b[p] = n
    }

    //% blockID="extras_write_buffer"
    //% block="$b write $n as $t at $p"
    //% b.shadow=variables_get
    //% b.defl="buffer"
    //% group="Modify"
    export function bufferWrite_block(b: Buffer, t: NumberFormat, p: number, n: number) {
        b.setNumber(t, p, n)
    }

    //% blockID="extras_read128_buffer"
    //% block="$b read number at $p"
    //% b.shadow=variables_get
    //% b.defl="buffer"
    //% group="Read"
    export function bufferRead128_block(b: Buffer, p: number) {
        return b[p]
    }

    //% blockID="extras_read_buffer"
    //% block="$b read number at $p as $t"
    //% b.shadow=variables_get
    //% b.defl="buffer"
    //% group="Read"
    export function bufferReadNumber_block(b: Buffer, t: NumberFormat, p: number) {
        return b.getNumber(t, p)
    }
}


namespace arrays_blocks {
    
    //% blockID="extras_slice_array"
    //% block="Get array of $a from $s to $e"
    //% a.shadow=variables_get
    //% a.defl="list"
    //% s.defl=0
    //% e.defl=0
    //% group="Read"
    //% blockNamespace="arrays"
    export function slice_array_block(a: Array<any>, s: number, e: number) {
        return a.slice(s, e)
    }

    //% blockID="extras_copy_array"
    //% block="copy $a"
    //% a.shadow=variables_get
    //% a.defl="list"
    //% group="Read"
    //% blockNamespace="arrays"
    export function copy_array_block(a: Array<any>) {
        return a.slice()
    }
}