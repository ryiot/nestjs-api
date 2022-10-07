export class Result {
  static success(data: any) {
    return {
      code: 0,
      success: true,
      data: data,
    };
  }
  static successMsg(data: any, message: string) {
    return {
      code: 0,
      success: true,
      data: data,
      message: message,
    };
  }
  static fail(data: any) {
    return {
      code: -1,
      success: false,
      data: data,
    };
  }
  static failMsg(data: any, message: string) {
    return {
      code: -1,
      success: false,
      data: data,
      message: message,
    };
  }
  static 401() {
    return {
      code: 401,
      success: false,
    };
  }
}
