const expandedRecipes = [
  {
    id: 'aviation',
    type: 'recipe',
    name: '飞行',
    enName: 'Aviation',
    aliases: ['飞行鸡尾酒', 'aviation'],
    base: '金酒',
    tags: ['花香', '酸甜', '进阶', '经典', '优雅'],
    reason: '适合喜欢金酒草本、柠檬酸和紫罗兰花香的人，颜色漂亮但味道不轻浮。',
    flavor: { sweet: 2, sour: 4, alcohol: 4, fresh: 4, difficulty: 4 },
    materials: {
      standard: ['金酒 45ml', '樱桃利口酒 15ml', '柠檬汁 15ml', '紫罗兰利口酒 5ml', '冰块'],
      convenience: ['金酒', '樱桃利口酒', '柠檬汁', '冰块'],
      simple: ['金酒', '柠檬汁', '少量糖浆']
    },
    steps: ['摇壶加入所有材料和冰块。', '充分摇冷后过滤入杯。', '用樱桃或柠檬皮点缀。'],
    scenes: ['进阶尝试', '约会', '不想喝太甜', '酒吧经典'],
    substitutes: ['没有紫罗兰利口酒也能做，只是少一点花香和蓝紫色。', '樱桃利口酒可少量替换成樱桃糖浆，但酒体会变轻。', '觉得酸就加 5ml 糖浆。'],
    warnings: ['紫罗兰利口酒很抢味，只需要少量。'],
    similar: ['dry-martini', 'clover-club', 'french-75']
  },
  {
    id: 'bees-knees',
    type: 'recipe',
    name: '蜂之膝',
    enName: "Bee's Knees",
    aliases: ['蜂膝', '蜂蜜金酒酸', "bee's knees", 'bees knees'],
    base: '金酒',
    tags: ['蜂蜜', '酸甜', '清爽', '新手友好', '经典'],
    reason: '适合想喝金酒酸甜款的人，蜂蜜会把柠檬和酒感变得更圆润。',
    flavor: { sweet: 3, sour: 4, alcohol: 3, fresh: 4, difficulty: 2 },
    materials: {
      standard: ['金酒 45ml', '柠檬汁 20ml', '蜂蜜糖浆 15ml', '冰块'],
      convenience: ['金酒', '柠檬汁', '蜂蜜', '冰块'],
      simple: ['金酒', '柠檬', '蜂蜜']
    },
    steps: ['蜂蜜用少量温水化开成蜂蜜糖浆。', '摇壶加入金酒、柠檬汁、蜂蜜糖浆和冰块。', '摇冷后过滤入杯。'],
    scenes: ['新手第一杯', '下班放松', '女生更容易接受', '夏天晚上'],
    substitutes: ['蜂蜜糖浆可换普通糖浆，但香气会少。', '柠檬汁可用青柠汁，酸味会更尖。', '想低酒感就把金酒减到 30ml。'],
    similar: ['gin-tonic', 'tom-collins', 'whiskey-sour']
  },
  {
    id: 'clover-club',
    type: 'recipe',
    name: '三叶草俱乐部',
    enName: 'Clover Club',
    aliases: ['三叶草', 'clover club', '覆盆子金酒酸'],
    base: '金酒',
    tags: ['莓果', '酸甜', '绵密', '经典', '进阶'],
    reason: '适合喜欢莓果酸甜和细腻泡沫的人，是比普通金酒酸更有记忆点的一杯。',
    flavor: { sweet: 3, sour: 4, alcohol: 3, fresh: 4, difficulty: 4 },
    materials: {
      standard: ['金酒 45ml', '柠檬汁 20ml', '覆盆子糖浆 15ml', '蛋清 15ml', '冰块'],
      convenience: ['金酒', '柠檬汁', '莓果糖浆', '蛋清或省略', '冰块'],
      simple: ['金酒', '柠檬汁', '莓果糖浆']
    },
    steps: ['先不加冰干摇，让蛋清起泡。', '加入冰块再摇冷。', '过滤入杯，表面可点几滴莓果糖浆。'],
    scenes: ['约会', '进阶尝试', '女生更容易接受', '酒吧经典'],
    substitutes: ['不接受蛋清可以省略，口感会少一点绵密。', '覆盆子糖浆可换莓果果酱加少量水。', '怕甜就减少糖浆。'],
    warnings: ['使用蛋清要确认新鲜，介意生蛋清就不要加。'],
    similar: ['aviation', 'bees-knees', 'whiskey-sour']
  },
  {
    id: 'french-75',
    type: 'recipe',
    name: '法式75',
    enName: 'French 75',
    aliases: ['法国75', '法兰西75', 'french 75'],
    base: '金酒',
    tags: ['气泡感', '柑橘', '清爽', '经典', '聚会'],
    reason: '适合想要香槟感和金酒骨架的人，轻盈但很有庆祝感。',
    flavor: { sweet: 2, sour: 3, alcohol: 3, fresh: 5, difficulty: 3 },
    materials: {
      standard: ['金酒 30ml', '柠檬汁 15ml', '糖浆 10ml', '起泡酒 补满', '冰块'],
      convenience: ['金酒', '起泡酒小瓶', '柠檬汁', '糖浆'],
      simple: ['金酒', '起泡酒', '柠檬汁']
    },
    steps: ['金酒、柠檬汁、糖浆加冰摇冷。', '过滤入香槟杯。', '补冰镇起泡酒，轻轻提拉混合。'],
    scenes: ['朋友小聚', '约会', '周末下午', '庆祝'],
    substitutes: ['起泡酒可换气泡水加少量糖浆，但庆祝感会下降。', '金酒可少量降低让酒体更轻。', '柠檬汁必须新鲜会更好喝。'],
    similar: ['mimosa', 'aperol-spritz', 'gin-tonic']
  },
  {
    id: 'manhattan',
    type: 'recipe',
    name: '曼哈顿',
    enName: 'Manhattan',
    aliases: ['曼哈顿鸡尾酒', 'manhattan'],
    base: '威士忌',
    tags: ['酒感', '苦甜', '经典', '进阶', '夜晚'],
    reason: '适合喜欢威士忌、甜味美思和苦精层次的人，是老派酒吧感很强的一杯。',
    flavor: { sweet: 2, sour: 0, alcohol: 5, fresh: 1, difficulty: 3 },
    materials: {
      standard: ['黑麦威士忌 60ml', '甜味美思 30ml', '安格斯图拉苦精 2dash', '冰块'],
      convenience: ['威士忌', '甜味美思', '苦精', '冰块'],
      simple: ['威士忌', '甜味美思']
    },
    steps: ['调酒杯加入材料和冰块。', '搅拌至充分降温。', '过滤入杯，用樱桃或橙皮装饰。'],
    scenes: ['夜晚独处', '进阶尝试', '酒吧经典', '不想喝太甜'],
    substitutes: ['黑麦威士忌可换波本，口感更甜润。', '没有苦精也能做，但层次会少。', '甜味美思需要冷藏保存。'],
    similar: ['old-fashioned', 'boulevardier', 'sazerac']
  },
  {
    id: 'boulevardier',
    type: 'recipe',
    name: '林荫大道',
    enName: 'Boulevardier',
    aliases: ['布尔瓦迪耶', 'boulevardier', '威士忌内格罗尼'],
    base: '威士忌',
    tags: ['苦甜', '酒感', '经典', '进阶', '餐前'],
    reason: '适合喜欢内格罗尼但想要更厚、更暖的威士忌版本。',
    flavor: { sweet: 2, sour: 0, alcohol: 5, fresh: 2, difficulty: 3 },
    materials: {
      standard: ['波本或黑麦威士忌 45ml', '金巴利 30ml', '甜味美思 30ml', '冰块'],
      convenience: ['威士忌', '金巴利', '甜味美思', '冰块'],
      simple: ['威士忌', '金巴利', '甜味美思']
    },
    steps: ['调酒杯加入所有材料和冰块。', '搅拌至冰冷。', '过滤入杯，用橙皮表达香气。'],
    scenes: ['餐前', '进阶尝试', '夜晚独处', '老酒鬼偏爱'],
    substitutes: ['想更苦就提高金巴利比例。', '想更圆润用波本。', '没有甜味美思不建议硬替。'],
    similar: ['negroni', 'manhattan', 'old-fashioned']
  },
  {
    id: 'sazerac',
    type: 'recipe',
    name: '萨泽拉克',
    enName: 'Sazerac',
    aliases: ['萨泽拉克鸡尾酒', 'sazerac'],
    base: '威士忌',
    tags: ['酒感', '辛香', '经典', '老派', '进阶'],
    reason: '适合喜欢强酒感、苦精和茴香气息的人，是非常老派的一杯。',
    flavor: { sweet: 1, sour: 0, alcohol: 5, fresh: 1, difficulty: 5 },
    materials: {
      standard: ['黑麦威士忌 60ml', '方糖 1颗', '佩肖苦精 3dash', '苦艾酒 少量润杯', '冰块'],
      convenience: ['威士忌', '糖', '苦精', '苦艾酒或省略', '冰块'],
      simple: ['威士忌', '糖', '苦精']
    },
    steps: ['杯中用少量苦艾酒润杯后倒掉。', '调酒杯中压碎糖和苦精，加入威士忌和冰块搅冷。', '过滤入润过杯的杯子，用柠檬皮表达香气。'],
    scenes: ['老酒鬼偏爱', '夜晚独处', '进阶尝试', '酒吧经典'],
    substitutes: ['黑麦威士忌可换干邑或波本。', '没有佩肖苦精可用安格斯图拉，但味道会变。', '苦艾酒只润杯，不要倒太多。'],
    warnings: ['酒感非常直接，不适合作为新手第一杯。'],
    similar: ['old-fashioned', 'manhattan', 'boulevardier']
  },
  {
    id: 'penicillin',
    type: 'recipe',
    name: '盘尼西林',
    enName: 'Penicillin',
    aliases: ['青霉素鸡尾酒', 'penicillin', '姜蜜威士忌酸'],
    base: '威士忌',
    tags: ['姜味', '蜂蜜', '酸甜', '烟熏', '现代经典'],
    reason: '适合喜欢威士忌酸甜但想要姜和烟熏层次的人，现代酒吧非常常见。',
    flavor: { sweet: 3, sour: 4, alcohol: 4, fresh: 3, difficulty: 4 },
    materials: {
      standard: ['调和威士忌 45ml', '柠檬汁 20ml', '蜂蜜姜糖浆 20ml', '泥煤威士忌 5ml', '冰块'],
      convenience: ['威士忌', '柠檬汁', '蜂蜜', '姜汁或姜糖浆', '冰块'],
      simple: ['威士忌', '柠檬', '蜂蜜', '姜']
    },
    steps: ['摇壶加入调和威士忌、柠檬汁、蜂蜜姜糖浆和冰块。', '摇冷后过滤入加冰杯。', '表面轻轻漂一层泥煤威士忌。'],
    scenes: ['下班放松', '进阶尝试', '秋冬夜晚', '老酒鬼偏爱'],
    substitutes: ['没有泥煤威士忌可以省略。', '姜糖浆可用蜂蜜加姜汁临时调。', '怕辣就减少姜味。'],
    similar: ['whiskey-sour', 'old-fashioned', 'bees-knees']
  },
  {
    id: 'paper-plane',
    type: 'recipe',
    name: '纸飞机',
    enName: 'Paper Plane',
    aliases: ['纸飞机鸡尾酒', 'paper plane'],
    base: '威士忌',
    tags: ['酸甜', '苦甜', '现代经典', '进阶', '酒感'],
    reason: '适合喜欢酸甜平衡又带一点草本苦味的人，四等份配方很利落。',
    flavor: { sweet: 3, sour: 4, alcohol: 4, fresh: 3, difficulty: 3 },
    materials: {
      standard: ['波本 22.5ml', '阿玛罗 22.5ml', '阿佩罗 22.5ml', '柠檬汁 22.5ml', '冰块'],
      convenience: ['波本', '阿佩罗', '阿玛罗或苦味利口酒', '柠檬汁', '冰块'],
      simple: ['波本', '阿佩罗', '柠檬汁']
    },
    steps: ['所有材料等量加入摇壶。', '加冰摇冷。', '过滤入杯，保持干净的酸甜尾韵。'],
    scenes: ['进阶尝试', '朋友小聚', '餐前', '现代经典'],
    substitutes: ['没有阿玛罗可用偏苦甜的草本利口酒，但风味会变化。', '阿佩罗不要换太多，否则颜色和橙味会跑掉。', '柠檬汁要新鲜。'],
    similar: ['whiskey-sour', 'aperol-spritz', 'boulevardier']
  },
  {
    id: 'mai-tai',
    type: 'recipe',
    name: '迈泰',
    enName: 'Mai Tai',
    aliases: ['mai tai', '麦泰', '美态'],
    base: '朗姆',
    tags: ['热带', '果仁', '酸甜', '经典', '聚会'],
    reason: '适合喜欢朗姆、青柠和杏仁香的人，是热带鸡尾酒里很有代表性的一杯。',
    flavor: { sweet: 3, sour: 4, alcohol: 4, fresh: 4, difficulty: 4 },
    materials: {
      standard: ['陈年朗姆 45ml', '橙味利口酒 15ml', '青柠汁 20ml', '杏仁糖浆 15ml', '糖浆 5ml', '冰块'],
      convenience: ['朗姆', '橙味利口酒', '青柠汁', '杏仁糖浆或杏仁露', '冰块'],
      simple: ['朗姆', '青柠汁', '橙味利口酒']
    },
    steps: ['摇壶加入所有材料和冰块。', '摇冷后连碎冰倒入杯中。', '用薄荷和青柠装饰。'],
    scenes: ['朋友小聚', '夏天晚上', '进阶尝试', '热带风味'],
    substitutes: ['没有杏仁糖浆可少量用杏仁露或糖浆替代。', '朗姆可以用白朗姆加少量深色朗姆。', '太甜就增加青柠。'],
    similar: ['daiquiri', 'jungle-bird', 'mojito']
  },
  {
    id: 'jungle-bird',
    type: 'recipe',
    name: '丛林鸟',
    enName: 'Jungle Bird',
    aliases: ['丛林鸟鸡尾酒', 'jungle bird'],
    base: '朗姆',
    tags: ['热带', '苦甜', '菠萝', '进阶', '现代经典'],
    reason: '适合喜欢菠萝热带感，但又想要金巴利苦味收住甜腻的人。',
    flavor: { sweet: 3, sour: 3, alcohol: 3, fresh: 4, difficulty: 3 },
    materials: {
      standard: ['黑朗姆 45ml', '金巴利 22.5ml', '菠萝汁 45ml', '青柠汁 15ml', '糖浆 15ml', '冰块'],
      convenience: ['朗姆', '金巴利', '菠萝汁', '青柠汁', '冰块'],
      simple: ['朗姆', '菠萝汁', '青柠汁']
    },
    steps: ['所有材料加冰摇冷。', '过滤入加冰杯。', '用菠萝片或青柠片装饰。'],
    scenes: ['朋友小聚', '夏天晚上', '进阶尝试', '热带风味'],
    substitutes: ['没有金巴利也能做成菠萝朗姆酸，但少了苦甜骨架。', '黑朗姆可换陈年朗姆。', '菠萝汁太甜就减少糖浆。'],
    similar: ['mai-tai', 'daiquiri', 'aperol-spritz']
  },
  {
    id: 'dark-n-stormy',
    type: 'recipe',
    name: '黑暗风暴',
    enName: "Dark 'n' Stormy",
    aliases: ['黑色风暴', '黑朗姆姜啤', "dark n stormy", "dark 'n' stormy"],
    base: '朗姆',
    tags: ['姜味', '气泡感', '清爽', '经典', '低门槛'],
    reason: '适合喜欢姜啤刺激和黑朗姆焦糖香的人，步骤短但气氛很足。',
    flavor: { sweet: 2, sour: 2, alcohol: 3, fresh: 4, difficulty: 1 },
    materials: {
      standard: ['黑朗姆 45ml', '姜啤 120ml', '青柠汁 10ml', '冰块'],
      convenience: ['黑朗姆', '姜汁汽水或姜啤', '青柠', '冰块'],
      simple: ['朗姆', '姜汁汽水', '青柠']
    },
    steps: ['高杯加满冰块。', '倒入姜啤和青柠汁。', '最后倒入黑朗姆，让颜色自然分层。'],
    scenes: ['下班放松', '朋友小聚', '夏天晚上', '低门槛'],
    substitutes: ['没有姜啤可用姜汁汽水。', '黑朗姆可换陈年朗姆。', '怕甜就多挤青柠。'],
    similar: ['moscow-mule', 'cuba-libre', 'mojito']
  },
  {
    id: 'tommys-margarita',
    type: 'recipe',
    name: '汤米玛格丽特',
    enName: "Tommy's Margarita",
    aliases: ['汤米马格丽特', "tommy's margarita", 'tommys margarita'],
    base: '龙舌兰',
    tags: ['酸甜', '清爽', '龙舌兰', '现代经典', '进阶'],
    reason: '适合想喝更干净、更突出龙舌兰本味的玛格丽特爱好者。',
    flavor: { sweet: 2, sour: 4, alcohol: 4, fresh: 4, difficulty: 2 },
    materials: {
      standard: ['龙舌兰 60ml', '青柠汁 30ml', '龙舌兰糖浆 15ml', '冰块'],
      convenience: ['龙舌兰', '青柠汁', '蜂蜜或糖浆', '冰块'],
      simple: ['龙舌兰', '青柠汁', '糖浆']
    },
    steps: ['所有材料加入摇壶。', '加冰摇冷。', '过滤入杯，可加盐边但不是必须。'],
    scenes: ['进阶尝试', '夏天晚上', '不想喝太甜', '酒吧经典'],
    substitutes: ['龙舌兰糖浆可用蜂蜜糖浆。', '想更清爽可做加冰杯。', '怕酸就略增糖浆。'],
    similar: ['margarita', 'paloma', 'naked-and-famous']
  },
  {
    id: 'naked-and-famous',
    type: 'recipe',
    name: '裸与成名',
    enName: 'Naked and Famous',
    aliases: ['裸露成名', 'naked and famous'],
    base: '龙舌兰',
    tags: ['烟熏', '苦甜', '酸甜', '现代经典', '进阶'],
    reason: '适合喜欢梅斯卡尔烟熏、黄查特和阿佩罗复杂苦甜的人，小杯但记忆很强。',
    flavor: { sweet: 3, sour: 4, alcohol: 4, fresh: 3, difficulty: 4 },
    materials: {
      standard: ['梅斯卡尔 22.5ml', '阿佩罗 22.5ml', '黄查特酒 22.5ml', '青柠汁 22.5ml', '冰块'],
      convenience: ['梅斯卡尔或龙舌兰', '阿佩罗', '黄查特酒', '青柠汁', '冰块'],
      simple: ['龙舌兰', '阿佩罗', '青柠汁']
    },
    steps: ['四种材料等量加入摇壶。', '加冰摇冷。', '过滤入杯，保持干净的烟熏酸甜。'],
    scenes: ['老酒鬼偏爱', '进阶尝试', '餐前', '现代经典'],
    substitutes: ['梅斯卡尔可换龙舌兰，但烟熏感会降低。', '黄查特酒很关键，不建议完全省略。', '阿佩罗可让整体更橙香微苦。'],
    warnings: ['风味很鲜明，不适合怕烟熏和草本味的人。'],
    similar: ['paper-plane', 'tommys-margarita', 'margarita']
  },
  {
    id: 'cosmopolitan',
    type: 'recipe',
    name: '大都会',
    enName: 'Cosmopolitan',
    aliases: ['大都会鸡尾酒', 'cosmo', 'cosmopolitan'],
    base: '伏特加',
    tags: ['莓果', '酸甜', '经典', '聚会', '优雅'],
    reason: '适合喜欢蔓越莓、青柠和橙香酸甜的人，好看、轻快、辨识度高。',
    flavor: { sweet: 3, sour: 4, alcohol: 3, fresh: 4, difficulty: 3 },
    materials: {
      standard: ['伏特加 40ml', '橙味利口酒 15ml', '蔓越莓汁 30ml', '青柠汁 15ml', '冰块'],
      convenience: ['伏特加', '橙味利口酒', '蔓越莓汁', '青柠汁', '冰块'],
      simple: ['伏特加', '蔓越莓汁', '青柠汁']
    },
    steps: ['所有材料加冰摇冷。', '过滤入杯。', '用橙皮或青柠皮点缀。'],
    scenes: ['朋友小聚', '约会', '女生更容易接受', '酒吧经典'],
    substitutes: ['蔓越莓汁可用莓果汁临时替代。', '没有橙味利口酒就少一点橙汁或橙皮香气。', '想更轻就降低伏特加。'],
    similar: ['sea-breeze', 'vodka-orange', 'clover-club']
  },
  {
    id: 'sidecar',
    type: 'recipe',
    name: '边车',
    enName: 'Sidecar',
    aliases: ['边车鸡尾酒', 'sidecar', '干邑酸'],
    base: '干邑',
    tags: ['酸甜', '柑橘', '经典', '进阶', '酒感'],
    reason: '适合喜欢干邑暖感、柠檬酸和橙味利口酒的人，老派但很利落。',
    flavor: { sweet: 2, sour: 4, alcohol: 4, fresh: 3, difficulty: 3 },
    materials: {
      standard: ['干邑 50ml', '橙味利口酒 20ml', '柠檬汁 20ml', '冰块'],
      convenience: ['干邑或白兰地', '橙味利口酒', '柠檬汁', '冰块'],
      simple: ['白兰地', '柠檬汁', '糖浆']
    },
    steps: ['摇壶加入干邑、橙味利口酒、柠檬汁和冰块。', '摇冷后过滤入杯。', '可做半圈糖边，增加入口圆润感。'],
    scenes: ['进阶尝试', '酒吧经典', '夜晚独处', '约会'],
    substitutes: ['干邑可换品质稳定的白兰地。', '橙味利口酒可换君度或三秒。', '怕酸可加少量糖浆。'],
    similar: ['whiskey-sour', 'french-75', 'aviation']
  }
]

module.exports = expandedRecipes
