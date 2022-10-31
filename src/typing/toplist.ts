export interface Toplist {
  topId: number // 排行榜id
  topType: 0
  updateType: 1
  title: string // 排行榜标题
  titleDetail: string // 标题详情
  // titleShare: string;
  intro: string // 简介
  // cornerMark: number;
  // period: string; // 排行榜更新时间 应该是与 updateTime 一致
  updateTime: string // 排行榜更新时间
  listenNum: string // 收听数
  totalNum: string // 歌曲总数
  song: Array<{
    rank: number // 排名
    rankType: number // 排名type?
    rankValue: string // 排名趋势值
    songId: number // 歌曲id
    title: string // 歌曲名
    singerName: string // 歌手名
    songType: number // 歌曲type
    cover: string // 歌曲图片
  }>
  headPicUrl: string
  frontPicUrl: string
  mbFrontPicUrl: string
  mbHeadPicUrl: string
  h5JumpUrl: string
  updateTips: string // 更新频率
  // bannerText: string;
  AdShareContent: string
  mbFrontLogoUrl: string
  mbHeadLogoUrl: string
  topAlbumURL: string
}

export interface ToplistGroup {
  groupId: number
  groupName: string
  type: number
  toplist: Toplist[]
}
