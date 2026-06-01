# Chloe in Wonderland AI 出图 Prompt

## 通用规则（每条 prompt 都隐含）

**正向**：
- 风格：dark academia storybook, candlelit, painterly digital illustration, romantic
- 材质：aged paper, dark walnut wood, antique brass, deep emerald green, oxblood leather
- 光照：warm tungsten lamp light, soft shadow, slight bokeh
- 渲染：high detail, photoreal-ish hybrid illustration, no flat vector

**负向（NEVER）**：
- ❌ no text, no letters, no typography, no numbers, no digits, no fake UI text
- ❌ no buttons, no fake UI panels, no icons, no app interface
- ❌ no human faces (real or photorealistic); silhouettes only if needed
- ❌ no logos, no brand marks, no watermarks
- ❌ no people in the scene
- ❌ no flat cartoon, no anime, no chibi
- ❌ no neon, no purple gradient, no synthwave colors

**交付规范**：
- 透明背景的道具：PNG with alpha
- 场景/底板：JPG/WebP，无透明
- 命名按 `docs/design/asset-zones.md` 章节目录
- 尺寸：道具长边 ≤ 1024px @1x；底板长边 ≤ 1600px @1x
- 单张 ≤ 200 KB（webp -q 80），整章合计 ≤ 1.5 MB

---

## Chrome 共用资产（先做这 3 张，受益 8 倍）

### `chrome/desk-plate.webp` — 木桌底板

> dark walnut wood desk surface, slightly aged with scratches and warm tungsten lamp light bleeding from upper-right corner, deep brown to almost-black gradient toward edges, subtle vignette, no objects on desk, just the empty wood texture, photoreal illustrated style, 1600x1000, horizontal

负向特注：无任何道具、纸张、装饰，**纯桌面**（其他物品由后续叠图）

---

### `chrome/storybook-frame.webp` — 打开的旧书外框

> an open antique storybook lying flat on a dark wood desk, oxblood leather binding with embossed gold filigree pattern, silk ribbon bookmark draped from the spine, two open pages of aged cream parchment with subtle deckled edges and a faint floral watermark in the lower-left corner, a small brass heart-shaped lock dangling from the bottom of the spine, five small embossed brass tab bookmarks along the right edge each with a tiny iconographic shape (knight, key, gear, heart, diamond), candlelit warm shadow under the book, photoreal illustrated, 1200x900

DOM 占位：书页中央 80% 区域必须**完全空白**，仅显示纸纹和水印；DOM 文字会渲染在上面。

---

### `chrome/brass-plaque.webp` — 9-slice 黄铜铭牌

> a small ornate antique brass nameplate, deep emerald green inset rim, polished brass border with engraved scrollwork at the corners, completely blank center polished metal surface, sitting on dark wood, soft candlelight, photoreal product shot, 600x180, transparent background

负向特注：**中央必须完全空白**（DOM 会填入文字）；不要任何刻字或线条装饰在中央区域。

---

### `chrome/hud-bar.webp` — 顶部 HUD 横条

> a horizontal antique brass and dark emerald enamel control bar styled like an old display case panel, ornate art-nouveau filigree along the top edge, tiny empty circular brass slots evenly spaced in the right portion (for icons to be placed later), a row of small heart-shaped empty indicator wells in the center portion, all surfaces completely blank inside the slots and indicators, deep navy-emerald background with brass trim, horizontal tile, 1600x96, transparent background

负向特注：所有槽位、心形、左侧标题区**完全空白**；不要任何字母、数字、图标。

---

## Chapter 1 资产（5 张）

### `chapter-1/plate.webp` — 第一章桌面

> dark wood cabin tabletop, warm fireplace glow bleeding in from the upper-right corner casting amber light across the wood, a small brass oil lamp glowing softly in the far right edge, a few wilting rose petals scattered in the lower-right, no other objects, romantic painterly, 1600x1000

---

### `chapter-1/harmonica.webp` — 口琴道具

> a vintage hohner-style harmonica with polished brass reed plates and dark wooden comb, lying at a slight angle, top-down 3/4 view, completely isolated on transparent background, reflective metal highlights from warm lamp light, photoreal product still life, no engraving text visible, 600x300, transparent PNG

---

### `chapter-1/score-paper.webp` — 旧乐谱纸

> a torn rectangular piece of aged cream parchment with subtle deckled edges, the upper portion shows a hand-drawn cursive title flourish (no readable words, just decorative ink swashes), the body of the paper is **completely blank** so musical notes can be overlaid as DOM text, faint horizontal staff lines drawn very lightly so they read as background, warm candlelight, slight curling at corners, top-down view, transparent background, 700x500

负向特注：**禁止画出任何音符、数字、字母**。只要纸 + 五线谱底纹 + 装饰性墨迹 swash。所有音符由 DOM 渲染。

---

### `chapter-1/door-lock-shell.webp` — 木门 + 黄铜锁外壳

> a small section of an aged wooden cabin door, dark walnut planks with visible grain and iron rivets, centered on the door is an ornate brass combination lock plate with four large empty circular dial sockets arranged in a row, the sockets are deeply recessed empty brass rings (no numbers inside), a brass handle at the bottom-right, the lock body has decorative scrollwork around the edges, warm candlelight from the left, photoreal product render, 800x900, transparent background around the door edges

负向特注：**4 个锁孔内必须完全空白**（数字将由 DOM 渲染叠在凹槽中央）。

---

### `chapter-1/cabin-note.webp` — 小卡片

> a small handmade paper card, slightly torn deckled edges, aged cream color with faint floral border, **completely blank center**, lying at a slight diagonal on dark wood, soft warm candlelight, photoreal still life, 350x230, transparent background

负向特注：**禁止任何手写文字**；"For you, on your birthday" 由 DOM 渲染。

---

## 后续章节 prompt（占位，等 Chapter 1 validated 后再细化）

按 `docs/design/asset-zones.md` §2-§8 的资产清单逐章扩展。建议先把 Chapter 1 这 5 张图 + 4 张 chrome 共 9 张图跑通，验证 manifest + safeArea + DOM 叠合无问题再批量生成其他章节。

---

## 出图工作流

1. 把上面 prompt 复制到所选 AI 图工具（Midjourney v6 / SDXL / Nano Banana / DALL·E 3 都可以）。
2. 生成多张候选，**人工逐张验证**：放大看是否有假文字 / 假按钮 / 模糊错字。任何残留必须重生成或 PS 擦除。
3. 透明背景的道具：用 `remove.bg` 或 SD 的 alpha 输出。
4. 压缩：`cwebp -q 80 -alpha_q 90 input.png -o output.webp`。
5. 落地到 `src/assets/chapters/chapter-N/<role>.webp`。
6. 在 `src/assets/chapters/manifest.ts` 注册新的 `ChapterAsset` 条目。
