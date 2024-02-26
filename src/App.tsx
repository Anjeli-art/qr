import React, {useEffect, useState} from 'react';
import './App.css';
import QRCode from "react-qr-code";

const currencies = {
    eth: 'ethereum:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=0.01',
    btc: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=0.01',
    bnb: 'binance:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?amount=0.01',
    trx: 'trx:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=20.01',
    bch: "bitcoincash:qqnl0dhhtsrmg3skrchac843hxjj3dw2h5a36chuv0?amount=0.01",
    ltc: 'litecoin:ltc1q4dh2wsu6e0kk0wrtm0tj9qtawm3quat82z0tan?amount=0.01',
    zec: 'zcash:t1gWTu2mHZFDn7wnjgPSNeQnRdcDmLiEBE5?amount=0.01',
    qtum: 'qtum:QVLaLeMCVqgzLRRzkforN5x4LR6EpgrTLq?amount=0.01',
    btg: 'bitcoingold:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=2&label=btg',
    usdt: '0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=0.01',
    usdt_trc20: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=0.01',
    usdc: 'usdc:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=0.01',
    busd: 'busd:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?amount=0.01',
    bscusd: 'binance:0xf3D4B12f8FFB74e12ec0bC1F6F5e3fcF64A8b5a5?amount=100'
}

const currencies2 = {
    eth: 'ethereum:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?@1?value=2e18',//+
    btc: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=2&label=btc',//+
    bnb: 'ethereum:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?@56?value=2e18',//+
    trx: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=2',
    bch: "bitcoincash:qqnl0dhhtsrmg3skrchac843hxjj3dw2h5a36chuv0?amount=2",
    ltc: 'litecoin:ltc1q4dh2wsu6e0kk0wrtm0tj9qtawm3quat82z0tan?amount=2',
    zec: 'zcash:t1gWTu2mHZFDn7wnjgPSNeQnRdcDmLiEBE5?amount=2',
    qtum: 'qtum:QVLaLeMCVqgzLRRzkforN5x4LR6EpgrTLq?amount=2',
    btg: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=2&label=btc',
    usdt: 'ethereum:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=2',
    usdt_trc20: 'trx:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=2',
    usdc: 'usdc:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC852?value=',
    busd: 'busd:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?value=2',
    bscusd: 'bsc:0xf3D4B12f8FFB74e12ec0bC1F6F5e3fcF64A8b5a5?amount=100'
}

const currencies3 = {
    eth: 'ethereum:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?@1?value=2e18',//+
    btc: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=2&label=btc',//+
    bnb: 'ethereum:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?@56?value=2e18',//+
    trx: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=2',
    bch: "bitcoincash:qqnl0dhhtsrmg3skrchac843hxjj3dw2h5a36chuv0?amount=2",
    ltc: 'litecoin:ltc1q4dh2wsu6e0kk0wrtm0tj9qtawm3quat82z0tan?amount=2',
    zec: 'zcash:t1gWTu2mHZFDn7wnjgPSNeQnRdcDmLiEBE5?amount=2',
    qtum: 'qtum:QVLaLeMCVqgzLRRzkforN5x4LR6EpgrTLq?amount=2',
    btg: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=2&label=btc',
    usdt: 'ethereum:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=2',
    usdt_trc20: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=2',
    usdc: 'usdc:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=2',
    busd: 'busd:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?amount=2',
    bscusd: 'bsc:0xf3D4B12f8FFB74e12ec0bC1F6F5e3fcF64A8b5a5?amount=100'
}

const currencies4 = {
    eth: 'ethereum:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?@1?value=2e18',//+
    btc: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=2&label=btc',//+
    bnb: 'ethereum:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?@56?value=2e18',//+
    trx: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=2',
    bch: "bitcoincash:qqnl0dhhtsrmg3skrchac843hxjj3dw2h5a36chuv0?amount=2",
    ltc: 'litecoin:ltc1q4dh2wsu6e0kk0wrtm0tj9qtawm3quat82z0tan?amount=2',
    zec: 'zcash:t1gWTu2mHZFDn7wnjgPSNeQnRdcDmLiEBE5?amount=2',
    qtum: 'qtum:QVLaLeMCVqgzLRRzkforN5x4LR6EpgrTLq?amount=2',
    btg: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=2&label=btc',
    usdt: 'ethereum:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=2',
    usdt_trc20: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=2',
    usdc: 'usdc:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=2',
    busd: 'busd:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?amount=2',
    bscusd: 'bsc:0xf3D4B12f8FFB74e12ec0bC1F6F5e3fcF64A8b5a5?amount=100'
}

function App() {
    useEffect(() => {
        const resp = fetch('https://api.preprod.xamax.gpd.onl/.config/processing.json').then(res => res.json())
        console.log(resp);
    }, []);

    const [value, setValue] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')
    const [value4, setValue4] = useState('')

    return (
        <div className="App" style={{height: "100%", flexDirection: 'column', gap: 24, display: "flex", alignItems: 'center', justifyContent: "center"}}>
            {value}
            <div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>

                <QRCode
                    size={500}
                    style={{height: "auto", maxWidth: "100%", width: "100%"}}
                    value={value}
                    viewBox={`0 0 500 500`}
                />
            </div>
            <select onChange={e => setValue(e.target.value)} value={value} >
                {Object.keys(currencies).map(key => {
                   // @ts-ignore
                    return <option value={currencies[key]}>{key}</option>
                })}
            </select>
            {value2}
            <div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>

                <QRCode
                    size={500}
                    style={{height: "auto", maxWidth: "100%", width: "100%"}}
                    value={value2}
                    viewBox={`0 0 500 500`}
                />
            </div>
            <select onChange={e => setValue2(e.target.value)} value={value2} >
                {Object.keys(currencies2).map(key => {
                   // @ts-ignore
                    return <option value={currencies2[key]}>{key}</option>
                })}
            </select>
            {value3}
            <div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>

                <QRCode
                    size={500}
                    style={{height: "auto", maxWidth: "100%", width: "100%"}}
                    value={value3}
                    viewBox={`0 0 500 500`}
                />
            </div>
            <select onChange={e => setValue3(e.target.value)} value={value3} >
                {Object.keys(currencies3).map(key => {
                    // @ts-ignore
                    return <option value={currencies3[key]}>{key}</option>
                })}
            </select>
            {value4}
            <div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>

                <QRCode
                    size={500}
                    style={{height: "auto", maxWidth: "100%", width: "100%"}}
                    value={value4}
                    viewBox={`0 0 500 500`}
                />
            </div>
            <select onChange={e => setValue4(e.target.value)} value={value4} >
                {Object.keys(currencies4).map(key => {
                    // @ts-ignore
                    return <option value={currencies4[key]}>{key}</option>
                })}
            </select>

        </div>
    );
}

export default App;