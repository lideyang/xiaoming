/**
 * Created by lidy on 2019/3/14.
 */

const storage = {
  //存储
  set(key, value) {
    if(sessionStorage){
      sessionStorage.setItem(key, value);
    }
  },
  //取出数据
  get(key) {
    if(sessionStorage){
      return sessionStorage.getItem(key);
    }
    return ''
  },
  // 删除数据
  remove(key) {
    if(sessionStorage) {
      sessionStorage.removeItem(key);
    }
  }
}

export default storage;
