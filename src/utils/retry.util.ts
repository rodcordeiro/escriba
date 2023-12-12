/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

export async function retry(
  promiseFactory: (...args: any) => Promise<any>,
  retryCount = 3,
): Promise<any> {
  try {
    return await promiseFactory();
  } catch (error) {
    console.debug(`[retring] ${retryCount}`);
    console.error(error);
    if (retryCount <= 0) {
      throw error;
    }
    return await retry(promiseFactory, retryCount - 1);
  }
}
