# Chloe in Wonderland Plan C：逐章资产化与视觉闭环计划

## Summary

本计划将后续 UI 方向固定为 **方案 C：局部视觉资产 + 真实 DOM 交互 + 多轮截图评测**。

不再使用整张 AI 渲染图作为网页背景，也不把按钮、文字、谜题答案烘焙进图片。每章会拥有独立的核心道具资产，例如口琴、乐谱、木门锁、守卫卡、Nokia 手机、挂饰、借阅卡、月光卡片等；同时保留 React/DOM 实现真正可点击、可拖拽、可输入、可校验的交互。

目标是让页面从“普通网页表单”升级为“故事书 + 道具桌 + 可操作谜题”的游戏界面，并通过真实浏览器截图持续比较视觉效果图与实际网页，逐轮修正布局、材质、层次、动效和响应式体验。

## Core Decision

采用方案 C，从第一步开始执行：

- 使用局部图片或纹理资产提高真实质感。
- 所有交互控件、谜题文字、状态反馈保留为网页元素。
- 不使用完整 AI UI 图作为页面底图。
- 不允许图片中包含假按钮、假文字、假输入框、假 UI。
- 每一章都做资产化计划，而不是只处理第一章。
- 通过多轮迭代推进，每轮都包含设计、实现、截图、评测、修正。

## Multi-Agent Workflow

默认按 **3 角色** 执行：

- **Implementer**：承担设计契约、代码实现、本地截图。负责定义章节核心道具、资产清单、材质/光照/构图、哪些部分用图片资产、哪些必须 DOM；落地 React 组件结构；保证移动端有可操作 fallback。
- **Reviewer**：对照参考图、视觉基准和截图输出差异意见，运行截图脚本，标注布局/层次/材质/遮挡/溢出/移动端问题，判断是否可以更新 baseline。
- **Decision Owner**：由用户担任，只负责接受或打回视觉方向；只有用户确认后才更新 `docs/ui-review/baseline/`。

可选升级（仅在 Implementer 自评困难、视觉分歧反复不通过时启用）：

- **Design Agent**：临时独立产出该章视觉契约（资产清单、材质、光照、构图、裁切、负面约束、desktop/tablet/mobile 构图重点），交付后回到 3 角色流程。

## Shared Layer Architecture

每章右侧道具区统一拆成五层。该五层架构的作用域仅限 `ObjectWorkbench` 内部，不重写已经稳定的 `TopHud`、`StorybookPanel`、`BottomCommandBar` 外壳结构。

1. **Scene Layer**
   - 章节桌面、环境光、墙面、阴影、月光、火光等。

2. **Prop Shell Layer**
   - 核心道具外观，例如口琴、手机、守卫卡、挂饰、借阅卡、兑换券。

3. **DOM Interaction Layer**
   - 真实按钮、输入、滚轮、滑杆、拖拽热区、选择状态、提示按钮。

4. **FX State Layer**
   - 高亮、震动、发光、显影、磁吸、按键下压、屏幕闪烁、印章动画。

5. **Success Event Layer**
   - 成功后的剧情事件，例如门锁打开、守卫转身、流程跑通、手机解锁、挂饰合拢、卡片显影。

五层不是 5 个新组件，而是 **CSS class 约定**。每个 puzzle 模块内部按以下骨架组织：

```tsx
// src/puzzles/chapter-N.tsx
return (
  <div className="ciw-puzzle-root">
    <div className="ciw-layer-scene"   aria-hidden>{/* 背板、灯光 */}</div>
    <div className="ciw-layer-prop"    aria-hidden>{/* 道具外壳 img */}</div>
    <div className="ciw-layer-dom">              {/* 按钮、输入、滚轮 */}</div>
    <div className="ciw-layer-fx"      aria-hidden>{/* 高亮、震动 */}</div>
    {success && <div className="ciw-layer-success">{/* 成功剧情 */}</div>}
  </div>
);
```

约束：

