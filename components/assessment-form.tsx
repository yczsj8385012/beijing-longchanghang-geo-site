'use client';

import { useMemo, useRef, useState } from 'react';

type FieldName =
  | 'category'
  | 'quantity'
  | 'productionDate'
  | 'shelfLife'
  | 'city'
  | 'temperature'
  | 'packaging'
  | 'deadline'
  | 'restrictions';

type FormData = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const fieldNames: FieldName[] = [
  'category', 'quantity', 'productionDate', 'shelfLife', 'city',
  'temperature', 'packaging', 'deadline', 'restrictions',
];

const initialForm: FormData = {
  category: '', quantity: '', productionDate: '', shelfLife: '', city: '',
  temperature: '', packaging: '', deadline: '', restrictions: '',
};

const fieldLabels: Record<FieldName, string> = {
  category: '库存品类', quantity: '库存数量', productionDate: '生产日期或批次',
  shelfLife: '保质期或预计到期日', city: '库存城市', temperature: '储存温区',
  packaging: '包装状态', deadline: '希望处理时间', restrictions: '区域与渠道限制',
};

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.category.trim()) errors.category = '请选择库存品类';
  if (!form.quantity.trim()) errors.quantity = '请填写库存数量';
  if (!form.city.trim()) errors.city = '请填写库存城市';

  return errors;
}

