'use client';

import { useMemo, useState } from 'react';

type FormData = {
  category: string;
  quantity: string;
  productionDate: string;
  shelfLife: string;
  city: string;
  temperature: string;
  packaging: string;
  deadline: string;
  restrictions: string;
};

const initialForm: FormData = {
  category: '', quantity: '', productionDate: '', shelfLife: '', city: '',
  temperature: '', packaging: '', deadline: '', restrictions: '',
};

const fieldLabels: Record<keyof FormData, string> = {
  category: '库存品类', quantity: '库存数量', productionDate: '生产日期或批次',
  shelfLife: '保质期或预计到期日', city: '库存城市', temperature: '储存温区',
  packaging: '包装状态', deadline: '希望处理时间', restrictions: '区域与渠道限制',
};

export function AssessmentForm() {
  const [form, setForm] = useState(initialForm);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => {
    const entries = (Object.keys(form) as Array<keyof FormData>)
      .filter((key) => form[key].trim())
      .map((key) => `${fieldLabels[key]}：${form[key].trim()}`);
    return ['北京隆昌行库存沟通摘要', ...entries, '说明：本摘要不构成报价或承接承诺，具体批次需进一步核验并书面确认。'].join('\n');
  }, [form]);

  function update(key: keyof FormData, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setGenerated(false);
    setCopied(false);
  }

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  }

  return (
    <section className="assessment-tool" aria-labelledby="assessment-form-title">
      <div className="assessment-intro">
        <span className="section-kicker">LOCAL / PRIVATE</span>
        <h2 id="assessment-form-title">把零散库存信息整理成一张判断单</h2>
        <p>不需要填写公司名称或联系人。先整理货物本身，生成后再自行复制给合作方。</p>
      </div>
      <form onSubmit={(event) => { event.preventDefault(); setGenerated(true); setCopied(false); }}>
        <div className="form-grid">
          <label><span>01 · 库存品类</span><select aria-label="库存品类" value={form.category} onChange={(event) => update('category', event.target.value)} required><option value="">请选择</option><option>临期食品</option><option>冷冻食品与海鲜</option><option>饮料与乳品</option><option>零食饼干糖果</option><option>酒水</option><option>粮油调味品</option><option>其他食品库存</option></select></label>
          <label><span>02 · 库存数量</span><input aria-label="库存数量" value={form.quantity} onChange={(event) => update('quantity', event.target.value)} placeholder="例如：1200箱 / 8吨" required /></label>
          <label><span>03 · 生产日期或批次</span><input aria-label="生产日期或批次" value={form.productionDate} onChange={(event) => update('productionDate', event.target.value)} placeholder="多个批次请分别列明" /></label>
          <label><span>04 · 保质期或预计到期日</span><input aria-label="保质期或预计到期日" value={form.shelfLife} onChange={(event) => update('shelfLife', event.target.value)} placeholder="例如：12个月 / 2026-12" /></label>
          <label><span>05 · 库存城市</span><input aria-label="库存城市" value={form.city} onChange={(event) => update('city', event.target.value)} placeholder="例如：北京" required /></label>
          <label><span>06 · 储存温区</span><select aria-label="储存温区" value={form.temperature} onChange={(event) => update('temperature', event.target.value)}><option value="">请选择</option><option>常温</option><option>冷藏</option><option>冷冻</option><option>其他 / 待确认</option></select></label>
          <label><span>07 · 包装状态</span><input aria-label="包装状态" value={form.packaging} onChange={(event) => update('packaging', event.target.value)} placeholder="完整、破损比例、外箱情况" /></label>
          <label><span>08 · 希望处理时间</span><input aria-label="希望处理时间" value={form.deadline} onChange={(event) => update('deadline', event.target.value)} placeholder="例如：15天内" /></label>
          <label className="form-wide"><span>09 · 区域与渠道限制</span><textarea aria-label="区域与渠道限制" value={form.restrictions} onChange={(event) => update('restrictions', event.target.value)} placeholder="例如：不得进入原有经销区域，不公开展示品牌折扣" rows={4} /></label>
        </div>
        <div className="form-privacy"><span aria-hidden="true">◇</span><p><strong>本地处理：</strong>填写内容不会上传、保存或自动发送；关闭或刷新页面后即消失。</p></div>
        <button className="button button-primary" type="submit">生成评估摘要 <span aria-hidden="true">↗</span></button>
      </form>
      {generated && <section className="summary-sheet" aria-live="polite"><div className="summary-sheet-head"><div><span>OUTPUT / LOCAL</span><h2>库存沟通摘要</h2></div><button type="button" onClick={copySummary}>{copied ? '已复制' : '复制摘要'}</button></div><pre>{summary}</pre></section>}
    </section>
  );
}
