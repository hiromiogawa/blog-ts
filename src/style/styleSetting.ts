// 基本色
type ColorType = {
    white: string;
    black01: string;
    black02: string;
    blue01: string;
    blue02: string;
    gray: string;
};

export const Color: ColorType = {
    white: '#ffffff',
    black01: '#333333',
    black02: '#11191c',
    blue01: '#025f80',
    blue02: '#008aba',
    gray: '#e9e7e3'
};


// 画面幅
type DeviceType = {
    pc: number;
    ct: number;
    tb: number;
    sp: number;
};

export const Device: DeviceType = {
    pc: 1920,
    ct: 1280,
    tb: 768,
    sp: 414
};


// px→vw
export const Vw = (px: number, width: number) => {
    return `${(( 100 / width) * px)}vw`;
};