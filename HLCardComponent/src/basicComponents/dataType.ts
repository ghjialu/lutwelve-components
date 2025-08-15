export interface rankingListType {
  indexName: string;
  indexCode: string;
  unitName: string;
  value: number;
  total?: number;
}
export interface summaryListType {
  value: null | number;
  preVal: null | number;
  indexName: string;
  indexPreName: string;
  ratioName: string;
  ratioVal: null | number;
  indexCode: null | number | string;
  unitName: string;
}
export interface drugSummaryListType {
  value: null | number | string;
  preVal: null | number | string;
  indexName: string;
  indexPreName: string;
  ratioName: string;
  ratioVal: null | number | string;
  indexCode?: null | number | string;
  unitName: string;
}
