import fetch from '@/utils/fetch'

export function getList(params) {
  return fetch({
    url: '/show/get_show_list',
    method: 'get',
    params
  })
}