- `ciw-layer-scene` / `ciw-layer-prop` / `ciw-layer-fx` 必须 `aria-hidden`，所有可访问语义集中在 `ciw-layer-dom`。
- `ciw-layer-success` 仅成功后挂载，避免占位影响 a11y tree。
- 各层使用绝对定位 + `z-index` 控制叠放，`ciw-puzzle-root` 是唯一的相对定位锚点。
- 五层 class 的样式在 `src/index.css`（或后续拆出的 chapter CSS）统一定义，不在 JSX 写 inline style。

## Chapter Asset Manifest

Round 0 必须先固定资源配置形态，避免不同章节、不同 agent 写出互相冲突的资产结构。

建议新增：

```ts
// src/assets/chapters/manifest.ts
export interface SafeArea {
  name: string;       // 'screen' | 'keypad' | 'countryCode' 等，DOM 用 name 锚定
  x: number;          // percentage, 0-100
  y: number;
  width: number;
  height: number;
}

export interface ChapterAsset {
  src: string;
  alt: string;
  role: 'plate' | 'propShell' | 'texture' | 'overlay';
  safeAreas?: SafeArea[];   // 可定义多个区域；DOM 通过 name 查询
}

export interface ChapterAssetSet {
  chapterId: number;        // 1-8，与 chapter.id 一一对应；不再单独引入 slug
  plate?: ChapterAsset;
  propShells: ChapterAsset[];
  textures?: ChapterAsset[];
  overlays?: ChapterAsset[];
}
```

建议资产目录：

```text
src/assets/chapters/
  chapter-1/
    plate.webp
    harmonica.webp
    score-paper.webp
    lock-shell.webp
  chapter-2/
    guard-card.webp
    knight-badge.webp
    wax-marker.webp
  chapter-3/
    terminal-shell.webp
    cable.webp
  chapter-4/
    nokia-front.webp
    nokia-back.webp
    screen-glass.webp
    keypad-panel.webp
    country-code-strip.webp
  chapter-5/
    chase-map.webp
    footprint.webp
  chapter-6/
    pendant-left.webp
    pendant-right.webp
    velvet-tray.webp
  chapter-7/
    library-card.webp
    catalog-cabinet.webp
    stamp.webp
  chapter-8/
    moon-card.webp
    moonbeam.webp
    voucher.webp
```

目录使用 `chapter-1` 到 `chapter-8`，与现有 `chapter.id` 和 `ciw-archive-chapter-${chapter.id}` 命名习惯保持一致。

## Asset Rules

图片资产应该用于：

- 道具外壳。
- 材质纹理。
- 光影氛围。
- 非文字性的装饰元素。
- 不需要玩家直接阅读的背景部件。

DOM/CSS/SVG 应该用于：

- 谜题文字。
- 答案输入。
- 点击按钮。
- 拖拽目标。
- 滚轮数字。
- 手机按键热区。
- 守卫证词。
- 提示内容。
- 成功/失败文案。

禁止：

- 把整张 UI 效果图直接作为背景。
- 让图片里出现不可点击的假按钮。
- 让图片里出现不可读取或乱码的假文字。
- 用图片替代真实谜题答案。
- 为了好看牺牲交互可用性。
- 图片内含可识别真人肖像或商标。Chloe / Alex 相关形象优先使用风格化剪影、手绘轮廓或抽象道具，不生成近似真实人脸。

### Asset Source

默认资产来源：

- 使用 AI 生成局部道具资产、纹理资产或透明背景 prop shell。
- 资产生成提示必须包含：无文字、无按钮、无 UI、无 logo、无真实人脸。
- **交付前必须人工 100% 查图**：实际 AI 工具经常无视提示词塞回假按钮/假文字。发现任何假 UI 必须重生成或手动擦除，不允许"看起来差不多就过"。
- "图片是否含假 UI / 假文字" 是 Reviewer 的硬性检查项，发现一处即打回。
- 能用 CSS/SVG 稳定实现的控件优先不用图片，例如滚轮数字、手机按键热区、徽章状态、滑杆、提示按钮。
- 已有本地资产迁入章节目录并通过 manifest 引用；Round 0a 结束时不再保留原路径兼容。

### Asset Budget

默认体积预算：

