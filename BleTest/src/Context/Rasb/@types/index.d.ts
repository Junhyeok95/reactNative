interface IInfo {
  name: string;
}

interface IContext {
  info: IInfo | undefined;
  login: (email: string) => void;
  getInfo: () => void;
  logout: () => void;
  raspData?: string;
  setRaspDatas: (setData: string) => void;
  jcnt: number;
  setMyCnt: (setNumber: number) => void;
  // error
  getMyCnts: () => number;
}

// interface ICnt {
//   cnt: number;
//   setMyCnt: (setNumber: number) => void;
// }
