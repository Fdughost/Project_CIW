/**
 * 游戏数据结构和关卡定义
 * 梦幻童话风格设计：柔和的紫罗兰色与暖金色
 */

import type { AnswerValidationOptions, SubmittedAnswer } from "./answerValidation";

type PuzzleType =
  | "harmonicaLock"
  | "guardLogic"
  | "workflowRepair"
  | "nokiaKeypad"
  | "chasePath"
  | "pendantMerge"
  | "libraryCard"
  | "cardReveal";

interface BaseChapter<TPuzzleType extends PuzzleType, TAnswer extends SubmittedAnswer> {
  id: number;
  title: string;
  story: string;
  puzzleType: TPuzzleType;
  puzzleQuestion: string;
  answer: TAnswer;
  validation?: AnswerValidationOptions;
  hints?: string[];
  backgroundColor: string;
  accentColor: string;
}

export type GameChapter =
  | BaseChapter<"harmonicaLock", string>
  | BaseChapter<"guardLogic", string>
  | BaseChapter<"workflowRepair", string>
  | BaseChapter<"nokiaKeypad", string>
  | BaseChapter<"chasePath", string[]>
  | BaseChapter<"pendantMerge", string>
  | BaseChapter<"libraryCard", string[]>
  | BaseChapter<"cardReveal", string[]>;