- 每章 `propShells` 合计目标不超过 `400KB`。
- 每章全部图片资产硬上限 `1.5MB`。
- 单个道具最长边建议不超过 `1024px`。
- 首屏不得一次性加载全部 8 章大图；后续需要章节级 lazy loading 和下一章预取。
- `npm run build` 后检查 `dist/assets`，单轮视觉改动的资源增量必须能解释。

### DOM Overlay Rules

图片资产如果需要承载 DOM 文字或控件，必须提供逻辑坐标区：

- 使用 `safeAreas` 描述文字/控件可落位区域，每个 area 必须有 `name` 便于 DOM 锚定。
- DOM 叠放使用百分比和容器相对定位，不使用脆弱的绝对像素。
- 跨 desktop、tablet、mobile 三个视口时，DOM 文字必须始终落在图片预留区内。
- 道具翻面、倾斜、旋转优先用 CSS transform 同步 DOM 和图片，不为每个状态维护多张难以对齐的静态图。

## Motion And Mobile Contract

每章都必须遵守：

- `prefers-reduced-motion: reduce` 下，FX Layer 和 Success Layer 使用淡入、即时状态切换或短动画替代，不使用长距离位移、强震动或连续闪烁。
- 移动端所有拖拽玩法必须有按钮替代路径。
- 移动端所有核心操作目标建议不小于 `44px`。
- 第 5 章方向选择、第 6 章旋转/翻面/磁吸、第 8 章月光显影必须在触屏下可完成。
- 375px 宽度下，关键情感词和答案文本不得被截断或装饰遮挡。

## Chapter Plans

### Chapter 1：空之轨迹

核心视觉：木屋桌面、口琴、旧乐谱、木门机械锁。

资产化：

- 口琴作为透明道具资产。
- 乐谱纸作为旧纸资产，音符高亮仍由 DOM/CSS 控制。
- 木门锁外壳可以使用资产或 CSS/SVG 混合。
- 桌面使用暖色火光、木纹和轻微阴影。

交互：

- 点击口琴后乐谱清晰。
- “吹一遍”触发音符节拍高亮。
- 四位滚轮锁保留 DOM，答案固定为 `7564`。
- 成功后门锁齿轮转动、门缝透光、第一章音乐淡出。

评测重点：

- 不能像普通数字输入框。
- 口琴、乐谱、锁必须一眼可识别。
- 移动端滚轮可点按操作，不依赖键盘。

### Chapter 2：谁是骑士？

核心视觉：守卫证词推理桌。

资产化：

- 七张守卫卡统一卡框。
- 守卫剪影可用低细节资产。
- 骑士徽章、蜡封标记作为独立道具资产。
- 推理板可使用纸张/木板质感。

交互：

- 每张卡的证词文字保留 DOM。
- 真话、谎话、待定标记为真实按钮。
- 可点击或拖动骑士徽章到 G 守卫。
- 成功时 G 守卫高亮，金币和利是进入进度背包。

评测重点：

- 七张卡信息密度要清晰。
- 卡片不能挤成普通表格。
- 逻辑反馈必须能解释为什么 G 是答案。

### Chapter 3：码农天堂

核心视觉：复古电脑工作台与流程看板。

资产化：

- 电脑外壳、屏幕玻璃、线缆、状态灯。
- 工作台可以带轻微科技/办公室质感。

交互：

- 流程节点、任务卡、岗位分配保留 DOM。
- 点击运行后，流程线逐步亮起。
- 阻塞节点闪烁。
- 流程成功后显示构建成功状态，并自然引出手机。

评测重点：

- 玩法要像“修复工作流”，不是输入密码。
- 屏幕内部信息必须可读。
- 成功/失败状态要可视化。

### Chapter 4：砖头

核心视觉：Nokia 砖头手机。

资产化：

- Nokia 手机正面/背面外壳。
- 屏幕玻璃、键盘面板、背面刻字区域。
- 国家编号列表可以是纸条资产，但文字仍用 DOM。

交互：

- 数字键为真实 DOM 热区。
- 输入 `5683` 后按 `#` 验证。
- 按键有下压反馈。
- 错误密码手机震动。
- 成功后屏幕显示未接来电，点击回拨进入下一章。

