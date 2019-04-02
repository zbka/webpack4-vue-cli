import axios from 'axios'
export function JH_news(successfunc){axios.get('/api/auth/funcTreeAction.do?actionType=doShowDnsFuncTree').then(successfunc)}