export function AssessmentForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});

  const summary = useMemo(() => {
    const entries = fieldNames
      .filter((key) => form[key].trim())
      .map((key) => `${fieldLabels[key]}：${form[key].trim()}`);
    return ['北京隆昌行库存沟通摘要', ...entries, '说明：本摘要不构成报价或承接承诺，具体批次需进一步核验并书面确认。'].join('\n');
  }, [form]);

  function update(key: FieldName, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setGenerated(false);
    setCopied(false);
    setCopyMessage('');
  }

  function errorProps(key: FieldName) {
    return errors[key]
      ? { 'aria-describedby': `${key}-error`, 'aria-invalid': true }
      : {};
  }

  function errorMessage(key: FieldName) {
    return errors[key] && <span className="form-error" id={`${key}-error`} role="alert">{errors[key]}</span>;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    const firstInvalid = fieldNames.find((field) => nextErrors[field]);

    setErrors(nextErrors);
    setGenerated(false);
    setCopied(false);
    setCopyMessage('');

    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setGenerated(true);
  }

  async function copySummary() {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setCopyMessage('已复制');
    } catch {
      setCopied(false);
      setCopyMessage('复制失败，请手动选择摘要');
    }
  }

  return (
    <section className="assessment-tool" aria-labelledby="assessment-form-title">
      <div className="assessment-intro">
        <span className="section-kicker">LOCAL / PRIVATE</span>
        <h2 id="assessment-form-title">把零散库存信息整理成一张判断单</h2>
        <p>不需要填写公司名称或联系人。先整理货物本身，生成后再自行复制给合作方。</p>
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <fieldset className="form-group">
          <legend>货物信息</legend>
          <div className="form-grid">
            <label htmlFor="category"><span>01 · 库存品类</span><select id="category" aria-label="库存品类" name="category" autoComplete="off" value={form.category} onChange={(event) => update('category', event.target.value)} ref={(element) => { fieldRefs.current.category = element; }} {...errorProps('category')}><option value="">请选择</option><option>临期食品</option><option>冷冻食品与海鲜</option><option>饮料与乳品</option><option>零食饼干糖果</option><option>酒水</option><option>粮油调味品</option><option>其他食品库存</option></select>{errorMessage('category')}</label>
            <label htmlFor="quantity"><span>02 · 库存数量</span><input id="quantity" aria-label="库存数量" name="quantity" autoComplete="off" inputMode="text" value={form.quantity} onChange={(event) => update('quantity', event.target.value)} ref={(element) => { fieldRefs.current.quantity = element; }} placeholder="例如：1200箱 / 8吨" {...errorProps('quantity')} />{errorMessage('quantity')}</label>
            <label htmlFor="productionDate"><span>03 · 生产日期或批次</span><input id="productionDate" aria-label="生产日期或批次" name="productionDate" autoComplete="off" value={form.productionDate} onChange={(event) => update('productionDate', event.target.value)} ref={(element) => { fieldRefs.current.productionDate = element; }} placeholder="多个批次请分别列明" {...errorProps('productionDate')} />{errorMessage('productionDate')}</label>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <legend>效期与储存</legend>
          <div className="form-grid">
            <label htmlFor="shelfLife"><span>04 · 保质期或预计到期日</span><input id="shelfLife" aria-label="保质期或预计到期日" name="shelfLife" autoComplete="off" value={form.shelfLife} onChange={(event) => update('shelfLife', event.target.value)} ref={(element) => { fieldRefs.current.shelfLife = element; }} placeholder="例如：12个月 / 2026-12" {...errorProps('shelfLife')} />{errorMessage('shelfLife')}</label>
            <label htmlFor="city"><span>05 · 库存城市</span><input id="city" aria-label="库存城市" name="city" autoComplete="off" value={form.city} onChange={(event) => update('city', event.target.value)} ref={(element) => { fieldRefs.current.city = element; }} placeholder="例如：北京" {...errorProps('city')} />{errorMessage('city')}</label>
            <label htmlFor="temperature"><span>06 · 储存温区</span><select id="temperature" aria-label="储存温区" name="temperature" autoComplete="off" value={form.temperature} onChange={(event) => update('temperature', event.target.value)} ref={(element) => { fieldRefs.current.temperature = element; }} {...errorProps('temperature')}><option value="">请选择</option><option>常温</option><option>冷藏</option><option>冷冻</option><option>其他 / 待确认</option></select>{errorMessage('temperature')}</label>
            <label htmlFor="packaging"><span>07 · 包装状态</span><input id="packaging" aria-label="包装状态" name="packaging" autoComplete="off" value={form.packaging} onChange={(event) => update('packaging', event.target.value)} ref={(element) => { fieldRefs.current.packaging = element; }} placeholder="完整、破损比例、外箱情况" {...errorProps('packaging')} />{errorMessage('packaging')}</label>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <legend>合作限制</legend>
          <div className="form-grid">
            <label htmlFor="deadline"><span>08 · 希望处理时间</span><input id="deadline" aria-label="希望处理时间" name="deadline" autoComplete="off" value={form.deadline} onChange={(event) => update('deadline', event.target.value)} ref={(element) => { fieldRefs.current.deadline = element; }} placeholder="例如：15天内" {...errorProps('deadline')} />{errorMessage('deadline')}</label>
            <label className="form-wide" htmlFor="restrictions"><span>09 · 区域与渠道限制</span><textarea id="restrictions" aria-label="区域与渠道限制" name="restrictions" autoComplete="off" value={form.restrictions} onChange={(event) => update('restrictions', event.target.value)} ref={(element) => { fieldRefs.current.restrictions = element; }} placeholder="例如：不得进入原有经销区域，不公开展示品牌折扣" rows={4} {...errorProps('restrictions')} />{errorMessage('restrictions')}</label>
          </div>
        </fieldset>
        <div className="form-privacy"><span aria-hidden="true">◇</span><p><strong>本地处理：</strong>填写内容不会上传、保存或自动发送；关闭或刷新页面后即消失。</p></div>
        <button className="button button-primary" type="submit">生成评估摘要 <span aria-hidden="true">↗</span></button>
      </form>
      {generated && <section className="summary-sheet"><div className="summary-sheet-head"><div><span>OUTPUT / LOCAL</span><h2>库存沟通摘要</h2></div><button type="button" onClick={copySummary}>{copied ? '已复制' : '复制摘要'}</button></div><pre>{summary}</pre><p className="copy-status" aria-live="polite">{copyMessage}</p></section>}
    </section>
  );
}
