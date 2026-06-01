# Chloe in Wonderland 渲染图资产分区

依据 `docs/design/gpt-reference/storybook-archive-ch1..ch8-desktop.png` 8 张参考图。每章拆成三类：

- **Image Asset Zone**：可烘焙到图片的"死区"（桌面、道具外壳、装饰、纸张质感、灯光、刻纹）。这些以 webp 输出，**绝不能包含文字、按钮、可玩部件**。
- **DOM Zone**：必须是 HTML 元素（文字、按钮、输入框、可点击道具、状态变化的图层）。
- **Hybrid Zone**：图片提供外框 + 留出 `safeArea`，DOM 填充内容。Manifest 用 `safeAreas[]` 描述。

字段 `[x,y,w,h]%` 表示相对各章 puzzle 容器（不是整页）的百分比矩形，供 manifest 写 safeArea 时参考。

---

## 0. 跨章共用 chrome（一次性资产）

8 张参考图共用同一个外框，只有右侧 puzzle 区不同。建议把"chrome"抽成共用资产 + DOM，不重复 8 次。

### 0.1 Top HUD（顶栏，跨章一致）

```
┌─CHAPTER 0X───────♥♥♥♥♥●○○○○○○─────────PROPS───[♪][📄][🔑][⚿][🌹]──[≡]┐
│  The Chapter Title                                                          │
```

- **Image Asset**: HUD 底板渐变（深墨绿 → 黑），头像徽章圆框，右上角 PROPS 槽位的金属凹框，菜单按钮的圆形铜框。整段做成一张 `chrome/hud-bar.webp`（横向 tile-able）。
- **DOM Zone**:
  - `CHAPTER 0X` + chapter title（左上）
  - 进度心形序列（11 槽位的 active/passed state）
  - PROPS 槽位内的图标（每章解锁的道具图标，作为单独的 prop sprite webp，DOM 控制 `is-earned` / `is-active` class）
  - `≡` 菜单按钮
- **Hybrid**：PROPS 5 个槽位由 hud-bar 提供金属凹槽，DOM 在每个槽位 `safeArea` 里放 prop sprite。

### 0.2 Storybook 书页（左半，跨章一致）

```
┌─[书侧面］┬──────书页──────┬─[侧标签]┐
│         │                 │ ♘       │
│         │   CHLOE         │ ⚿       │
│         │   IN            │ ⌁       │
│         │   WONDERLAND    │ ♡       │
│  ◆      │   ─STORYBOOK─   │ ◇       │
│         │                 │         │
│         │   CHAPTER 0X    │         │
│         │   ─Title─       │         │
│         │   ─────────     │         │
│         │   ─body text─   │         │
│         │   ─────────     │         │
│         │                 │         │
│         │  ┌──HINT──┐     │         │
│         │  │ ────── │     │         │
│         │  └────────┘     │         │
└─────────┴─────────────────┴─────────┘
   ribbon                     book lock
```

- **Image Asset**:
  - 整本书的"外壳"：旧皮革封面、ribbon 书签、左下角金属心形挂锁、书脊深绿、右侧 5 个 emboss 侧标签的金属凹框、书页纸质纹理 + 描金边、左下角 Alice 剪影水印、装饰花纹。
  - 一张 `chrome/storybook-frame.webp`（含书侧/书脊/侧标签/底纸纹理）+ 一张 `chrome/storybook-corner-C.webp`（左上角"C"金属牌）。
- **DOM Zone**:
  - `CHLOE IN WONDERLAND` 主标题、`STORYBOOK ARCHIVE` 副标
  - `CHAPTER 0X` + 章标题
  - 章节正文（`whitespace-pre-wrap`）
  - `HINT` 抽屉里的提示内容
- **Hybrid**：书页中央留 `safeArea = [12,10,76,82]`（百分比，相对书页容器）给 DOM 文字；侧标签 5 个图标可以是 SVG（DOM 控制 active）。

### 0.3 Command Bar（底栏，仅部分章节出现）

```
            ┌────────────┐
   [↺ back] │  EXAMINE   │   [↻ reset]
            └────────────┘
```

- **Image Asset**: 主操作的"铭牌"按钮（铜质边框 + 雕花）做成一张 9-slice 的 `chrome/brass-plaque.webp`，DOM 控制内部文字。
- **DOM Zone**: 按钮文字（EXAMINE / RUN / MERGE / SEARCH ARCHIVE / RESET / 显示心意 等）、点击 handler、disabled 态。

