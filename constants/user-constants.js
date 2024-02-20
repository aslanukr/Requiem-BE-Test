export const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,16}$/;

export const nameRegexp = /^(?=.{1,40}$)[а-яіїёА-ЯІЇЁ]+(?:[-' ][а-яіїёґА-ЯІЇЁҐ]+)*$/;

export const phoneRegexp = /^(\+|)[0-9]{10,15}$/;

export default {
  emailRegexp,
  passwordRegexp,
  nameRegexp,
  phoneRegexp,
};