export const chapters = [
  {
    id: 1,
    title: "第一章 空之轨迹",
    story: `醒醒……醒醒……你没事吧？

你醒了，躺在床上，眼前是一个小木屋，有个壁炉烤着火，发出滋滋的声音。

"我叫 Alex，你已经在这里昏睡了一整天了"

"为什么我会在这里？"你问道。

"我也不知道，让我们看看怎么出去吧。"

这时候你才发现，木屋的门被锁了。锁上有个四位密码：

___ ___ ___ ___

你搜寻四周，只有一把口琴，它吹起来是这样的……`,
    puzzleType: "harmonicaLock",
    puzzleQuestion: "根据口琴简谱推导四位密码。",
    answer: "7564",
    hints: [
      "口琴不是装饰，先试着吹一遍。",
      "留意乐谱里被火光描深的几个音。",
      "四位密码来自四个被强调的音符，按出现顺序读取。",
    ],
    backgroundColor: "from-purple-100 to-yellow-50",
    accentColor: "text-purple-700",
  },
  {
    id: 2,
    title: "第二章 谁是骑士？",
    story: `木门打开了，世界豁然开朗。

你和 Alex 身处一个山谷之中。眼前的景象美极了。天蓝的像宝石一样，绿色的草甸延绵不绝，远处有几头牛低头吃草。

"我们该往哪走？"Alex 问。

你环顾四周，只有一条泥土路，通向一棵大树。

"好像只能走这条吧。"你说。

走到大树底下，你面前站着 7 位守卫，姿态各异。每个守卫上面都有一行小字：

A： "黄金在 A 或 B 的身后。"
B： "黄金在 C 或 D 的身后。"
C： "黄金在 E 或 F 的身后。"
D： "黄金不在 G 的身后。"
E： "黄金在 B 或 E 的身后。"
F： "黄金在 A 或 C 的身后。"
G： "黄金就在我的身后。"

"我觉得其中只有一个是真正的骑士，其他都是伪装成骑士的无赖。"Alex 说道。

你应该选择哪位守卫？`,
    puzzleType: "guardLogic",
    puzzleQuestion: "根据逻辑推理，找出唯一的骑士。",
    answer: "G",
    validation: {
      aliases: ["g"],
      caseSensitive: false,
    },
    hints: [
      "规则只允许一个守卫说真话。",
      "每次只假设黄金在一个守卫身后，数一数真话数量。",
      "假设黄金在 G 身后时，A-F 都为假，只有 G 为真。",
    ],
    backgroundColor: "from-green-50 to-purple-100",
    accentColor: "text-green-700",
  },
  {
    id: 3,
    title: "第三章 码农天堂",
    story: `你转动了 G，背后果然出现了一枚黄金硬币和一个新年利是。

"哈哈，还是你聪明。"Alex 由衷赞佩。

你拾起硬币，骑士面前的石板突然缓缓抬升。

哈，是一台电脑。

你打开电脑，里面忽的出现了一个小人。

"Hi，我是这里的主管"，小人说，"我管理这里所有的码农"

"码农？"你问道。

"是的，码农"自称主管的人说道，"今天是我的生日，我想让这些码农给我做一个生日礼物"

"哈～我也是"你回答道。

"不过，我遇到了点小小的技术问题，你帮我看一下。"主管突然话锋一转，开始命令起你来了。

你凑近看，原来小人的工作流程出了问题。

"这个简单，我来调整一下！"你说。

`,
    puzzleType: "workflowRepair",
    puzzleQuestion: "调整码农工作流，让生日礼物顺利发布。",
    answer: "workflow-complete",
    hints: [
      "礼物要先有需求，再进入后面的工序。",
      "测试应该在发布之前，发布应该是最后一步。",
      "顺序是需求、设计、编码、测试、发布；负责人分别是产品、架构、码农、测试、主管。",
    ],
    backgroundColor: "from-blue-50 to-purple-100",
    accentColor: "text-blue-700",
  },
  {
    id: 4,
    title: "第四章 砖头",
    story: `"果然是 coding 小达人，佩服～佩服～"Alex 不知道什么时候已经站在你后面。

"诺，这是你要的东西"，主管说着，扔给了你一个砖头。

"我要的东西？"你一边说，一边接过那个砖头。

"Errrrr……确实是老古董了。"你一边吐槽，一边翻看这部手机。背面刻着 LOVE 四个单词。

你摆弄了一下，屏幕亮起。

"请输入四位密码，按井号结束。"

"看！它还可以拨长途"Alex 说道，"我看手机里有一个长途国家编号列表。"

果然，顺着 Alex 的指示，不解锁手机的情况下，你依然可以看到长途漫游电话的区号。

美国 USA +872
日本 JPN +576
中国 CHN +246
香港 HKG +454

"啊，原来如此！"你快速按下了开机密码……`,
    puzzleType: "nokiaKeypad",
    puzzleQuestion: "请输入四位密码。",
    answer: "5683",
    hints: [
      "背面的 LOVE 很重要。",
      "国家缩写和区号不是随机的，它们也在暗示字母如何转成数字。",
      "把 LOVE 按老手机键盘字母映射成数字。",
    ],
    backgroundColor: "from-yellow-50 to-orange-100",
    accentColor: "text-yellow-700",
  },
  {
    id: 5,
    title: "第五章 尾行",
    story: `手机解锁了，只有一条未接来电。

你打过去，电话通了。

"别……别追我！"电话那头是个女生，一边大喘气，一般叫道。

怎么回事？你看到远处有一个女生身影，你追上去想看个究竟……

一场紧张刺激的追逐开始了。你需要在迷宫般的小径中追上她。

请点击正确的方向来追踪她的足迹。`,
    puzzleType: "chasePath",
    puzzleQuestion: "根据沿途线索，连续选择正确方向追上她。",
    answer: ["right", "left", "forward", "right", "left"],
    hints: [
      "不要只看人影，注意她留下的最新痕迹。",
      "最新脚印、声音方向、断枝和反光都比远处影子更可靠。",
      "正确路线是右、左、前、右、左。",
    ],
    backgroundColor: "from-emerald-50 to-blue-100",
    accentColor: "text-emerald-700",
  },
  {
    id: 6,
    title: "第六章 双剑合璧",
    story: `"叮～" 逃跑女生的脚下，掉下了一个银色的挂饰。

你走上前去，拾了起来。

这样……那样……哦～我明白了！

  `,
    puzzleType: "pendantMerge",
    puzzleQuestion: "旋转并翻转两瓣挂饰，让它们双剑合璧。",
    answer: "pendant-complete",
    hints: [
      "它可能不只是挂饰，也是一枚可以合拢的图案。",
      "先把左右两瓣放进对应凹槽，再观察剑纹方向。",
      "左瓣转到 90°，右瓣翻面并转到 270°。",
    ],
    backgroundColor: "from-slate-50 to-purple-100",
    accentColor: "text-slate-700",
  },
  {
    id: 7,
    title: "第七章 借阅卡",
    story: `随着两瓣心房合拢，叮的一声，天上飘落了一张卡片。

你捡了起来，原来是一张借阅卡。

借阅卡看上去有点年头了，有几个字泛黄不清。

年份： 200_
类别： 反差
主题词： 将军
名字： 我用 _ _ 报答爱

"这张借阅卡上写的什么？"Alex 问你。

你心中若有所思。

请填写空格处的两个字。`,
    puzzleType: "libraryCard",
    puzzleQuestion: "根据借阅卡的信息推导答案。",
    answer: ["8", "所有"],
    hints: [
      "年份缺的是最后一位。",
      "目录柜里要同时对上年份、类别和主题词。",
      "答案是 2008 和「所有」。",
    ],
    backgroundColor: "from-amber-50 to-yellow-100",
    accentColor: "text-amber-700",
  },
  {
    id: 8,
    title: "第八章 莫奈的画",
    story: `"18 年前，你用'所有'报答爱；18 年后，换我用'余生'来回应你的'所有'。生日快乐，我的大作家。"Alex 转头对你说道。说完，他从口袋里抽出一张卡片递给你。

"这是最后一道谜题了。"

余 _ _ _
余生 _ _ _

"别看了，莫奈没说过这句话。"

请填写两句话中的空格。`,
    puzzleType: "cardReveal",
    puzzleQuestion: "请填写空格处的两个词语。",
    answer: ["余光是你", "余生也是你"],
    hints: [
      "不是名人名言，先看卡片本身。",
      "第一句从「余光」开始。",
      "两句完整答案是「余光是你」和「余生也是你」。",
    ],
    backgroundColor: "from-purple-100 to-pink-100",
    accentColor: "text-purple-700",
  },
] satisfies GameChapter[];

export const getChapter = (id: number): GameChapter | undefined => {
  return chapters.find((ch) => ch.id === id);
};

export const getTotalChapters = (): number => {
  return chapters.length;
};
