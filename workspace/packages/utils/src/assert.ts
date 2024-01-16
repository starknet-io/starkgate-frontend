export const assert = {
  defined: <T>(value: T | undefined, name: string | Error): asserts value is T => {
    if (value === undefined) {
      throw name instanceof Error ? name : new Error(`'${name}' is undefined`);
    }
  },
  array: {
    notEmpty: (array: any[], name: string | Error): void => {
      if (!array || !array.length) {
        throw name instanceof Error
          ? name
          : new Error(`Array '${name}' is ${!array ? array : 'empty'}`);
      }
    }
  },
  map: {
    notEmpty: (map: Map<any, any>, name: string | Error): void => {
      if (!map || !map.size) {
        throw name instanceof Error ? name : new Error(`Map '${name}' is ${!map ? map : 'empty'}`);
      }
    }
  },
  promise: {
    resolves: async <T>(
      promise: Promise<T>,
      message: string | Error = 'promise threw an error',
      captureStack = true
    ) => {
      const createError = (): Error => {
        const error = message instanceof Error ? message : new Error(message);
        Error.captureStackTrace(error, assert.promise.resolves);
        return error;
      };
      const withStack = captureStack ? createError() : undefined;
      try {
        return await promise;
      } catch (error) {
        const wrap = withStack || createError();
        wrap.cause = error;
        throw wrap;
      }
    }
  },

  ok: (condition: unknown, message: string | Error): asserts condition => {
    if (!condition) {
      throw message instanceof Error ? message : new Error(message);
    }
  }
};