评测重点：

- 手机不能只是一个普通按钮矩阵。
- 屏幕文字要清楚。
- 移动端按键足够大。

### Chapter 5：尾行

核心视觉：夜色路径追踪地图。

资产化：

- 迷宫小径地图、脚印、断枝、水光、远处身影。
- 可以加入小型怀表或距离标记作为氛围道具。

交互：

- 每步方向选择保留 DOM。
- 倒计时、错误次数、距离变化真实更新。
- 错误方向让距离拉开。
- 成功时银色挂饰掉落并进入背包。

评测重点：

- 每一步选择都要有可观察线索。
- 不能变成纯文本选择题。
- 移动端方向按钮不能遮挡地图线索。

### Chapter 6：双剑合璧

核心视觉：丝绒托盘上的两片银色挂饰。

资产化：

- 两片挂饰可用透明 PNG/WebP 或 SVG/PNG 混合。
- 托盘、半透明目标轮廓、刻痕纹理。

交互：

- 挂饰可拖拽、旋转、翻面。
- 靠近正确位置时磁吸。
- 移动端提供旋转/翻面/对齐按钮。
- 成功后挂饰合拢，铭文显现，借阅卡落下。

评测重点：

- 触控端必须可玩。
- 磁吸和成功状态要明确。
- 挂饰不能只是装饰图，需要有状态变化。

### Chapter 7：借阅卡

核心视觉：旧图书馆档案检索台。

资产化：

- 泛黄借阅卡。
- 目录柜、放大镜、印章、旧纸纹理。

交互：

- 年份拨轮选择 `2008`。
- 名字空缺填入“所有”。
- 目录筛选和卡片补全为 DOM。
- 成功后盖章，字迹浮现。

评测重点：

- 看起来像真实借阅卡，不像普通表单。
- 两个答案必须按顺序验证。
- “所有”这个情感关键词要有视觉强调。

### Chapter 8：莫奈的画

核心视觉：月光下的卡片显影。

资产化：

- 月光卡片、窗边光束、兑换券、纸张质感。
- 背景可以更冷、更安静，但不能破坏整体故事书一致性。

交互：

- 月光滑杆控制显影程度。
- 卡片可轻微倾斜。
- 隐藏字迹逐步出现。
- 填写并确认后兑换券出现。

评测重点：

- 情绪应温柔收束，不像考试。
- 最终兑换券出现要有仪式感。
- 卡片显影不能提前泄露完整答案。

## Iteration Order

### Round 0：基础设施

#### Round 0a：资产契约

Deliverable：

- 建立 `src/assets/chapters/` 章节资产目录。
- 新增 `src/assets/chapters/manifest.ts`，定义 `SafeArea` / `ChapterAsset` / `ChapterAssetSet`。
- 先只填 Chapter 1 的真实或 stub 资产，其余章节保留空配置。
- 将当前平铺资产迁入章节目录（`voucher2.png` 这类超预算资源迁入前先用 `cwebp -q 80` 压缩；超预算的资产不允许直接迁入）。
- Round 0a 结束时所有原平铺资产引用必须全部切到 manifest，**不留兼容路径**，避免长期双轨。
- 明确每章 `safeAreas`、图片来源（AI / SVG / 手绘）、资产预算（接 §Asset Budget）。
- 新增 `scripts/check-asset-budget.mjs`：build 后扫描 `dist/assets/`，按 chapter 前缀汇总，超预算 exit 1。先跑 baseline 数据即可，不强制集成 CI。
- 对齐 §Chapter Plans 各章资产化清单与 §Chapter Asset Manifest 目录列表（例如 Chapter 4 二者目前数量不一致，需要修齐）。

#### Round 0b：Workbench 分层骨架与模块拆分

Deliverable：