---

## 1. Chapter 1 · The Cozy Cabin（口琴 + 木门锁）

### 主图
- 整面木桌面 + 远处壁炉火光 + 油灯（右上）+ 玫瑰装饰（右下）→ **`chapter-1/plate.webp`**（场景底板）
- 黄铜口琴静物 → **`chapter-1/harmonica.webp`**（透明 PNG，桌面上的实物）
- 旧乐谱纸（标题"Melody"手写 + 五线谱 + 音符）→ **`chapter-1/score-paper.webp`**（已迁入；当前是 `score-paper.png`）
- 木门 + 黄铜机械锁外壳（含 4 个圆形锁孔金属边框、铰链、门把手）→ **`chapter-1/door-lock-shell.webp`**
- "For you, on your birthday" 小卡片 → **`chapter-1/cabin-note.webp`**（可选；也可纯 CSS）
- "OBJECTIVE" + "HINT" 蓝色铭牌 → 用共用 chrome 的 brass-plaque，不单独做

### DOM
- **4 位密码滚轮的数字**：图片提供圆形金属凹槽，DOM 渲染数字 0-9 + 上下箭头按钮。
  - safeAreas: `wheel-1 [22,40,12,30] / wheel-2 [38,40,12,30] / wheel-3 [54,40,12,30] / wheel-4 [70,40,12,30]`（数值待按真实图调整）
- **音符高亮**：乐谱 paper 用图片，但每个音符 token 用 DOM `<span>` 叠在 paper 上，便于 `is-active`/`is-key` class 切换。
  - safeArea: `notes-area [8,20,84,55]`
- **"试吹一遍" 按钮**：图片乐谱右上角的金属小按钮 → DOM `<button>` + brass-plaque 背景
- **"转动门锁" / "重置门锁"**：底部 command bar
- **书页内章节正文**：共用 chrome
- **OBJECTIVE 文字 / HINT 文字**：共用 chrome

### 层叠（从下到上）
1. plate.webp（底板）
2. score-paper.webp（绝对定位）
3. harmonica.webp（绝对定位 + 微旋转）
4. door-lock-shell.webp（绝对定位）
5. DOM：4 滚轮数字、音符 span、按钮
6. FX 层（点亮态发光、锁齿轮旋转动画）
7. Success 层（门缝透光叠图）

---

## 2. Chapter 2 · The Guard's Testimony（守卫推理桌）

### 主图
- 木桌 + 玫瑰 + 蜡烛（右上）+ 旧书堆（右上角）+ 羽毛笔 → **`chapter-2/plate.webp`**
- 7 张羊皮纸卡的**卡框**（破损纸边 + 圆形剪影框 + 底部 4 个圆形蜡封槽位）→ **`chapter-2/guard-card-frame.webp`**（单张 sprite，复用 7 次）
- 7 个守卫剪影（A-G 各异，半身 silhouette）→ **`chapter-2/guard-silhouettes.webp`** 或 7 个独立 sprite
- 蜡封标记（绿色 ✓ / 红色 × / 灰色 ○ 三态各一张）→ **`chapter-2/wax-marker-{truth,lie,unknown}.webp`**
- 黄铜骑士徽章（右下方圆形雕花章）→ **`chapter-2/knight-badge.webp`**
- "YOUR CURRENT ASSUMPTIONS" + "LOGIC NOTES" 底部木质推理板 → **`chapter-2/logic-board.webp`**

### DOM
- 每张卡的证词文字（A: 黄金在 A 或 B 的身后 …）—— 落在卡框 `safeArea = [10,40,80,35]`
- 卡上 4 个状态切换按钮（真/谎/待定/选中）—— 落在卡底 `safeArea = [10,80,80,18]`
- 守卫字母标签 A-G —— 卡顶 `safeArea = [40,5,20,15]`
- 底部 "ABCDEFG" 7 槽位的标记切换 —— logic-board 上 `safeArea = [10,30,55,50]`
- "CHECK LOGIC" 按钮 —— logic-board 右侧 brass-plaque
- "KNIGHT BADGE — Assign to a guard to mark your assumption" 文字 —— badge 右侧
- 提交按钮（把徽章交给 G）—— DOM 触发 onSubmit

