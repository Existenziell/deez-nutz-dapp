const convertTimestamp = (UNIX_timestamp) => {
  const a = new Date(UNIX_timestamp)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const year = a.getFullYear()
  const month = months[a.getMonth()]
  const date = a.getDate()
  const hour = a.getHours()
  const min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
  const sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds()
  const time = `${month} ${date}, ${year} at ${hour}:${min}:${sec}`
  return time
}

export default convertTimestamp
