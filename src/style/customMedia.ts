import { generateMedia } from "styled-media-query";
import { Device } from "./styleSetting";

export const CustomMedia = generateMedia({
    pc: `${String( Device.pc )}px`,
    ct: `${String( Device.ct )}px`,
    tb: `${String( Device.tb )}px`,
    sp: `${String( Device.sp )}px`
});