### 层叠
1. plate
2. logic-board（底部固定）
3. 7× guard-card-frame（grid 排列）
4. 7× guard-silhouette（卡内）
5. knight-badge（右下，可拖拽）
6. DOM：证词文字、标记按钮、字母标签、提交
7. FX：选中卡 lift、徽章 glow
8. Success：G 守卫高亮 + 金币/利是飘入 PROPS 槽

---

## 3. Chapter 3 · Coder Paradise（终端工作流）

### 主图
- 木桌 + 油灯 + 玫瑰 + 旧书堆（右上）→ **`chapter-3/plate.webp`**
- 黄铜框架的复古 CRT 终端（含散热孔、铭牌、操控钮、绿色屏幕玻璃）→ **`chapter-3/terminal-shell.webp`**
- 屏幕玻璃的反光/扫描线效果 → **`chapter-3/screen-glass.webp`**（半透明 overlay）
- 5 个木质 pipeline 节点卡（含图标插画 REQ/DESIGN/CODE/TEST/RELEASE/GIFT）→ **`chapter-3/pipeline-tile.webp`**（单 sprite 复用）+ 6 个独立 icon
- 5 个角色 token（PRODUCT/ARCHITECT/CODER/TESTER/MANAGER 圆形铜章 + 剪影）→ **`chapter-3/role-token.webp`** + 5 个独立 silhouette
- "BUILD STATUS" 木质侧板（含 Design/Coding/Testing/Release 列表）→ **`chapter-3/build-status-panel.webp`**
- 大圆形 RUN 红色按钮 → **`chapter-3/run-button.webp`** 或纯 CSS
- 底部 "Assign the right role to repair the workflow" 卷轴样铭牌 → 共用 brass-plaque

### DOM
- 屏幕文字（多行 mono：`Initializing workflow…` / `Restoring magical pipeline…` / `Status: INCOMPLETE` / `Build complete!`） —— safeArea `screen [20,15,60,55]`
- pipeline 节点的状态 class（`is-passed` / `is-blocked` / `is-current`） + 拖拽顺序
- 节点排序按钮（↑↓）
- 角色 token 上的 label（PRODUCT 等）—— safeArea `token-label [10,75,80,20]`
- 角色 → 节点的分配交互（drag-drop 或 select）
- "BUILD STATUS" 列表的 `INCOMPLETE` / `PASSED` / `FAILED` 文字 + color class
- RUN 按钮 onClick
- 状态信息条（运行中说明文字）

### 层叠
1. plate
2. terminal-shell
3. screen-glass（半透明 overlay）
4. build-status-panel（右侧）
5. 5× pipeline-tile（中央 grid，可拖动重排）
6. 5× role-token（底部，可拖到节点）
7. run-button
8. DOM：屏幕文字、节点状态、status 列表内容、token label、按钮
9. FX：节点闪烁/高亮、终端扫描线、success 时 RUN 绿光
10. Success：屏幕显示 `Build complete!` + 砖头手机滑入 PROPS

---

## 4. Chapter 4 · The Distant Call（Nokia 砖头）

### 主图
- 木桌 + 钩花布（手机底下的圆形 doily）+ 旧书堆 + 玫瑰 + 油灯 → **`chapter-4/plate.webp`**
- Nokia 3210 手机正面（外壳 + 屏幕黑色矩形 + 12 键键盘金属凹槽）→ **`chapter-4/nokia-front.webp`**
- Nokia 3210 背面（带"LOVE"刻字 + 摄像头位 + 标签）→ **`chapter-4/nokia-back.webp`**
- 屏幕玻璃反光 → **`chapter-4/screen-glass.webp`**
- 12 个 keypad 凹槽（在 nokia-front 内已含；可独立做 sprite 用于发光态）→ **`chapter-4/keypad-panel.webp`**
- 怀表（左下，氛围道具）→ **`chapter-4/pocket-watch.webp`**（共用，第 5 章也出现）
- 羽毛笔（共用资产，可放 chrome 目录）
- 小纸条带 4 个国家缩写 + 装饰点阵 → **`chapter-4/country-code-strip.webp`**

