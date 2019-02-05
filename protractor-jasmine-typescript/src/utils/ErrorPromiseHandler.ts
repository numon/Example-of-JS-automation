import { promise } from 'selenium-webdriver';

export default function errorPromiseHandler<T>(promiseIn: promise.Promise<any>): promise.Promise<any[] | T[]> {
  return promiseIn.then(data => {
    return [null, data];
  })
  .catch(err => [err]);
}
