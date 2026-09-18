/**
 * 兼容层 — 案例数据已统一到 works.ts，此处再导出旧 import 名
 */
export {
  works as cases,
  works as featuredCases,
  works,
  WORK_IDS,
  getWork,
} from './works'

/** 早期案例已移出主路径，保持空数组兼容旧测试/引用 */
export const archiveCases: never[] = []