### DOM
- 屏幕内容（4 个空格密码 / "密码错误" / "1 个未接来电" / "正在回拨") —— safeArea `screen [20,15,60,18]`
- 12 个按键 onClick handlers + 主标数字 + 副标字母 —— safeArea `keypad [10,40,80,45]`，每键再切 12 个子 safeArea（或直接 DOM grid 叠加在 keypad-panel 上）
- 翻面按钮（DOM `<button>` 在 phone 下方或独立位置）
- "长途漫游区号列表" 文案（DOM）
- 国家代码（USA +872 / JPN +576 / CHN +246 / HKG +454）的文字内容 —— safeArea `codes [10,15,80,75]` 落在 country-code-strip 上
- 提示文案（"背面的字母…"）

### 层叠
1. plate
2. country-code-strip（右侧斜放）
3. nokia-back / nokia-front（CSS transform 翻面切换；同一容器内 z-index 切换或 `rotateY`）
4. screen-glass（半透明 overlay 仅在正面上）
5. pocket-watch（左下，纯装饰）
6. DOM：12 键按钮（叠在 keypad-panel 上）、屏幕文字、国家代码、翻面按钮
7. FX：按键下压 transform、错误时手机震动、解锁后屏幕发光
8. Success：屏幕显示未接来电 + 回拨

---

## 5. Chapter 5 · Moonlit Chase（路径追踪）

### 主图
- 木桌 + 怀表（左下，本章主角）+ 油灯 → **`chapter-5/plate.webp`**
- 大张羊皮纸地图（含手绘迷宫小径 + 月亮 + 远处身影 + 河流 + 树 + 桥）→ **`chapter-5/chase-map.webp`**（**这一张是本章最重要资产**）
- 4 个方向标志（角落小卡，带 ↑↓←→ 雕版）→ **`chapter-5/direction-marker.webp`** 或纯 CSS 圆形
- 怀表特写（已在 plate；如需互动则独立）→ **`chapter-5/pocket-watch.webp`**
- 罗盘表盘（含表针）→ **`chapter-5/compass-gauge.webp`**（表针单独 sprite 便于旋转）
- 3 个方向按钮的木质铭牌（←/↑/→ 雕花）→ **`chapter-5/direction-button.webp`** 复用 3 次
- "PROGRESS" 蓝色铭牌 → 共用 chrome
- 树枝装饰（右下） → **`chapter-5/twig.webp`**

### DOM
- 当前线索文字（章节状态描述：「泥土上最新的脚印偏向右侧…」）—— safeArea `clue-strip [15,75,70,15]` 落在地图底部或右下卡片
- 倒计时数字（"6s"）—— safeArea `watch-dial [10,15,15,15]` 落在 pocket-watch 表盘中央
- 进度条（5 步追踪进度）—— PROGRESS 铭牌内
- 失误计数（"失误 1/3"）
- 3 个方向按钮 onClick + label —— 落在 direction-button 上（safeArea `label [10,30,80,40]`）
- 已追踪步骤的可视化（5 个小方块，已追踪/当前/未知）

### 层叠
1. plate
2. chase-map（绝对定位主区）
3. 4× direction-marker（地图四角）
4. pocket-watch + compass-gauge（左下角，独立组）
5. direction-button × 3（底部 grid）
6. DOM：线索文字、倒计时数字、进度条、失误计数、按钮 label
7. FX：进度脉冲、倒计时排空动画、错误时距离拉开提示
8. Success：女生身影变清晰 + 挂饰掉落 + 进入 PROPS

---

## 6. Chapter 6 · Two Halves, One Promise（双剑挂饰）

### 主图
- 木桌 + 蜡烛 + 玫瑰 + 旧书堆（右上） → **`chapter-6/plate.webp`**
- 深蓝丝绒首饰托盘（含金属花纹外框 + 心形虚线轮廓内凹槽）→ **`chapter-6/velvet-tray.webp`**
- 两片银色剑形挂饰（带链条；左剑朝右、右剑朝左）→ **`chapter-6/pendant-left.webp`** + **`chapter-6/pendant-right.webp`**（透明 PNG）
- 链条（独立 sprite，可与 pendant 分离便于动画）→ **`chapter-6/chain.webp`**
- 蜡烛火光（右上） → 含在 plate 或独立 → **`chapter-6/candle-flame.webp`**
- 4 个底部控制木牌（ROTATE / FLIP HORIZONTAL / FLIP VERTICAL / INSCRIPTION） → **`chapter-6/control-tile.webp`** 复用
- 右下小纸条 "Some pieces… need to be heard before they can be felt" → **`chapter-6/whisper-note.webp`**
- 黄铜 MERGE 按钮 → 共用 brass-plaque

