export class Utils {
  static gerateUUID() {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    return pattern.replace(/[xy]/g, (c) => {
      const randomValue = (Math.random() * 16) | 0;
      const value = c === 'x' ? randomValue : (randomValue & 0x3) | 0x8;

      return value.toString(16);
    });
  }
}