- 仅在 `ObjectWorkbench` / puzzle 组件内部建立五层 class 结构（§Shared Layer Architecture）。
- 不重写 `TopHud`、`StorybookPanel`、`BottomCommandBar`。
- **拆分 `src/puzzles/ChapterPuzzles.tsx`** 为 `src/puzzles/chapter-1.tsx` ... `chapter-8.tsx`，每章独立模块。`PuzzleComponent.tsx` 改为按 `puzzleType` dispatch 到对应模块。这是后续 §Asset Budget 中 `React.lazy` 章节级懒加载的前提。
- 选定 lazy loading 技术手段：**`React.lazy(() => import('./puzzles/chapter-N'))` + 下一章图片 `<link rel="preload" as="image">` 预取**。Round 0b 在 Chapter 1 上验证可工作。
- 先用 Chapter 1 `harmonicaLock` 验证五层结构不破坏现有交互和截图脚本。
- 确认 `scripts/ui-screenshots.mjs` 已覆盖 intro + chapter 1-8 的 desktop/tablet/mobile，共 27 张哨兵图。
- Chapter 专用样式超过 200 行时，拆到 `src/styles/chapter-N.css`，`index.css` 只承载 tokens / shell / 共用 utilities。

#### Round 0 完成判定

- `src/assets/chapters/manifest.ts` 可被任意组件 import，类型不报错。
- Chapter 1 五层结构在 desktop / mobile 截图中均无视觉/交互回归。
- `npm run typecheck` / `lint` / `test` / `build` / `ui:screenshots` 全绿。
- `ui:check` 显示 Chapter 1 差异有原因，其他 7 章差异 < 阈值。
- 人工从 Chapter 1 起连续通关至 Chapter 1（含成功事件），console 无 asset 加载错误。

### Round 1：Chapter 1 Vertical Slice

先完整打通第一章的方案 C：

- 局部资产。
- DOM 交互。
- 成功动画。
- desktop/mobile 截图评测。

这一章作为后续所有章节的技术模板。

### Round 2：Chapter 2 + Chapter 8

优先处理视觉差异最明显的两章：

- Chapter 2 验证卡片密度和推理桌。
- Chapter 8 验证月光、显影、情绪收束。

### Round 3：Chapter 4

验证复杂实体道具：

- Nokia 外壳。
- DOM 按键。
- 屏幕状态。
- 翻面与解锁动画。

### Round 4：Chapter 3 + Chapter 5 + Chapter 6 + Chapter 7

#### Round 4a：Chapter 3 + Chapter 5

补齐流程和路径类章节：

- Chapter 3 工作流运行。
- Chapter 5 路径追踪。

#### Round 4b：Chapter 6 + Chapter 7

补齐拖拽和档案类章节：

- Chapter 6 挂饰拼合。
- Chapter 7 档案检索。

### Round 5：全局视觉统一

- 统一色彩、阴影、纸张、木纹、金属、月光、火光。
- 统一按钮等级和提示抽屉。
- 修正所有移动端堆叠、溢出、遮挡。
- **新引入的颜色 / 阴影 / 圆角 / 动画时长必须沉淀到 `UI_RULES.md` Tokens 段以及 `src/index.css` CSS 变量**，禁止散落在章节组件 inline style。
- 经用户确认后更新 baseline。

## Screenshot Review Protocol

