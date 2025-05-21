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
}

namespace scene {

    //% blockID="extras_get_screen_brightness"
    //% block="screen brightness"
    //% group="System Menu"
    //% weight=0
    export function screenBrightness_block() {
        return screen.brightness()
    }

    //% blockID="extras_set_screen_brightness"
    //% block="set screen brightness $brightness"
    //% brightness.default=100
    //% group="System Menu"
    //% weight=0
    export function setScreenBrightness_block(brightness: number) {
        screen.setBrightness(brightness)
    }

    //% blockID="extras_open_system_menu"
    //% block="open system menu"
    //% group="System Menu"
    //% weight=0
    export function openSystemMenu_block() {
        scene.systemMenu.showSystemMenu()
    }

    //% blockID="extras_close_system_menu"
    //% block="close system menu"
    //% group="System Menu"
    //% weight=0
    export function closeSystemMenu_block() {
        scene.systemMenu.closeMenu()
    }

    //% blockID="extras_is_system_menu_open"
    //% block="is system menu open"
    //% group="System Menu"
    //% weight=0
    export function isSystemMenuOpen_block() {
        return scene.systemMenu.isVisible()
    }

    //% blockID="extras_add_system_menu_entry"
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
        return ()=>bool ? x : y
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

namespace images {

    //% blockID="extras_color_bubble"
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
    //% blockID="extras_rotate_image"
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
}