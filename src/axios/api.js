import axios from 'axios'
export function JH_news(successfunc){axios.post('/news/index').then(successfunc)}