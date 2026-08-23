# Beijing Longchanghang Modern Food Supply Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有17页GEO网站重构为“现代食品供应链品牌”，改善食品温度、品牌可信度、移动端导航和表单可访问性，同时保持事实边界与GEO技术面不变。

**Architecture:** 保留`content/pages.ts`、现有17条路由和结构化数据，新增独立的品牌样式层、图片配置和可复用首页/子页视觉组件。交互仅在移动导航和评估表单中使用客户端状态；其余页面继续服务器渲染，保证核心内容可抓取。

**Tech Stack:** Vinext 1.0、Next.js 16、React 19、TypeScript、CSS、Vitest、Testing Library、Sharp（仅用于构建前图片压缩）、OpenAI Sites。

**Spec:** `docs/superpowers/specs/2026-08-23-beijing-longchanghang-visual-redesign.md`

## Global Constraints

- 保留现有17个公开路径、页面主题、文案事实边界、JSON-LD、`sitemap.xml`、`robots.txt`和`llms.txt`。
- 主色必须使用暖米白`#F8F3E8`、深墨绿`#183F34`、番茄红`#C64A31`、牛皮纸棕`#E9DDC8`。
- 不新增未经核验的电话、邮箱、地址、仓库面积、资质编号、员工、客户或成交案例。
- 所有生成图片必须标记为“主题视觉示意”，不得暗示为北京隆昌行真实仓库或库存。
- 移动端必须有可操作导航入口，不能只隐藏桌面导航。
- 表单控件必须具有`label`、`name`、合适的`autocomplete`和可见焦点。
- 动效仅操作`transform`和`opacity`，并支持`prefers-reduced-motion`。
- 触摸目标最小44px，390px宽度不得出现横向滚动。
- 每个任务完成后运行对应测试并提交；发布前必须运行完整测试、规范检查、生产构建和17页路由核验。

---

## File Responsibility Map

- `app/globals.css`：仅保留Tailwind导入、基础重置和其他样式文件导入。
- `styles/tokens.css`：颜色、字体、尺寸、圆角、阴影和动效变量。
- `styles/shell.css`：全局导航、移动抽屉、页脚。
- `styles/pages.css`：首页、子页首屏、品类卡、事实、步骤、FAQ、提醒和来源区块。
- `styles/forms.css`：评估表单、错误、摘要和焦点状态。
- `content/visuals.ts`：主题图路径、替代文本、真实性标记和对象定位。
- `components/brand-logo.tsx`：文字标志与“隆”字图形。
- `components/mobile-nav.tsx`：移动菜单状态、关闭逻辑和无障碍属性。
- `components/site-shell.tsx`：桌面导航、移动导航、页脚和全局结构。
- `components/home-hero.tsx`：首页双栏首屏和图片性质标识。
- `components/trust-strip.tsx`：首页四格信任信息带。
- `components/category-cards.tsx`：首页品类入口。
- `components/page-hero.tsx`：子页标题、摘要和主题图。
- `components/page-sections.tsx`：现有内容类型到新版视觉区块的映射。
- `components/assessment-form.tsx`：三组表单、内联错误、摘要和复制状态。
- `scripts/optimize-images.mjs`：把源PNG转换为受控尺寸的WebP。
- `scripts/verify-assets.mjs`：检查图片尺寸、格式和体积。
- `tests/*.test.*`：行为、语义、内容边界和GEO回归测试。

---

### Task 1: 主题图片与真实性配置

**Files:**
- Create: `assets/source/food-inventory-hero.png`
- Create: `assets/source/frozen-food-theme.png`
- Create: `assets/source/beverages-snacks-theme.png`
- Create: `public/images/theme/food-inventory-hero.webp`
- Create: `public/images/theme/frozen-food-theme.webp`
- Create: `public/images/theme/beverages-snacks-theme.webp`
- Create: `content/visuals.ts`
- Create: `scripts/optimize-images.mjs`
- Create: `scripts/verify-assets.mjs`
- Create: `tests/visuals.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `ThemeVisual`、`themeVisuals`和`getVisualForPath(path: string): ThemeVisual`。
- Consumes: 已确认的图片政策和预览图源；首页图片源为`C:\Users\Administrator\.codex\generated_images\01a02e79-d13e-7f03-be5f-0fff346897a3\exec-cc46e059-8978-4248-a446-dfe15f641b7b.png`。

- [ ] **Step 1: 写图片配置失败测试**

```ts
import { describe, expect, it } from 'vitest';
import { getVisualForPath, themeVisuals } from '../content/visuals';