每一轮 UI 修改后运行：

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run ui:screenshots
```

baseline 已存在或需要确认非目标章节是否回归时运行：

```bash
npm run ui:check
```

当改动影响答案校验、章节切换、进度存档、hint 行为或成功事件时运行：

```bash
npm run test:e2e
```

截图范围以 `scripts/ui-screenshots.mjs` 为准：intro + chapter 1-8，各自覆盖 desktop `1440x900`、tablet `768x900`、mobile `375x812`。

评测 checklist：

- 是否保持“故事书 + 道具桌”的核心架构。
- 是否每章都有一眼可识别的核心道具。
- 是否没有假按钮、假文字、假输入框。
- 是否无横向滚动。
- 是否无内容遮挡。
- 是否移动端可操作。
- 是否关键成功反馈足够明确。
- 是否视觉上更接近参考图，而不是普通网页组件。
- `prefers-reduced-motion` 下是否仍能理解状态变化。
- `dist/assets` 增量是否符合章节预算。

## Baseline Update Rules

可以更新 baseline 的条件：

- 用户确认视觉方向。
- 所有目标截图生成成功。
- desktop/tablet/mobile 没有明显布局错误。
- 非目标章节没有明显退化。
- 所有谜题仍可通过。
- 目标章节差异来自预期视觉升级，而不是错位、遮挡或组件消失。
- 非目标章节截图差异低于阈值，或差异有明确原因。

不能更新 baseline 的情况：

- 只是为了让 `ui:check` 通过。
- 章节变成完整背景图但交互不可用。
- 图片中包含假 UI。
- 移动端无法完成谜题。
- 目标章节只是半成品。
- 资源体积明显超预算且没有压缩或 lazy loading 方案。

## Acceptance Criteria

- 每章视觉上像不同的故事道具，而不是同一个白色表单换文案。
- 桌面端尽量维持单屏沉浸式体验。
- 移动端清晰堆叠，关键控件不被装饰遮挡。
- 第一章、第二章、第八章首先达到可接受视觉质量。
- 所有章节最终都完成方案 C 资产化。
- 不牺牲交互正确性、测试通过率和可维护性。
- `npm run build` 后资源体积增量不超过当前章节预算。
- `npm run ui:check` 中非目标章节无未解释的大面积视觉漂移。

## Visual Gap Notes Mapping

`docs/ui-review/visual-gap-notes.md` 已记录当前主要视觉差距。Plan C 需要逐项解决：

- Chapter 1：通过口琴、乐谱、木门锁资产化解决”道具不够真实、谜题仍像网页控件”的问题。
- Chapter 2：通过守卫卡、徽章、推理桌解决”卡片缺少实体感和推理桌气质”的问题。
- Chapter 4：通过 Nokia 外壳、屏幕玻璃、真实按键反馈解决”按钮矩阵感过强”的问题。
- Chapter 8：通过月光卡片、显影层、兑换券仪式感解决”情绪收束不够像最终礼物”的问题。
- 全局：继续禁止整张 AI 背景图，保持”局部资产 + DOM 交互”的可维护架构。

**持续回写**：Round 2 / 3 / 4 任一轮完成后，必须把当轮新发现的视觉差距追加到 `docs/ui-review/visual-gap-notes.md`，作为持续的”未完成视觉债”账本。Round 5 全局统一以该文件作为唯一对账依据。

## Risk And Rollback

- 分支策略：正式实施时建议每章一个 feature branch；当前本地快速迭代也要保持每轮截图和验证结果可追溯。**每轮迭代前 commit，单轮内允许多次提交**，防止某轮回滚时丢中间进度。
- 回滚信号：如果某章 vertical slice 超过 3 轮仍无法达到接受标准，回退到上一稳定实现，将该章临时降级为 DOM/CSS 方案，不阻塞后续章节。
- 存档兼容：`gameProgress.ts` 使用 `chloe-in-wonderland:progress:v1`。章节数据形状或 shell 结构变化不得破坏现有存档；如必须变化，需要 migration。
- 截图兼容：截图脚本依赖章节入口和进度状态，调整路由、按钮文案或 localStorage key 时必须同步更新脚本。`ui-screenshots.mjs` 的 `mode: continue` 通过直接注入 localStorage `chapterIndex` 跳到目标章节，不会触发前置章节渲染；**每章 vertical slice 完成后必须人工从 Chapter 1 起连续通关至该章一次**，确认 console 无 asset 加载错误。
- 资源回滚：每章资产引入都要能独立移除，不应把多个章节资产混在同一次不可拆分提交里。

## Current Execution Entry

下一步执行从 **Round 0a + Round 0b + Chapter 1 Vertical Slice** 开始：

1. 定义 `ChapterAssetSet` 类型和 `src/assets/chapters/manifest.ts` 骨架。
2. 建立 `src/assets/chapters/chapter-1/`，先接入或 stub 第一章资产。
3. 在 `ObjectWorkbench` 内部按五层结构重构 Chapter 1，不改动全局 shell。
4. 接入第一章口琴、乐谱、木门锁资产与 DOM 交互。
5. 运行 typecheck、lint、test、build、screenshots。
6. 对比参考效果与实际网页，进入下一轮视觉修正。
