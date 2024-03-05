import React, { useEffect, useState } from "react";
import "./App.css";
import QRCode from "react-qr-code";

type CryptoType =
  | "eth"
  | "btc"
  | "bnb"
  | "trx"
  | "bch"
  | "ltc"
  | "zec"
  | "qtum"
  | "btg"
  | "usdt"
  | "usdt_trc20"
  | "usdc"
  | "busd"
  | "bscusd";

type ObjType = {
  [CryptoType: string]: string;
};

// const currencies = {
//     eth: 'ethereum:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=123.01',
//     btc: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=123.01',
//     bnb: 'binance:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?amount=123.01',
//     trx: 'trx:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=123.01',
//     bch: "bitcoincash:qqnl0dhhtsrmg3skrchac843hxjj3dw2h5a36chuv0?amount=123.01",
//     ltc: 'litecoin:ltc1q4dh2wsu6e0kk0wrtm0tj9qtawm3quat82z0tan?amount=123.01',
//     zec: 'zcash:t1gWTu2mHZFDn7wnjgPSNeQnRdcDmLiEBE5?amount=123.01',
//     qtum: 'qtum:QVLaLeMCVqgzLRRzkforN5x4LR6EpgrTLq?amount=123.01',
//     btg: 'bitcoingold:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=123.01',
//     usdt: '0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=123.01',
//     usdt_trc20: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=123.01',
//     usdc: 'usdc:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?amount=123.01',
//     busd: 'busd:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?amount=123.01',
//     bscusd: 'binance:0xf3D4B12f8FFB74e12ec0bC1F6F5e3fcF64A8b5a5?amount=123.01'
// }

const currencies2: ObjType = {
  eth: "ethereum:0xeE5F108cfe252d49126d76A8136e8755D79c9E17@1?value=123.01e18", //+
  btc: "bitcoin:1MJybmdee9LkEzWXKFZHrKpZTTmkxNtS8H?amount=123.01&label=btc", //+
  trx: "trx:TU7pdJvYiyPgdd7RUiUi8i5uhzF2FwquoK?amount=123.01",
  bch: "bitcoincash:qp087ktp99qj30hl9xl4fzzp9re7djcdfymmvj36vd?amount=123.01&label=bch",
  ltc: "litecoin:Lbvfk9GCGEk1T14pi83m9zxGsV68G2CAhU?amount=123.01",
  zec: "zcash:t1b4VTvXogEApbZvwVHvW3nFozeB59eGF1V?amount=123.01",
  qtum: "qtum:QgXHTHDvB3PPWoBRURFY4vNpXxPA38V55X?amount=123.01",
  dash: "dash:XhzNPfqoyG96c5QagQuJsJpW2PbL7wFkT5?amount=123.01",
  btg: "bitcoingold:GbzhyxiaiXqWiTx5fVcQaN2VVmK9QM3fyN?amount=123.01&label=btg",
  usdt: "0xeE5F108cfe252d49126d76A8136e8755D79c9E17?amount=123.01",
  usdt_trc20: "tron:TU7pdJvYiyPgdd7RUiUi8i5uhzF2FwquoK?amount=123.01",
  usdc: "0xeE5F108cfe252d49126d76A8136e8755D79c9E17?amount=123.01",
  bnb: "bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3", //+
  busd: "0xFB080273Be719a4fe8CFceB3e8a758aE4ee1aa99",
  bscusd: "0xa9726B663A486528D0600800A16E68012e3F7d8f",
};

// const currencies3 = {
//     eth: 'ethereum:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85@1?value=123010000000000000000',//+
//     btc: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=123.01&label=btc',//+
//     bnb: 'ethereum:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3@56?value=123010000000000000000',//+
//     trx: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=123.01',
//     bch: "bitcoincash:qqnl0dhhtsrmg3skrchac843hxjj3dw2h5a36chuv0?amount=123.01&label=bch",
//     ltc: 'litecoin:ltc1q4dh2wsu6e0kk0wrtm0tj9qtawm3quat82z0tan?amount=123.01&label=ltc',
//     zec: 'zcash:t1gWTu2mHZFDn7wnjgPSNeQnRdcDmLiEBE5?amount=123.01&label=zec',
//     qtum: 'qtum:QVLaLeMCVqgzLRRzkforN5x4LR6EpgrTLq?amount=123.01&label=qtum',
//     btg: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=123.01&label=btg',
//     usdt: 'ethereum:0x3bFE52C28219fd26Fda584fbc8c8e87f728a2073?address=0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?&uint123.01=Amount',
//     usdt_trc20: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=123.01&token=TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj',
//     usdc: 'ethereum:0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f?address=0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?&uint123.01=Amount',
//     busd: 'ethereum:0xFB080273Be719a4fe8CFceB3e8a758aE4ee1aa99?address=bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?&uint123.01=Amount',
//     bscusd: 'ethereum:0xa9726B663A486528D0600800A16E68012e3F7d8f?address=bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?&uint123.01=Amount'
// }

