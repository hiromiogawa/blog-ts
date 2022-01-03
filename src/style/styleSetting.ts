// 基本色
type ColorType = {
    [key: string] : string;
};

export const Color: ColorType = {
    white01: '#ffffff',
    whitesmoke: '#dcdcdc',
    black01: '#333333',
    black02: '#11191c',
    blue01: '#025f80',
    blue02: '#008aba',
    gray: '#e9e7e3',
    green01: '#00793D'
};


// 画面幅
type DeviceType = {
    [key: string] : number;
};

export const Device: DeviceType = {
    pc: 1920,
    ct: 1080,
    tb: 768,
    sp: 414
};


// px→vw
export const Vw = (px: number, width: number) => {
    return `${(( 100 / width) * px)}vw`;
};