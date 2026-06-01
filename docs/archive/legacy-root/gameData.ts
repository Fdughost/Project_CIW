/**
 * 游戏数据结构和关卡定义
 * 梦幻童话风格设计：柔和的紫罗兰色与暖金色
 */

export interface GameChapter {
  id: number;
  title: string;
  story: string;
  puzzleType: "password" | "choice" | "fill" | "harmonica";
  puzzleQuestion: string;
  answer: string | string[];
  hint?: string;
  backgroundColor: string;
  accentColor: string;
  imageUrl?: string;
}

export const chapters: GameChapter[] = [
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
    imageUrl: "/music-score.png",
    puzzleType: "password",
    puzzleQuestion: "根据口琴简谱推导四位密码。",
    answer: "7564",
    hint: "试着吹吹口琴",
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

A： "黄金不在 C 的身后。"
B： "黄金在 E 或 F 的身后。"
C： "A 刚才说的是真话。"
D： "黄金在我的身后。"
E： "B 说的是谎话。"
F： "黄金不在 A 的身后，也不在 D 的身后。"
G： "C 是一个无赖。"

"我觉得其中只有一个是真正的骑士，其他都是伪装成骑士的无赖。"Alex 说道。

你应该选择哪位守卫？`,
    puzzleType: "choice",
    puzzleQuestion: "根据逻辑推理，找出唯一的骑士。",
    answer: "G",
    hint: "A和C的话是不是有点自相矛盾？",
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
    puzzleType: "password",
    puzzleQuestion: "管理请输入密码以继续。",
    answer: "0222",
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
    puzzleType: "password",
    puzzleQuestion: "请输入四位密码。",
    answer: "5683",
    hint: "这可是诺基亚3210哦",
    imageUrl: "/nokia.png",
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
puzzleType: "password",
puzzleQuestion: "管理请输入密码以继续。",
answer: "0222",
backgroundColor: "from-blue-50 to-purple-100",
accentColor: "text-blue-700",
  },
  {
    id: 6,
    title: "第六章 双剑合璧",
    story: `"叮～" 逃跑女生的脚下，掉下了一个银色的挂饰。

你走上前去，拾了起来。

这样……那样……哦～我明白了！

  `,
  puzzleType: "password",
  puzzleQuestion: "管理请输入密码以继续。",
  answer: "0222",
  backgroundColor: "from-blue-50 to-purple-100",
  accentColor: "text-blue-700",
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
    puzzleType: "fill",
    puzzleQuestion: "根据借阅卡的信息推导答案。",
    answer: ["8", "所有"],
    hint: "大文豪的🏆作品。",
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
    puzzleType: "fill",
    puzzleQuestion: "请填写空格处的两个词语。",
    answer: ["余光是你", "余生也是你"],
    hint: "卡片仔细再看看",
    backgroundColor: "from-purple-100 to-pink-100",
    accentColor: "text-purple-700",
  },
];

export const getChapter = (id: number): GameChapter | undefined => {
  return chapters.find((ch) => ch.id === id);
};

export const getTotalChapters = (): number => {
  return chapters.length;
};