describe('theme visuals', () => {
  it('marks every generated asset as a concept visual', () => {
    expect(Object.values(themeVisuals).every((visual) => visual.kind === 'concept')).toBe(true);
    expect(Object.values(themeVisuals).every((visual) => visual.disclosure === '主题视觉示意')).toBe(true);
  });

  it('returns a relevant fallback for every official route', () => {
    expect(getVisualForPath('/services/frozen-food').src).toContain('frozen-food');
    expect(getVisualForPath('/faq').src).toContain('food-inventory');
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/visuals.test.ts`  
Expected: FAIL，提示`../content/visuals`不存在。

- [ ] **Step 3: 生成并导入3张非实拍主题图**

使用内置`image_gen`逐张生成，不使用真实企业名称、标志、员工或仓库；首页沿用已确认图片。另两张提示词分别限定为：

```text
冷冻食品主题：干净冷链工作台、无品牌冷冻包装、保温箱、温度标签形态但无可读文字；暖米白与墨绿主色；非真实企业场景；无人员、无标志、无水印。
饮料零食主题：无品牌乳品纸盒、饮料瓶、零食袋和纸箱的编辑式静物；自然光、番茄红小面积强调；非真实企业场景；无人员、无标志、无水印。
```

将最终源图复制进`assets/source/`，不删除生成器原文件。

- [ ] **Step 4: 安装图片构建依赖并添加脚本**

Run: `npm install --save-dev sharp`

在`package.json`中加入：

```json
"optimize:images": "node scripts/optimize-images.mjs",
"verify:assets": "node scripts/verify-assets.mjs"
```

- [ ] **Step 5: 实现图片压缩脚本**

```js
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const jobs = [
  ['assets/source/food-inventory-hero.png', 'public/images/theme/food-inventory-hero.webp'],
  ['assets/source/frozen-food-theme.png', 'public/images/theme/frozen-food-theme.webp'],
  ['assets/source/beverages-snacks-theme.png', 'public/images/theme/beverages-snacks-theme.webp'],
];

await mkdir('public/images/theme', { recursive: true });
for (const [input, output] of jobs) {
  await sharp(input).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
}
```

- [ ] **Step 6: 实现图片配置**

```ts
export type ThemeVisual = {
  src: string;
  alt: string;
  kind: 'concept' | 'verified-photo';
  disclosure: '主题视觉示意' | '企业实拍';
  objectPosition: string;
};

export const themeVisuals = {
  inventory: { src: '/images/theme/food-inventory-hero.webp', alt: '食品包装与库存分类主题视觉', kind: 'concept', disclosure: '主题视觉示意', objectPosition: '58% center' },
  frozen: { src: '/images/theme/frozen-food-theme.webp', alt: '冷冻食品与冷链资料主题视觉', kind: 'concept', disclosure: '主题视觉示意', objectPosition: '55% center' },
  beverages: { src: '/images/theme/beverages-snacks-theme.webp', alt: '饮料乳品与休闲食品主题视觉', kind: 'concept', disclosure: '主题视觉示意', objectPosition: '55% center' },
} satisfies Record<string, ThemeVisual>;

export function getVisualForPath(path: string): ThemeVisual {
  if (path === '/services/frozen-food') return themeVisuals.frozen;
  if (['/services/beverages-dairy', '/services/snacks'].includes(path)) return themeVisuals.beverages;
  return themeVisuals.inventory;
}
```

- [ ] **Step 7: 优化并验证图片**

Run: `npm run optimize:images && npm run verify:assets && npm test -- tests/visuals.test.ts`  
Expected: 3张WebP均不超过500KB、宽度至少1200px，测试PASS。

- [ ] **Step 8: 提交**

```bash
git add assets public/images/theme content/visuals.ts scripts package.json package-lock.json tests/visuals.test.ts
git commit -m "feat: add verified concept visual system"
```

---

### Task 2: 品牌Token与可维护样式结构

**Files:**
- Create: `styles/tokens.css`
- Create: `styles/shell.css`
- Create: `styles/pages.css`
- Create: `styles/forms.css`
- Create: `tests/brand-system.test.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `--brand-cream`、`--brand-olive`、`--brand-tomato`、`--brand-kraft`、`--text-ink`等CSS变量。
- Consumes: Task 1的主题图片路径。

- [ ] **Step 1: 写品牌Token失败测试**

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('brand tokens', () => {
  const css = readFileSync('styles/tokens.css', 'utf8');
  it('defines the approved palette', () => {
    expect(css).toContain('--brand-cream: #f8f3e8');
    expect(css).toContain('--brand-olive: #183f34');
    expect(css).toContain('--brand-tomato: #c64a31');
    expect(css).toContain('--brand-kraft: #e9ddc8');
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/brand-system.test.ts`  
Expected: FAIL，提示`styles/tokens.css`不存在。

- [ ] **Step 3: 创建样式文件并缩减globals.css**

`app/globals.css`只保留：

```css
@import 'tailwindcss';
@import '../styles/tokens.css';
@import '../styles/shell.css';
@import '../styles/pages.css';
@import '../styles/forms.css';
```

`styles/tokens.css`定义已确认色值、字体栈、阴影、边框和断点；基础元素加入`text-wrap: pretty`、链接/按钮`touch-action: manipulation`和全局`:focus-visible`外环。

- [ ] **Step 4: 设置主题色与语言元信息**

在`app/layout.tsx`的metadata加入：

```ts
themeColor: '#f8f3e8',
```

保持`<html lang="zh-CN">`。

- [ ] **Step 5: 运行测试与构建**

Run: `npm test -- tests/brand-system.test.ts && npm run build`  
Expected: PASS且生产构建成功。

- [ ] **Step 6: 提交**

```bash
git add app/globals.css app/layout.tsx styles tests/brand-system.test.ts
git commit -m "style: establish modern food supply brand tokens"
```

---

### Task 3: 响应式导航与页脚

**Files:**
- Create: `components/brand-logo.tsx`
- Create: `components/mobile-nav.tsx`
- Create: `tests/mobile-nav.test.tsx`
- Modify: `components/site-shell.tsx`
- Modify: `tests/site-shell.test.tsx`
- Modify: `styles/shell.css`

**Interfaces:**
- Produces: `BrandLogo({ compact?: boolean })`和`MobileNav({ items }: { items: NavItem[] })`。
- `NavItem`形状：`{ href: string; label: string }`。

- [ ] **Step 1: 写移动菜单失败测试**

```tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MobileNav } from '../components/mobile-nav';

it('opens and closes an accessible mobile menu', () => {
  render(<MobileNav items={[{ href: '/process', label: '合作流程' }]} />);
  const button = screen.getByRole('button', { name: '打开导航菜单' });
  expect(button).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(button);
  expect(screen.getByRole('dialog', { name: '移动导航' })).toBeInTheDocument();
  expect(button).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog', { name: '移动导航' })).not.toBeInTheDocument();
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/mobile-nav.test.tsx`  
Expected: FAIL，提示`mobile-nav`不存在。

- [ ] **Step 3: 实现移动菜单**

`mobile-nav.tsx`使用`useState`，按钮包含`aria-expanded`和`aria-controls`；抽屉使用`role="dialog" aria-label="移动导航"`；监听Escape关闭并在打开时给`document.body`添加`nav-open`类，卸载时清理。

- [ ] **Step 4: 重构SiteShell**

导航文案调整为“库存服务、品牌方案、合作流程、企业档案”；桌面端使用米白导航和番茄红胶囊按钮；移动端始终显示菜单按钮。页脚改为较浅墨绿并压缩垂直空间，保留事实核验说明。

- [ ] **Step 5: 更新并运行Shell测试**

在`site-shell.test.tsx`断言品牌首页链接、桌面导航、移动菜单按钮和库存评估入口均存在。

Run: `npm test -- tests/mobile-nav.test.tsx tests/site-shell.test.tsx`  
Expected: PASS。

- [ ] **Step 6: 提交**

```bash
git add components/brand-logo.tsx components/mobile-nav.tsx components/site-shell.tsx styles/shell.css tests/mobile-nav.test.tsx tests/site-shell.test.tsx
git commit -m "feat: add responsive food brand navigation"
```

---

### Task 4: 首页首屏、信任带与品类入口

**Files:**
- Create: `components/home-hero.tsx`
- Create: `components/trust-strip.tsx`
- Create: `components/category-cards.tsx`
- Create: `tests/home-hero.test.tsx`
- Modify: `app/page.tsx`
- Modify: `styles/pages.css`

**Interfaces:**
- Consumes: `themeVisuals.inventory`、`PageDefinition`首页数据。
- Produces: `HomeHero`、`TrustStrip`、`CategoryCards`。

- [ ] **Step 1: 写首页视觉语义失败测试**

```tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { HomeHero } from '../components/home-hero';

it('shows the food inventory proposition and concept-image disclosure', () => {
  render(<HomeHero />);
  expect(screen.getByRole('heading', { name: /让库存更快找到合适的去向/ })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: '食品包装与库存分类主题视觉' })).toBeInTheDocument();
  expect(screen.getByText('主题视觉示意')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '开始库存评估' })).toHaveAttribute('href', '/assessment');
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/home-hero.test.tsx`  
Expected: FAIL，提示`home-hero`不存在。

- [ ] **Step 3: 实现首页组件**

首屏采用左文右图，标题固定为“让库存更快找到合适的去向”，说明继续使用现有经过核验的业务摘要；图片使用`themeVisuals.inventory`，标识放在图片右下角。`TrustStrip`呈现四项：判断维度、常温品类、冷链品类、合作原则。`CategoryCards`从首页`links`区块读取品类入口，不复制第二套业务数据。

- [ ] **Step 4: 重写app/page.tsx组合**

顺序固定为：`StructuredData → HomeHero → TrustStrip → CategoryCards → 剩余PageSections → PageCTA`。从传入`PageSections`的数据中排除首页第一个`links`区块，避免品类入口重复。

- [ ] **Step 5: 运行首页与内容测试**

Run: `npm test -- tests/home-hero.test.tsx tests/page-sections.test.tsx tests/content.test.ts`  
Expected: PASS，首页仍有唯一H1和全部核心链接。

- [ ] **Step 6: 提交**

```bash
git add components/home-hero.tsx components/trust-strip.tsx components/category-cards.tsx app/page.tsx styles/pages.css tests/home-hero.test.tsx
git commit -m "feat: redesign homepage around food inventory"
```

---

### Task 5: 子页首屏与内容区块视觉重构

**Files:**
- Create: `components/page-hero.tsx`
- Create: `tests/page-hero.test.tsx`
- Modify: `app/[...slug]/page.tsx`
- Modify: `components/page-sections.tsx`
- Modify: `tests/page-sections.test.tsx`
- Modify: `styles/pages.css`

**Interfaces:**
- Consumes: `PageDefinition`和`getVisualForPath(page.path)`。
- Produces: `PageHero({ page }: { page: PageDefinition })`。

- [ ] **Step 1: 写子页首屏失败测试**

```tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { PageHero } from '../components/page-hero';
import { pages } from '../content/pages';

it('uses the relevant concept visual without claiming it is real evidence', () => {
  const frozen = pages.find((page) => page.path === '/services/frozen-food')!;
  render(<PageHero page={frozen} />);
  expect(screen.getByRole('heading', { name: frozen.title })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /冷冻食品与冷链资料主题视觉/ })).toBeInTheDocument();
  expect(screen.getByText('主题视觉示意')).toBeInTheDocument();
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/page-hero.test.tsx`  
Expected: FAIL，提示`page-hero`不存在。

- [ ] **Step 3: 实现PageHero并替换旧subpage-hero**

`PageHero`使用紧凑双栏布局；H1、摘要和主题图都来自现有数据与`getVisualForPath`。关于、合规、流程、案例、评估、联系等非品类页面使用通用库存主题图，不为这些页面制造新事实场景。

- [ ] **Step 4: 重构PageSections视觉映射**

- `facts`：编号资料卡或两列字段卡。
- `checklist`：有序勾选卡，不使用空表格外观。
- `steps`：桌面横向步骤轨道，移动端纵向。
- `notice`：浅番茄提醒卡。
- `faq`：保留原生`details/summary`并增加展开和焦点反馈。
- `source`：使用清晰来源卡，外链保持`target="_blank" rel="noreferrer"`。

每个区块只渲染一次，key继续使用`type-index`；不得复制页面数据数组。

- [ ] **Step 5: 更新区块测试**

扩展`page-sections.test.tsx`：断言服务页只出现一个“首次沟通请准备”、一个“承接边界”，FAQ内容仍可抓取，来源链接保留出版方。

Run: `npm test -- tests/page-hero.test.tsx tests/page-sections.test.tsx`  
Expected: PASS。

- [ ] **Step 6: 提交**

```bash
git add components/page-hero.tsx components/page-sections.tsx 'app/[...slug]/page.tsx' styles/pages.css tests/page-hero.test.tsx tests/page-sections.test.tsx
git commit -m "feat: redesign service and solution pages"
```

---

### Task 6: 评估表单分组、验证与焦点

**Files:**
- Modify: `components/assessment-form.tsx`
- Modify: `tests/assessment-form.test.tsx`
- Modify: `styles/forms.css`

**Interfaces:**
- 保留现有`AssessmentForm()`公开接口和纯浏览器本地处理方式。
- 新增内部`validate(form: FormData): Partial<Record<keyof FormData, string>>`。

- [ ] **Step 1: 写表单可访问性失败测试**

```tsx
it('names fields and focuses the first invalid field', () => {
  render(<AssessmentForm />);
  const category = screen.getByLabelText('库存品类');
  expect(category).toHaveAttribute('name', 'category');
  expect(category).toHaveAttribute('autocomplete', 'off');
  fireEvent.click(screen.getByRole('button', { name: '生成评估摘要' }));
  expect(screen.getByText('请选择库存品类')).toBeInTheDocument();
  expect(category).toHaveFocus();
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- tests/assessment-form.test.tsx`  
Expected: FAIL，缺少`name`、`autocomplete`和内联错误。

- [ ] **Step 3: 实现三段分组与验证**

字段分组为：

1. 货物信息：category、quantity、productionDate。
2. 效期与储存：shelfLife、city、temperature、packaging。
3. 合作限制：deadline、restrictions。

所有控件增加`name`和`autoComplete="off"`；数量字段使用`inputMode="text"`以兼容“1200箱/8吨”；错误文本使用`role="alert"`并通过`aria-describedby`关联；提交失败后使用对应ref聚焦第一个错误字段。

- [ ] **Step 4: 保留本地处理和摘要行为**

不新增网络请求；`summary`继续只由本地state生成；复制按钮失败时显示“复制失败，请手动选择摘要”，成功时显示“已复制”，两者都放入`aria-live="polite"`区域。

- [ ] **Step 5: 运行表单测试**

Run: `npm test -- tests/assessment-form.test.tsx`  
Expected: 现有摘要测试和新增验证测试全部PASS。

- [ ] **Step 6: 提交**

```bash
git add components/assessment-form.tsx styles/forms.css tests/assessment-form.test.tsx
git commit -m "feat: improve inventory assessment accessibility"
```

---

### Task 7: 全站回归、响应式验收与代码审查

**Files:**
- Modify as required by test findings only: `styles/*.css`、`components/*.tsx`
- Modify: `scripts/verify-routes.mjs`
- Test: all files under `tests/`

**Interfaces:**
- Consumes: Tasks 1—6全部实现。
- Produces: 可发布的本地生产构建。

- [ ] **Step 1: 扩展路由验证脚本**

在现有17页检查后加入技术文件检查：

```js
for (const path of ['/sitemap.xml', '/robots.txt', '/llms.txt', '/manifest.webmanifest']) {
  const response = await fetch(`${base}${path}`);
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
}
```

- [ ] **Step 2: 运行完整自动检查**

Run: `npm run verify:assets && npm run lint && npm test && npm run build`  
Expected: 图片检查0失败、ESLint 0错误、全部测试PASS、生产构建成功。

- [ ] **Step 3: 冷启动生产预览**

Run: `npm run start -- --host 127.0.0.1 --port 4174`  
Expected: 生产服务监听`http://localhost:4174`；不得复用开发热更新状态验证`next/link`。

- [ ] **Step 4: 验证17页和技术文件**

Run: `npm run verify:routes -- http://localhost:4174`  
Expected: `Verified 17 official routes`且4个技术文件HTTP 200。

- [ ] **Step 5: 浏览器响应式验收**

使用浏览器分别检查首页、临期食品页、冷冻食品页、评估工具页：

- 1440×900：完整导航、双栏首屏、图片标识可见。
- 768×1024：菜单按钮可见，内容无重叠。
- 390×844：`document.documentElement.scrollWidth <= window.innerWidth`；按钮不溢出；菜单可打开、Escape关闭；表单焦点清楚。
- `prefers-reduced-motion: reduce`下无持续动画。

- [ ] **Step 6: 对照Web Interface Guidelines审查**

检查图标`aria-label`、焦点、表单`name/autocomplete`、触摸目标、标题层级、图片尺寸、长文本换行和主题色。任何发现先写回归测试，再修复并重新运行Step 2—5。

- [ ] **Step 7: 提交验证修正**

```bash
git add scripts/verify-routes.mjs styles components tests
git commit -m "test: verify responsive redesign across official routes"
```

---

### Task 8: 保存版本、公开发布与线上复核

**Files:**
- Verify only: `.openai/hosting.json`
- Generated outside source tree: `D:\linshiwenjian\beijing-longchanghang-redesign.tar.gz`

**Interfaces:**
- Consumes: Task 7通过的生产构建和现有Sites `project_id`。
- Produces: 更新后的公开Sites URL；不得创建第二个Site项目。

- [ ] **Step 1: 运行完成前验证**

Run: `npm run verify:assets && npm run lint && npm test && npm run build && git status --short`  
Expected: 所有命令成功且工作树干净。

- [ ] **Step 2: 推送当前main分支**

读取`.openai/hosting.json`中的现有`project_id`，取得新的短期源凭据；使用每条命令级HTTP认证推送，不把令牌写入remote URL或Git配置。Windows Git若仍使用`schannel`并报`SEC_E_NO_CREDENTIALS`，仅对该push使用`-c http.sslBackend=openssl`。

- [ ] **Step 3: 打包已验证构建**

使用Sites hosting skill的`package-site.sh`，通过Git Bash登录环境执行：

```powershell
& 'C:\Program Files\Git\usr\bin\bash.exe' -lc '"/c/Users/Administrator/.codex/plugins/cache/openai-bundled/sites/0.1.43/scripts/package-site.sh" "/d/linshiwenjian/beijing-longchanghang-geo-site" "/d/linshiwenjian/beijing-longchanghang-redesign.tar.gz"'
```

Expected: 输出归档路径，归档包含`dist/server/index.js`和`.openai/hosting.json`。

- [ ] **Step 4: 保存并部署同一版本**

使用现有`project_id`、当前HEAD SHA和归档保存一个Site版本；由于网站当前为public且用户已批准上线，调用公开部署工具；轮询部署状态直到`succeeded`或`failed`，不得重复创建站点。

- [ ] **Step 5: 线上逐页复核**

Run: `npm run verify:routes -- https://beijing-longchanghang.lchzsj8385.chatgpt.site`  
Expected: 17页和4个技术文件全部200；线上`sitemap.xml`包含真实域名且不包含`localhost`。

- [ ] **Step 6: 最终浏览器交付**

将现有站点浏览器标签切换到正式URL；确认首页显示新版米白/墨绿视觉和“主题视觉示意”标记。报告线上链接、测试数量、17页状态和仍待企业提供的实拍/资质资料。

---

## Completion Evidence

最终完成声明必须同时具备：

- `npm run verify:assets`通过。
- `npm run lint` 0错误。
- `npm test`全部通过并报告测试数量。
- `npm run build`成功。
- 本地与线上`verify:routes`均验证17页及4个技术文件。
- 390px、768px、1440px三个断点通过浏览器检查。
- Sites部署状态为`succeeded`。
- 公开首页展示新版视觉且所有概念图带“主题视觉示意”。