### DOM
- 两片 pendant 的旋转角度（CSS `transform: rotate(deg)`）
- 翻面状态（`scaleX(-1)`）
- 拖拽到槽位的逻辑
- 4 个控制按钮的文字 label + onClick —— safeArea `label [10,55,80,40]` 落在 control-tile 上
- 状态信息文字（"两瓣挂饰冰凉地躺在手心里…"） —— DOM 文字落在丝绒托盘上方或下方留出的 safeArea
- INSCRIPTION 显影后的铭文文字 —— safeArea `inscription [25,40,50,20]` 落在合拢后的 pendant 上
- "MERGE" 按钮

### 层叠
1. plate
2. velvet-tray（中央托盘）
3. 心形虚线轮廓（含在 tray 内 OR 单独 SVG，方便 outline 显示/隐藏）
4. chain × 2（吊挂时显示）
5. pendant-left / pendant-right（绝对定位 + transform 控制）
6. candle-flame（右上独立动画）
7. control-tile × 4（底部 grid）
8. brass-plaque MERGE 按钮
9. DOM：按钮 label、状态文字、INSCRIPTION 显影文字
10. FX：磁吸吸附、合拢闪光、INSCRIPTION 渐现
11. Success：两瓣合心形 + 借阅卡掉落

---

## 7. Chapter 7 · The Borrowed Words（图书馆借阅卡）

### 主图
- 木桌 + 蜡烛 + 玫瑰 + 旧书堆 + 油灯 → **`chapter-7/plate.webp`**
- 黄铜框的木质目录柜（3 列抽屉：YEAR / CATEGORY / KEYWORD；每抽屉显示卡片 stack）→ **`chapter-7/catalog-cabinet.webp`**
- 抽屉内每张卡片的样式（顶部黄色书脊 + 标签）→ **`chapter-7/drawer-card.webp`**（单 sprite 复用）
- 借阅卡（泛黄纸 + "WONDERLAND PUBLIC LIBRARY" 印章 + 表单线 + "Chloe L." 手写签名）→ **`chapter-7/library-card.webp`**
- 黄铜放大镜（盖在卡上） → **`chapter-7/magnifying-glass.webp`**（半透明 + 镜中放大效果可简化）
- 羽毛笔 + 墨水 → **`chapter-7/quill.webp`**（chrome 共用）
- 右下纸条（"Archive Note ✓ Latin script / ✓ Confessions ✓…"） → **`chapter-7/archive-note.webp`**
- 底部铭牌 SEARCH ARCHIVE + RESET → 共用 brass-plaque

### DOM
- 年份拨轮（10 个 0-9 按钮选 200_ 最后一位）—— safeArea `year-picker [22,60,15,8]` 落在借阅卡 `Year:` 行
- 类别 / 关键词 文字（"反差" / "将军"）—— safeArea `category [60,50,25,8]`，`keyword [60,55,25,8]`
- 标题填空 input（`我用 ____ 报答爱`）—— safeArea `title-blank [40,68,20,8]`
- 三个筛选 toggle（YEAR / CATEGORY / KEYWORD）—— 落在抽屉顶 plaque
- 目录搜索结果列表（多张候选卡片）—— safeArea `directory-list [55,30,40,55]` 落在抽屉内
- 选中卡片高亮 / 详情
- SEARCH / RESET 按钮文字

### 层叠
1. plate
2. catalog-cabinet（右上）
3. drawer-card × N（抽屉内目录）
4. library-card（中下）
5. magnifying-glass（叠在 card 上半，可有视觉放大效果但不必真放大）
6. quill + archive-note（装饰）
7. DOM：年份按钮、类别/关键词、input、toggle、目录列表
8. FX：放大镜区域字体放大、年份拨轮高亮、卡片选中态
9. Success：印章盖下 + 卡上字迹浮现 + "所有" 二字闪现 → PROPS 槽

---

## 8. Chapter 8 · The Final Chapter（月光显影卡）

