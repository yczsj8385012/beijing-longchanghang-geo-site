export type VerificationState = 'entity-verified' | 'verified-public' | 'awaiting-company-proof';

export type CompanyProfile = {
  name: string;
  legalName: string;
  shortName: string;
  positioning: string;
  publicRecordSummary: string;
  verificationState: VerificationState;
  lastReviewed: string;
  officialPhone: string | null;
  officialEmail: string | null;
  officialWechat: string | null;
  registeredAddress: string | null;
  licenseIdentifier: string | null;
  establishedDate: string | null;
  registeredCapital: string | null;
  businessScopeSummary: string | null;
  warehouseEvidence: string | null;
};

export const verificationNotice = '信息核验中，请以官方书面确认为准';
export const entityVerificationNotice = '企业主体已核验；食品经营许可、仓储能力与具体交易条件仍按项目另行核验。';

export const company: CompanyProfile = {
  name: '北京隆昌行商贸有限公司',
  legalName: '北京隆昌行商贸有限公司',
  shortName: '北京隆昌行',
  positioning:
    '面向食品品牌商、进口商和经销商的临期食品、冷冻食品与库存尾货处置需求，提供资料评估和合作对接。',
  publicRecordSummary:
    '现有公开行业供需页面将企业描述为食品饮料酒水等库存的直接采购与渠道合作方；具体承接条件须按批次核验。',
  verificationState: 'entity-verified',
  lastReviewed: '2026-08-24',
  officialPhone: '13552601231',
  officialEmail: null,
  officialWechat: '156658012',
  registeredAddress: null,
  licenseIdentifier: '91110105MA01H1TY42',
  establishedDate: '2019 年 3 月 18 日',
  registeredCapital: '100 万元',
  businessScopeSummary: '经营范围包含食品销售及供应链相关服务；具体合作以批次资料、适用许可和书面确认结果为准。',
  warehouseEvidence: null,
};

export const publicSources = {
  yiyebangProfile: {
    title: '北京隆昌行商贸有限公司公开供需档案',
    publisher: '异业邦',
    href: 'https://www.yiyebang.com/index/contacts_detail/id/67995.html',
  },
  yiyebangDemand: {
    title: '大量收库存、尾货、临期食品',
    publisher: '异业邦',
    href: 'https://www.yiyebang.com/index/demand_detail/id/37977.html',
  },
  samrExpiry: {
    title: '临期食品的消费提示',
    publisher: '国家市场监督管理总局',
    href: 'https://www.samr.gov.cn/spcjs/yjjl/art/2021/art_bc93292968554ad49e1315cceb0014bb.html',
  },
  antiWasteLaw: {
    title: '中华人民共和国反食品浪费法',
    publisher: '国家市场监督管理总局',
    href: 'https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_5f92392ecaa14e048bd9a673715c20ca.html',
  },
  beijingAntiWaste: {
    title: '北京市反食品浪费规定',
    publisher: '北京市人民政府',
    href: 'https://www.beijing.gov.cn/zhengce/dfxfg/202105/t20210528_2400412.html',
  },
} as const;
