interface IInfo {
  name: string;
}

interface IContext {
  info: IInfo | undefined;
  login: (email: string) => void;
  getInfo: () => void;
  logout: () => void;
}
