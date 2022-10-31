import {
  ToplistGroup as RawToplistGroup
  // Toplist as RawToplist
} from '../typing'
import {
  ToplistGroup
  // Toplist
} from '@/typing'
// export const serializeToplist = (toplist: RawToplist): Toplist => {}
export const serializeToplistGroup = (
  group: RawToplistGroup
): ToplistGroup => group
