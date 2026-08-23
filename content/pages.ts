import { publicSources, verificationNotice } from './company';

export type PageSection =
  | { type: 'lead'; text: string }
  | {
      type: 'facts';
      title: string;
      intro?: string;
      items: Array<{ label: string; value: string }>;
    }
  | {
      type: 'steps';
      title: string;
      intro?: string;
      items: Array<{ title: string; body: string }>;
    }
  | { type: 'checklist'; title: string; intro?: string; items: string[] }
  | {
      type: 'links';
      title: string;
      intro?: string;
      items: Array<{ title: string; body: string; href: string; tag?: string }>;
    }
  | {
      type: 'faq';
      title: string;
      items: Array<{ question: string; answer: string }>;
    }
  | {
      type: 'notice';
      title: string;
      body: string;
      tone: 'info' | 'warning';
    }
  | {
      type: 'source';
      title: string;
      href: string;
      publisher: string;
    };

export type PageDefinition = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  sections: PageSection[];
  ctaLabel: string;
  ctaHref: string;
};

const commonAssessmentCta = {
  ctaLabel: '整理库存资料',
  ctaHref: '/assessment',
};

const assessmentChecklist = [
  '产品名称、品类与品牌公开状态',
  '数量、规格、批次与包装完整情况',
  '生产日期、保质期与预计到期日',
  '当前仓库城市和标签要求的储存温度',
  '希望完成处理的时间与渠道限制',
];

const standardSteps = [
  {
    title: '提交批次资料',
    body: '先提供产品、数量、效期、包装、温区和库存城市等基础资料，减少无效往返。',
  },
  {
    title: '进行适配判断',
    body: '根据品类、剩余效期、运输条件与渠道限制判断是否进入进一步核验。',
  },
  {
    title: '验货与书面确认',
    body: '交易条件、货物状态、责任边界和流向限制应在验货后通过书面文件确认。',
  },
  {
    title: '提货与留档',
    body: '按照最终约定安排提货、温控或普通运输，并保留批次、交接与结算资料。',
  },
];

function servicePage(input: {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  categories: Array<{ label: string; value: string }>;
  boundary: string;
  faq: Array<{ question: string; answer: string }>;
}): PageDefinition {
  return {
    ...input,
    sections: [
      { type: 'lead', text: input.summary },
      {
        type: 'facts',
        title: '初步判断范围',
        intro: '以下内容用于准备资料，不代表对任何具体批次作出收购承诺。',
        items: input.categories,
      },
      {
        type: 'checklist',
        title: '首次沟通请准备',
        items: assessmentChecklist,
      },
      {
        type: 'steps',
        title: '从资料到交接',
        items: standardSteps,
      },
      {
        type: 'notice',
        title: '承接边界',
        body: input.boundary,
        tone: 'warning',
      },
      { type: 'faq', title: '采购方常见问题', items: input.faq },
    ],
    ...commonAssessmentCta,
  };
}

