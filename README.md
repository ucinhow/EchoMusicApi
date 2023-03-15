# EchoMusicApi

## 介绍

通过 HTTP 抓包分析等方法解析部分音乐资源的 Api，提供整合的音乐查询服务的 Koa 服务。项目基于 Koa 完成服务开发，基于 Mocha 实现单测。支持 Docker 部署。

## 指令

```shell
// 开发
pnpm dev

// 运行
pnpm start

// Docker 部署
pnpm run:docker

// 测试数据获取请求
pnpm test-request

// 测试 API 服务
pnpm test-api
```

## API

### 全局类型

```ts
enum PlaySource {
  qq = "qq",
  joox = "joox",
  kw = "kw",
}

enum Source {
  qq = "qq",
  kw = "kw",
}

enum SearchType {
  songlist = 1,
  album = 2,
  song = 3,
}
```

### 搜索

```ts
// /search/type
interface Request {
    key: string;
    page: number; // default: 1
    size: number; // default: 20
    type: SearchType; // default: SearchType.song
}

interface SearchSongResponse {
  hasMore: boolean;
  data: Array<{
    name: string;
    singerName: Array<string>;
    albumName: string;
    duration: number; // seconds
  } & {[K in keyof typeof PlaySource]: {
    id: string;
    singerId: Array<string>;
    albumId: string;
    playable: boolean;
  }}>;
  type: SearchType;
}

interface SearchAlbumResponse {
  hasMore: boolean;
  data: Array<{
    name: string;
    publicTime: number;
    singerName: Array<string>;
  } & {[K in keyof typeof Source]: {
    id: string;
    picUrl: string;
    singerId: Array<string>;
  }}>;
  type: SearchType;
}

interface SearchSonglistResponse {
  id: string;
  name: string;
  picUrl: string;
  playCount: number;
  src: Source;
}
```

### 歌曲

```ts
// 歌曲详情 /song/detail
interface DetailRequest {
  id: string;
  src: PlaySource;
}
interface DetailResponse {
  id: string;
  name: string;
  picUrl: string;
  singer: Array<{ name: string; id: string }>;
  publicTime: number;
  duration: number;
  album: {
    name: string;
    id: string;
  };
}
// 歌曲播放链接 /song/url
interface UrlRequest {
  id: string;
  src: PlaySource;
}
interface UrlResponse {
  url: string;
}
// 歌曲歌词 /song/lyric
interface LyricRequest {
  id: string;
  src: PlaySource;
}
interface LyricResponse {
  lyricExist: boolean;
  lyric: [number, string][]; // [ms, 'lyric']
}
```

### Banner

```ts
// /banner
interface Response {
  banners: Array<{
    type: DataType;
    id: string;
    picUrl: string;
  }>
}
```

### 专辑

```ts
// 专辑详情 /album/detail
interface Request {
  id: string;
  src: Source;
}
interface Response {
  id: string;
  name: string;
  picUrl: string;
  publicTime: number;
  desc: string;
  singer: Array<{ id: string; name: string }>;
  songlist: Array<{
    name: string;
    publicTime: number;
    singerName: Array<string>;
  } & {
    [K in keyof typeof Source]: {
      id: string;
      picUrl: string;
      singerId: Array<string>;
    }
  }>;
}
```

### 歌单

```ts
// 歌单推荐 /songlist/recommend
interface Request {
  src: Source;
}
type Response = Array<{
  id: string;
  name: string;
  picUrl: string;
  playCount: number;
  src: Source;
}>

// 歌单分类 /songlist/menu
interface Request {
  src: Source;
}
interface Response {
  group: Array<{
  id: string;
  name: string;
  item: Array<{ name: string; id: string }>;
  }>;
}

// 歌单列表 /songlist/list
interface Request {
  id: number;
  page: number; // default: 1
  size: number; // default: 20
  src: Source;
}
interface Response {
  list: Array<{
    id: string;
    name: string;
    picUrl: string;
    playCount: number;
    src: Source;
  }>;
  total: number;
}

// 歌单详情 /songlist/detail
interface Request {
  id: number;
  page: number; // default: 1
  size: number; // default: 20
  src: Source;
}
interface Response {
  id: string;
  name: string;
  picUrl: string;
  playCount?: number;
  desc: string;
  total: number;
  songlist: Array<{
    name: string;
    singerName: Array<string>;
    albumName: string;
    duration: number; // seconds
  } & {[K in keyof typeof PlaySource]: {
    id: string;
    singerId: Array<string>;
    albumId: string;
    playable: boolean;
  }}>;
  createTime?: number;
}
```

### 排行榜

```ts
// 排行榜列表
interface Request {
  src: Source;
}
interface Response {
  groups: Array<{
    name: string;
    toplist: Array<{
      id: number; // 排行榜id
      name: string; // 排行榜标题
      intro: string; // 简介
      updateTime: number; // 排行榜更新时间
      picUrl: string;
    }>;
  }>;
}

// 排行榜详情
interface Request {
  id: number;
  page: number; // default: 1
  size: number; // default: 20
  src: Source;
}
interface Response {
  id: number;
  name: string;
  intro: string;
  updateTime: number;
  total: number;
  songlist: Array<{
    name: string;
    singerName: Array<string>;
    albumName: string;
    duration: number; // seconds
  } & {[K in keyof typeof PlaySource]: {
    id: string;
    singerId: Array<string>;
    albumId: string;
    playable: boolean;
  }}>;
  picUrl: string;
}
```

## 缓存

支持 Redis 缓存和 Js Map 缓存，相关配置在 config.json 文件中。

## 音源支持

### 播放音源
- QQ
- Kuwo
- Joox

### 资讯音源
- QQ
- Kuwo

### 计划支持
- Netease
- Kugou