// const currencies4 = {
//     eth: 'ethereum:0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85@1?value=123010000000000000000',//+
//     btc: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=123.01&label=btc',//+
//     bnb: 'ethereum:bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3@56?value=123010000000000000000',//+
//     trx: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa?amount=123.01',
//     bch: "bitcoincash:qqnl0dhhtsrmg3skrchac843hxjj3dw2h5a36chuv0?amount=123.01",
//     ltc: 'litecoin:ltc1q4dh2wsu6e0kk0wrtm0tj9qtawm3quat82z0tan?amount=123.01',
//     zec: 'zcash:t1gWTu2mHZFDn7wnjgPSNeQnRdcDmLiEBE5?amount=123.01',
//     qtum: 'qtum:QVLaLeMCVqgzLRRzkforN5x4LR6EpgrTLq?amount=123.01',
//     btg: 'bitcoin:bc1q7xgg5tlumsqqzeagwup8urcfvaaex0r9rzd9w5?amount=123.01&label=btc',
//     usdt: 'ethereum:0x3bFE52C28219fd26Fda584fbc8c8e87f728a2073@1/transfer?address=0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?&uint123.01=Amount',
//     usdt_trc20: 'tron:TNu12JGxFc9gfXkeRC75Uz473b2W4f2zQa&token=TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj?amount=123.01',
//     usdc: 'ethereum:0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f@1/transfer?address=0x52f81E81fe7dA6fA2C20E270FBaB2Fe3131cbC85?&uint123.01=Amount',
//     busd: 'ethereum:0xFB080273Be719a4fe8CFceB3e8a758aE4ee1aa99@1/transfer?address=bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?&uint123.01=Amount',
//     bscusd: 'ethereum:0xa9726B663A486528D0600800A16E68012e3F7d8f@1/transfer?address=bnb1r8vaq3l5pddgx65es9j5qkvk0guzh55awwnqa3?&uint123.01=Amount'
// }

function App() {
  useEffect(() => {
    const resp = fetch(
      "https://api.preprod.xamax.gpd.onl/.config/processing.json"
    ).then((res) => res.json());
    console.log(resp);
  }, []);

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");

  const handleChange = (e: any) => {
    console.log(e.target.value);
    console.log(e.currentTarget.value);
    // setValue2(e.target.value)
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <div
      className="App"
      style={{
        flexDirection: "column",
        gap: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/*1.{value}*/}
      {/*<div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>*/}

      {/*    <QRCode*/}
      {/*        size={500}*/}
      {/*        style={{height: "auto", maxWidth: "100%", width: "100%"}}*/}
      {/*        value={value}*/}
      {/*        viewBox={`0 0 500 500`}*/}
      {/*    />*/}
      {/*</div>*/}
      {/*<select onChange={e => setValue(e.target.value)} value={value} >*/}
      {/*    {Object.keys(currencies).map(key => {*/}
      {/*       // @ts-ignore*/}
      {/*        return <option value={currencies[key]}>{key}</option>*/}
      {/*    })}*/}
      {/*</select>*/}
      {/*2.{currencies2[value2]}*/}
      {/*<div style={{height: "auto", margin: "0 auto", maxWidth: 400, width: "100%"}}>*/}

      {/*    <QRCode*/}
      {/*        size={500}*/}
      {/*        style={{height: "auto", maxWidth: "100%", width: "100%"}}*/}
      {/*        value={currencies2[value2]}*/}
      {/*        viewBox={`0 0 500 500`}*/}
      {/*    />*/}
      {/*</div>*/}
      {/*<select onChange={handleChange} value={value2}>*/}
      {/*    {Object.keys(currencies2).map(key => {*/}
      {/*        // @ts-ignore*/}
      {/*        return <option key={key} name={key} value={key}>{key}</option>*/}
      {/*    })}*/}
      {/*</select>*/}
      {/*2.{currencies2[value2]}*/}
      <div style={{ margin: "0 auto", maxWidth: 600, width: "100%" }}>
        {Object.keys(currencies2).map((key) => {
          // @ts-ignore
          return (
            <div style={{ padding: "100px" }}>
              <QRCode
                size={600}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={currencies2[key]}
                viewBox={`0 0 500 500`}
              />
              <p>{key}</p>
              <p>{currencies2[key]}</p>
            </div>
          );
        })}
      </div>
      {/*3.{value3}*/}
      {/*<div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>*/}

      {/*    <QRCode*/}
      {/*        size={500}*/}
      {/*        style={{height: "auto", maxWidth: "100%", width: "100%"}}*/}
      {/*        value={value3}*/}
      {/*        viewBox={`0 0 500 500`}*/}
      {/*    />*/}
      {/*</div>*/}
      {/*<select onChange={e => setValue3(e.target.value)} value={value3} >*/}
      {/*    {Object.keys(currencies3).map(key => {*/}
      {/*        // @ts-ignore*/}
      {/*        return <option value={currencies3[key]}>{key}</option>*/}
      {/*    })}*/}
      {/*</select>*/}
      {/*4.{value4}*/}
      {/*<div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>*/}

      {/*    <QRCode*/}
      {/*        size={500}*/}
      {/*        style={{height: "auto", maxWidth: "100%", width: "100%"}}*/}
      {/*        value={value4}*/}
      {/*        viewBox={`0 0 500 500`}*/}
      {/*    />*/}
      {/*</div>*/}
      {/*<select onChange={e => setValue4(e.target.value)} value={value4} >*/}
      {/*    {Object.keys(currencies4).map(key => {*/}
      {/*        // @ts-ignore*/}
      {/*        return <option value={currencies4[key]}>{key}</option>*/}
      {/*    })}*/}
      {/*</select>*/}
    </div>
  );
}

export default App;