### 主图
- 木桌（冷色调，蓝紫月光氛围）+ 玫瑰花瓣散落 + 羽毛笔（右下） → **`chapter-8/plate.webp`**
- 窗框（右上）+ 透光月亮 → **`chapter-8/window-moon.webp`**
- 斜射进来的月光束（半透明锥形）→ **`chapter-8/moonbeam.webp`**（关键道具，需要根据 slider 控制 opacity）
- 白色卡片（带手写字 / 浮影字迹）→ **`chapter-8/moon-card.webp`**（**正面 base**，半透明字迹由 DOM 叠）
- "月光记录" + "调节角度，揭示隐藏的字句" 蓝铜铭牌（右上） → 共用 brass-plaque（或独立 `chapter-8/log-plaque.webp`）
- 月光角度 slider 的黄铜底座（含月相图标） → **`chapter-8/slider-base.webp`**
- 滑杆的 indicator 圆球 → **`chapter-8/slider-thumb.webp`**
- 卡片背面预览小卡（右下角） → **`chapter-8/back-preview.webp`**
- "揭示心意" 黄铜铭牌 → 共用 brass-plaque

### DOM
- 卡片上 2 句留白文字 —— safeAreas `line-1 [10,30,80,15]` / `line-2 [10,50,80,15]`，DOM 渲染随 lightLevel 渐显的内容
- 卡片背面文字（翻面时显示）—— 同 safeArea
- "余___" / "余生___" 两个输入框 —— 当前在 puzzle 下方区，可改造为直接落在卡片上的两个填空 input
- 月光 slider 控件 —— safeArea `slider-rail [10,40,80,20]` 落在 slider-base，DOM `<input type="range">` 控制
- 4 个 25/55/80/100 % 快捷按钮 —— safeArea `quick-steps [10,75,80,20]`
- 翻面按钮
- "揭示心意" 提交按钮

### 层叠
1. plate（冷色调）
2. window-moon（右上）
3. moonbeam（半透明对角线，opacity 跟随 lightLevel）
4. moon-card（中央，带 CSS tilt）
5. back-preview（右下小卡）
6. slider-base（底部独立组件）
7. log-plaque（右上）
8. DOM：卡片上 2 行渐显文字 + 2 个 input、slider、快捷按钮、翻面、提交
9. FX：moonbeam opacity 跟 slider 联动、字迹 letter-by-letter 显影、卡片轻微 tilt
10. Success：兑换券从月光中浮现（独立 voucher.webp）

---

## 跨章资产复用清单

避免每章重复制作：

| 资产 | 出现章节 | 建议位置 |
|---|---|---|
| 油灯 | 1, 2, 3, 5, 7 | `chrome/oil-lamp.webp` |
| 羽毛笔 + 墨水 | 2, 4, 5, 7, 8 | `chrome/quill.webp` |
| 玫瑰花（红） | 1, 2, 3, 4, 6, 7, 8 | `chrome/rose.webp`（带几种角度 sprite） |
| 蜡烛 + 火光 | 2, 6 | `chrome/candle.webp` |
| 怀表 | 4, 5 | `chrome/pocket-watch.webp` |
| 旧书堆 | 2, 3, 4, 7 | `chrome/book-stack.webp` |
| 木桌纹理 | 所有 | `chrome/desk-plate.webp` 作为各章 plate 的底层 |
| 黄铜铭牌（OBJECTIVE / HINT / EXAMINE / MERGE 等） | 所有 | `chrome/brass-plaque.webp` 9-slice |

---

## 下一步建议

1. **先做 chrome 共用资产**（HUD bar / storybook frame / brass-plaque）。这一层 8 章共用，做对一次受益 8 倍。**第一章 vertical slice 在 chrome 完成后才能正确落地**，否则只能做局部 puzzle 而看不到整体效果。
2. **Chapter 1 仅需 5 张图**（plate / harmonica / score-paper / door-lock-shell / cabin-note），最适合作为模板验证 manifest + 五层 + safeAreas 三件事一起跑通。
3. **资产生成 prompt** 必须强调"无文字、无按钮、无 UI 元素"。任何 chrome 文字（如 HUD 的 PROPS / OBJECTIVE / HINT / EXAMINE / MERGE）都必须 DOM 渲染，不准烘焙到图里。
4. **当前布局差距来源**：现在的实现把所有内容堆在一个白色 storybook 卡 + 右侧白卡里，没有"桌面 + 道具"的视觉层次。要追上参考图，**必须先落 chrome 的 plate + 书框两张图**，然后再做章节道具。否则每章局部再精致，整体仍然像表单。