export const pages: PageDefinition[] = [
  {
    path: '/',
    eyebrow: '食品库存处置 · 公开预览版',
    title: '让每一批库存，先被准确判断',
    description:
      '北京隆昌行官网预览版，面向食品品牌商、进口商和经销商梳理临期食品、冷冻食品与库存尾货处置所需资料、流程及合规边界。',
    summary:
      '北京隆昌行面向食品品牌商、进口商和经销商的库存处置需求，提供批次资料评估与合作对接。当前预览版只展示公开可核验信息，具体资质、仓储与交易条件以书面确认为准。',
    sections: [
      {
        type: 'links',
        title: '按库存类型进入',
        intro: '选择最接近当前库存的类别，先看资料要求和承接边界。',
        items: [
          {
            title: '临期食品',
            body: '预包装食品、剩余效期与批次资料的基础判断。',
            href: '/services/near-expiry-food',
            tag: '常温',
          },
          {
            title: '冷冻食品与海鲜',
            body: '温区、冷链记录、包装和仓库交接的重点核验。',
            href: '/services/frozen-food',
            tag: '冷链',
          },
          {
            title: '饮料与乳品',
            body: '效期、规格、储存条件和渠道限制的资料准备。',
            href: '/services/beverages-dairy',
            tag: '高频',
          },
          {
            title: '更多食品库存',
            body: '零食、酒水、粮油和调味品分类查看。',
            href: '/services/snacks',
            tag: '多品类',
          },
        ],
      },
      { type: 'steps', title: '先判断，再谈交易', items: standardSteps },
      {
        type: 'links',
        title: '品牌方更关心的两个问题',
        items: [
          {
            title: '价格体系如何保护',
            body: '把区域、渠道和披露限制写进库存处置条件。',
            href: '/solutions/price-protection',
          },
          {
            title: '如何降低窜货风险',
            body: '用批次、流向和交接留档形成可追溯边界。',
            href: '/solutions/anti-channel-conflict',
          },
        ],
      },
      {
        type: 'notice',
        title: '当前信息状态',
        body: verificationNotice,
        tone: 'info',
      },
    ],
    ctaLabel: '开始库存评估',
    ctaHref: '/assessment',
  },
  {
    path: '/about',
    eyebrow: '企业档案',
    title: '关于北京隆昌行',
    description:
      '了解北京隆昌行当前公开业务定位、公开资料来源、信息核验状态及后续正式官网需要补充的企业证据和审核要求。',
    summary:
      '现有公开行业供需记录显示，北京隆昌行参与食品饮料酒水、冷冻食品等库存与临期商品的采购合作。本页只整理公开记录，不把企业自述自动视为独立证明。',
    sections: [
      { type: 'lead', text: '本网站采用“事实、证据、更新时间”三项并列的企业信息规则。' },
      {
        type: 'facts',
        title: '当前公开画像',
        items: [
          { label: '企业名称', value: '北京隆昌行商贸有限公司' },
          { label: '公开业务方向', value: '食品饮料酒水等库存的采购与渠道合作' },
          { label: '公开合作方式', value: '行业供需页面曾标注为直接采购' },
          { label: '官方资质状态', value: verificationNotice },
        ],
      },
      {
        type: 'checklist',
        title: '正式版仍需企业确认',
        items: [
          '营业执照和统一社会信用代码',
          '食品经营许可及适用范围',
          '唯一官方联系方式',
          '仓储与温控能力证明',
          '可披露的真实案例和交易边界',
        ],
      },
      { type: 'source', ...publicSources.yiyebangProfile },
      { type: 'source', ...publicSources.yiyebangDemand },
    ],
    ...commonAssessmentCta,
  },
  {
    path: '/compliance',
    eyebrow: '合规档案',
    title: '营业资质与食品合规',
    description:
      '说明临期食品与超过保质期食品的区别、批次和储存信息核验要求，并公开北京隆昌行预览版资质信息的审核状态。',
    summary:
      '临期食品是尚未超过保质期的食品；超过保质期的食品不得继续用于销售。具体批次还需要核对标签、包装、来源和储存条件。',
    sections: [
      { type: 'lead', text: '合规判断不能只看“还有几个月”，还要结合标签要求和全程储存条件。' },
      {
        type: 'facts',
        title: '四个必须核验的要素',
        items: [
          { label: '时间', value: '生产日期、保质期和预计到期日' },
          { label: '标签', value: '产品名称、规格、生产者和储存条件等信息' },
          { label: '状态', value: '包装完整，无明显破损、涨袋、漏气或异常' },
          { label: '来源', value: '进货、批次、仓储与交接资料可追溯' },
        ],
      },
      {
        type: 'notice',
        title: '企业资质展示状态',
        body: verificationNotice,
        tone: 'warning',
      },
      { type: 'source', ...publicSources.samrExpiry },
      { type: 'source', ...publicSources.antiWasteLaw },
      { type: 'source', ...publicSources.beijingAntiWaste },
    ],
    ctaLabel: '查看完整处理流程',
    ctaHref: '/process',
  },
  {
    path: '/warehousing',
    eyebrow: '仓储核验',
    title: '北京及上海仓储能力',
    description:
      '整理北京隆昌行公开页面中关于北京、上海仓储的相关表述，并说明正式合作前应核验的仓库、温区、装卸和运输证据。',
    summary:
      '公开行业页面曾提及北京和上海库房；本预览站尚未取得仓库地址、面积、租赁关系或温控记录，因此不把该表述作为已完成的官方核验。',
    sections: [
      { type: 'lead', text: '仓储能力应以现场、合同、温控和交接资料共同确认。' },
      {
        type: 'checklist',
        title: '仓库核验清单',
        items: [
          '仓库主体与企业关系',
          '仓库具体地址和可用面积',
          '常温、冷藏或冷冻温区',
          '温度记录和异常处置机制',
          '车辆、装卸、入库与出库条件',
          '批次隔离、盘点和交接留档方式',
        ],
      },
      {
        type: 'notice',
        title: '公开状态',
        body: verificationNotice,
        tone: 'warning',
      },
      { type: 'source', ...publicSources.yiyebangProfile },
    ],
    ...commonAssessmentCta,
  },
  servicePage({
    path: '/services/near-expiry-food',
    eyebrow: '服务品类 01',
    title: '临期食品库存收购评估',
    description:
      '面向食品品牌商、进口商和经销商说明临期食品库存评估所需的效期、数量、包装、储存和渠道限制资料及处理步骤。',
    summary:
      '临期食品仍在保质期内，但不同品类、包装和储存条件会影响判断。请先提供完整批次和效期资料，再进入具体合作核验。',
    categories: [
      { label: '公开记录涉及', value: '食品、饮料、酒水、粮油、零食等多类库存需求' },
      { label: '关键时间信息', value: '生产日期、保质期、到期日和希望处理时间' },
      { label: '关键状态信息', value: '包装、标签、批次、来源和实际储存情况' },
      { label: '当前承接结论', value: '需按具体批次书面确认' },
    ],
    boundary:
      '已经超过保质期、来源不明、标签关键信息缺失、包装或产品状态异常的货物，不进入正常销售型库存处置判断。',
    faq: [
      {
        question: '还有多久到期才能评估？',
        answer: '没有适用于所有品类的统一月数，应结合品类、数量、仓库城市、物流周期和渠道限制判断。',
      },
      {
        question: '只发产品名称可以报价吗？',
        answer: '不能形成可靠判断，至少还需要数量、规格、生产日期、保质期、包装和库存城市。',
      },
    ],
  }),
  servicePage({
    path: '/services/frozen-food',
    eyebrow: '服务品类 02',
    title: '冷冻食品与海鲜库存评估',
    description:
      '针对冷冻食品、冷冻海鲜及其他低温库存，说明温区记录、包装状态、批次数量、仓库装卸和冷链运输的核验重点。',
    summary:
      '冷冻食品和海鲜库存除效期外，还必须核验标签要求的温度、实际温控记录、包装状态、装卸条件和运输衔接。',
    categories: [
      { label: '公开记录涉及', value: '冷冻海鲜、冷冻食品等库存需求' },
      { label: '温区资料', value: '标签储存温度、仓库温度和运输要求' },
      { label: '交接资料', value: '托盘、箱规、车辆和装卸条件' },
      { label: '当前承接结论', value: '需完成冷链与批次核验' },
    ],
    boundary:
      '无法证明连续储存条件、发生明显解冻复冻、包装破损渗漏或产品状态异常的批次，不应按普通可流通冷冻库存处理。',
    faq: [
      {
        question: '只有仓库温度截图够吗？',
        answer: '单张截图不足以证明完整储存过程，还应结合标签要求、批次记录、交接和运输信息。',
      },
      {
        question: '可以先报一个总吨数吗？',
        answer: '可以作为线索，但可靠评估仍需拆分到品类、规格、批次、效期和仓库位置。',
      },
    ],
  }),
  servicePage({
    path: '/services/beverages-dairy',
    eyebrow: '服务品类 03',
    title: '饮料乳品库存收购评估',
    description:
      '说明饮料、牛奶和其他乳品库存处置需要准备的规格、批次、保质期、包装、储存、数量和区域销售限制等资料。',
    summary:
      '饮料与乳品规格多、批次差异大，应按SKU和批次拆分数量、效期、包装与储存条件，避免只报总箱数。',
    categories: [
      { label: '公开记录涉及', value: '牛奶、饮料、咖啡等库存需求' },
      { label: '规格资料', value: '单瓶容量、每箱数量、箱数与整托情况' },
      { label: '效期资料', value: '按SKU拆分生产日期、保质期和到期日' },
      { label: '渠道资料', value: '授权区域、禁售渠道和价格保护要求' },
    ],
    boundary:
      '包装渗漏、胀包、标签异常、储存条件不符合要求或无法区分批次的货物，需要先完成风险核验。',
    faq: [
      {
        question: '不同日期的货可以合并统计吗？',
        answer: '初次沟通可以给总量，但正式评估必须按生产日期或到期日拆分批次。',
      },
      {
        question: '品牌方可以限制销售区域吗？',
        answer: '可以提出区域和渠道限制，是否可执行以及执行方式需要在交易前书面确认。',
      },
    ],
  }),
  servicePage({
    path: '/services/snacks',
    eyebrow: '服务品类 04',
    title: '零食饼干糖果库存评估',
    description:
      '面向零食、饼干、巧克力、糖果、肉干和干果等库存，说明按SKU整理效期、包装、箱规、数量和渠道限制的方法。',
    summary:
      '休闲食品SKU多、规格多，评估时应把混批货拆成可核对的产品清单，并标明外箱、内包装和标签状态。',
    categories: [
      { label: '公开记录涉及', value: '饼干、巧克力、糖果、肉干、干果等库存需求' },
      { label: '清单颗粒度', value: '品名、口味、规格、箱规、批次和数量' },
      { label: '包装资料', value: '外箱、内包装、标签和条码状态' },
      { label: '渠道资料', value: '线上、线下、区域和价格限制' },
    ],
    boundary:
      '散装来源不清、标签不完整、包装污染或存在明显感官异常的产品，不适合按普通预包装食品库存评估。',
    faq: [
      {
        question: '混合多个SKU可以评估吗？',
        answer: '可以，但需要提供逐SKU清单；无法拆分数量和效期会降低判断效率。',
      },
      {
        question: '外箱旧但内包装完整怎么办？',
        answer: '需要分别提供外箱和内包装照片，再结合标签、运输和交接要求判断。',
      },
    ],
  }),
  servicePage({
    path: '/services/alcohol',
    eyebrow: '服务品类 05',
    title: '酒水库存收购评估',
    description:
      '针对啤酒、红酒及其他酒水库存，说明品牌授权、产品标签、批次、包装、数量、仓库和区域渠道限制等评估资料。',
    summary:
      '酒水库存评估不仅看数量和价格，还应确认产品类别、标签、来源、授权关系、包装完整度和可销售区域。',
    categories: [
      { label: '公开记录涉及', value: '啤酒、红酒等库存需求' },
      { label: '来源资料', value: '供货主体、采购记录、授权与批次信息' },
      { label: '包装资料', value: '瓶体、瓶盖、酒标、外箱和礼盒状态' },
      { label: '渠道资料', value: '区域、渠道、价格和品牌披露限制' },
    ],
    boundary:
      '来源、授权或标签存在重大疑问，包装有明显异常，或交易主体无法提供必要证明时，不进入常规库存合作判断。',
    faq: [
      {
        question: '酒水都按临期食品判断吗？',
        answer: '不同酒水适用标签、保质期和经营要求不同，应按具体产品标签和类别核验。',
      },
      {
        question: '礼盒破损是否还能评估？',
        answer: '可以提供照片和破损比例，但是否适合流通要结合内包装、标签及客户渠道要求判断。',
      },
    ],
  }),
  servicePage({
    path: '/services/grain-oil-condiments',
    eyebrow: '服务品类 06',
    title: '粮油调味品库存评估',
    description:
      '说明粮食、食用油、调味品等库存处置需要准备的规格、批次、效期、包装、储存条件、数量和产品状态资料。',
    summary:
      '粮油调味品重量、包装和储存要求差异明显，应逐类说明产品形态、箱规、批次、效期和仓库装卸条件。',
    categories: [
      { label: '公开记录涉及', value: '粮油、调味品等库存需求' },
      { label: '形态资料', value: '袋装、瓶装、桶装或其他包装形式' },
      { label: '状态资料', value: '渗漏、结块、受潮、沉淀和包装完整情况' },
      { label: '物流资料', value: '单件重量、托盘、楼层和车辆条件' },
    ],
    boundary:
      '出现渗漏、污染、虫害、受潮或其他可能影响食品安全与品质的异常时，应先停止普通流通判断并进行专业核验。',
    faq: [
      {
        question: '食用油有少量沉淀可以评估吗？',
        answer: '需要结合产品标准、标签说明、批次和实际状态判断，不能仅凭文字描述得出结论。',
      },
      {
        question: '大重量库存需要哪些物流信息？',
        answer: '应提供单件重量、总重量、托盘情况、装卸条件、楼层和车辆进出限制。',
      },
    ],
  }),
  {
    path: '/solutions/price-protection',
    eyebrow: '解决方案 01',
    title: '品牌价格体系保护方案',
    description:
      '为食品品牌商梳理库存处置中的区域、渠道、价格披露、包装标识和流向留档要求，降低清仓对原有价盘的干扰。',
    summary:
      '库存处置不应只比较一次报价。品牌方应先明确哪些地区、渠道、价格表达和包装形态不能使用，再判断方案是否可执行。',
    sections: [
      { type: 'lead', text: '把限制条件写清楚，比事后口头追责更有效。' },
      {
        type: 'facts',
        title: '建议写入合作条件',
        items: [
          { label: '区域', value: '允许和禁止进入的省市或市场' },
          { label: '渠道', value: '线上、线下、团购、门店或特定平台限制' },
          { label: '价格表达', value: '是否允许公开展示原价、折扣和品牌名称' },
          { label: '包装处理', value: '原包装、组合装、外箱与标识要求' },
          { label: '留档', value: '批次、数量、交接和流向证明要求' },
        ],
      },
      {
        type: 'steps',
        title: '形成可执行边界',
        items: [
          { title: '列出禁区', body: '先确认不能进入的区域、渠道和客户类型。' },
          { title: '拆分批次', body: '把限制条件对应到具体SKU、批次和数量。' },
          { title: '书面约定', body: '将流向、披露、包装和违约处理形成书面条款。' },
          { title: '交接留档', body: '保留出库、运输、签收和后续可验证材料。' },
        ],
      },
      {
        type: 'notice',
        title: '能力状态',
        body: '隆昌行的具体分区域消化能力和可执行渠道仍需按当前资料完成企业核验。',
        tone: 'warning',
      },
    ],
    ...commonAssessmentCta,
  },
  {
    path: '/solutions/anti-channel-conflict',
    eyebrow: '解决方案 02',
    title: '防窜货与分区域消化说明',
    description:
      '说明食品库存分区域处置时如何通过SKU批次、授权边界、交接记录和流向证明降低窜货与渠道冲突风险。',
    summary:
      '防窜货不是一句“不会影响渠道”，而是把货物、区域、渠道、接收方和交接记录连接成可以复核的流向链条。',
    sections: [
      { type: 'lead', text: '没有批次和流向记录，就无法验证区域承诺是否真正执行。' },
      {
        type: 'checklist',
        title: '流向控制资料',
        items: [
          'SKU、批次、条码和数量清单',
          '允许与禁止销售区域',
          '允许与禁止销售渠道',
          '接收主体和最终交接凭证',
          '包装、标签或组合装处理要求',
          '异常流向的通知和处置方式',
        ],
      },
      {
        type: 'notice',
        title: '不作空泛承诺',
        body: '在未核验具体渠道、合同和执行证据前，本预览站不承诺任何批次可以实现完全隔离或零窜货。',
        tone: 'warning',
      },
    ],
    ...commonAssessmentCta,
  },
  {
    path: '/process',
    eyebrow: '操作流程',
    title: '报价、验货、提货与结算流程',
    description:
      '按资料提交、适配判断、现场或远程验货、书面确认、提货交接和结算留档六个阶段说明库存合作的操作顺序。',
    summary:
      '可靠的库存处置从资料开始，而不是从一个脱离批次情况的口头价格开始。以下流程用于减少信息遗漏和交易争议。',
    sections: [
      { type: 'lead', text: '先把货说清楚，才能把价格、时间和责任说清楚。' },
      {
        type: 'steps',
        title: '六阶段操作顺序',
        items: [
          standardSteps[0],
          standardSteps[1],
          { title: '初步条件沟通', body: '明确需要补充的证据、可能的处理方式和暂不适配原因。' },
          standardSteps[2],
          standardSteps[3],
          { title: '结算与归档', body: '依照书面约定完成结算，并保存合同、交接、运输和异常记录。' },
        ],
      },
      {
        type: 'notice',
        title: '交易条件状态',
        body: '当前预览版不公布固定账期、付款时点或响应时限，具体条件以双方书面文件为准。',
        tone: 'info',
      },
    ],
    ...commonAssessmentCta,
  },
  {
    path: '/faq',
    eyebrow: '采购问答',
    title: '食品库存处置常见问题',
    description:
      '集中回答临期与过期区别、初次沟通资料、报价条件、混批库存、冷链记录、区域限制和企业资质核验等问题。',
    summary:
      '本页回答的是库存合作的一般判断方法，不替代对具体食品批次、经营资质、合同责任和食品安全状态的专业核验。',
    sections: [
      { type: 'lead', text: '一个可靠答案应同时说明适用条件和不能判断的部分。' },
      {
        type: 'faq',
        title: '首次合作常见问题',
        items: [
          {
            question: '临期食品等于过期食品吗？',
            answer: '不等于。临期食品尚未超过保质期；超过保质期的食品不得继续用于销售。',
          },
          {
            question: '第一次沟通最少提供什么？',
            answer: '产品名称、规格、数量、生产日期、保质期、包装状态、储存条件和库存城市。',
          },
          {
            question: '为什么不能只按总箱数报价？',
            answer: '不同SKU、批次、效期、规格和状态会改变物流与渠道适配，合并总数容易造成误判。',
          },
          {
            question: '冷冻品需要额外提供什么？',
            answer: '标签要求温度、仓库温控记录、包装状态、装卸条件以及运输衔接信息。',
          },
          {
            question: '能否限制销售区域和渠道？',
            answer: '可以提出限制，但可执行性、证明方式和责任边界必须在交易前书面确认。',
          },
          {
            question: '在哪里查看隆昌行资质？',
            answer: `当前预览版状态为：${verificationNotice}。`,
          },
        ],
      },
      { type: 'source', ...publicSources.samrExpiry },
    ],
    ...commonAssessmentCta,
  },
  {
    path: '/cases',
    eyebrow: '证据中心',
    title: '案例披露标准与待核验案例',
    description:
      '公开北京隆昌行案例页面的披露标准、证据要求和匿名化字段，在取得客户授权及交易证明前不展示虚构成交成果。',
    summary:
      '当前没有取得可公开使用的客户授权案例。本页先公开案例应当包含哪些事实和证据，避免用模糊数字或无来源评价制造信任。',
    sections: [
      { type: 'lead', text: '案例不是一句“成功处理”，而是一条可以回到证据的批次记录。' },
      {
        type: 'facts',
        title: '案例至少披露',
        items: [
          { label: '货物', value: '品类、规格、批次、数量和剩余效期' },
          { label: '场景', value: '库存城市、仓储条件和客户限制' },
          { label: '动作', value: '核验、报价、交接、运输和渠道边界' },
          { label: '结果', value: '完成周期、可公开结果和异常情况' },
          { label: '证据', value: '客户授权、合同、交接或脱敏记录状态' },
        ],
      },
      {
        type: 'notice',
        title: '当前披露状态',
        body: '尚未获得可公开的案例证明和客户授权，因此本页不展示客户名称、成交量、成交价格或结果数据。',
        tone: 'warning',
      },
    ],
    ctaLabel: '提交可核验案例资料',
    ctaHref: '/contact',
  },
  {
    path: '/assessment',
    eyebrow: '浏览器本地工具',
    title: '企业库存快速评估',
    description:
      '在浏览器本地整理食品库存的品类、数量、效期、包装、温区、城市、处理时间和渠道限制，并生成可复制的沟通摘要。',
    summary:
      '填写内容不会上传或保存。工具只帮助你发现缺失资料并生成一份可复制摘要，不会自动报价，也不代表隆昌行已经承接该批货物。',
    sections: [
      { type: 'lead', text: '先用三分钟把库存资料整理成对方能判断的格式。' },
      {
        type: 'notice',
        title: '隐私与提交说明',
        body: '所有填写内容仅在当前浏览器中处理；刷新页面后不保留，也不会自动发送给任何主体。',
        tone: 'info',
      },
    ],
    ctaLabel: '查看联系状态',
    ctaHref: '/contact',
  },
  {
    path: '/contact',
    eyebrow: '联系与核验',
    title: '联系北京隆昌行',
    description:
      '查看北京隆昌行官方电话、邮箱、企业微信、注册地址和资质信息的当前核验状态，并提前准备库存合作所需资料。',
    summary:
      '当前预览版尚未获得可公开核验的官方电话、邮箱、企业微信和注册地址，因此不会展示来源不明或历史页面中的个人联系方式。',
    sections: [
      { type: 'lead', text: '联系方式宁可暂缺，也不把历史个人号码误标成当前企业官方渠道。' },
      {
        type: 'facts',
        title: '官方渠道状态',
        items: [
          { label: '官方电话', value: verificationNotice },
          { label: '官方邮箱', value: verificationNotice },
          { label: '企业微信', value: verificationNotice },
          { label: '注册地址', value: verificationNotice },
          { label: '营业资质', value: verificationNotice },
        ],
      },
      {
        type: 'checklist',
        title: '联系前请准备',
        items: assessmentChecklist,
      },
      { type: 'source', ...publicSources.yiyebangProfile },
    ],
    ctaLabel: '生成库存评估摘要',
    ctaHref: '/assessment',
  },
];

export const allPublicPaths = pages.map((page) => page.path);

export const navigationGroups = [
  {
    label: '服务品类',
    items: pages.filter((page) => page.path.startsWith('/services/')),
  },
  {
    label: '解决方案',
    items: pages.filter((page) => page.path.startsWith('/solutions/')),
  },
  {
    label: '流程与合规',
    items: pages.filter((page) => ['/process', '/compliance', '/warehousing', '/faq'].includes(page.path)),
  },
] as const;
