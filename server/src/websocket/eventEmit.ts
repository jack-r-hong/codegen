import events from 'events';
const em = new events.EventEmitter();

export class OnCustomerService {
  #listener: (msg: keyof typeof OnCustomerService.enum) => void = () => {};
  static event = Symbol('customerServiceNotify');
  static enum = {
    userChatroom: '1',
    transactionChatroom: '2',
  };

  constructor() {
  }

  on(cb: (msg: keyof typeof OnCustomerService.enum) => void) {
    this.#listener = cb;
    em.on(OnCustomerService.event, this.#listener);
  }

  remove() {
    em.removeListener(OnCustomerService.event, this.#listener);
  }

  static emit(msg: keyof typeof OnCustomerService.enum) {
    em.emit(OnCustomerService.event, msg);
  }
}
