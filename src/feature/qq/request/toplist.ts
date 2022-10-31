import { ToplistGroup } from '@/typing'
import { serializeToplistGroup } from '../serializers/toplist'
import { QueryToplistInfoResponse } from '../typing'
import request from './request'
export const queryToplistInfo = async (): Promise<ToplistGroup[]> => await request
  .get<{}, QueryToplistInfoResponse>('/cgi-bin/musics.fcg')
  .then((res) => res.req_0.data.group.map(serializeToplistGroup))
