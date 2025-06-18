export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function isCompleteName(name) {
  const parts = name.trim().split(' ').filter(p => p.length > 0);
  return parts.length >= 2;
}

export function isEmail (email){
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
     return emailPattern.test(email)
}
export function isPassword(password){
    return password.length >=8 ?true:false
}