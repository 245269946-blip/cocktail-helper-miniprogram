import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / ".deps"))

from PIL import Image, ImageDraw, ImageFont


OUT = Path(__file__).parent / "screenshots"
OUT.mkdir(exist_ok=True)

W, H = 390, 844

COLORS = {
    "bg": "#fbfaf7",
    "surface": "#ffffff",
    "ink": "#181614",
    "muted": "#6e685f",
    "line": "#e2ddd4",
    "line2": "#eee8df",
    "tea": "#2f766f",
    "tea_soft": "#e6f1ef",
    "berry": "#b33d56",
    "berry_soft": "#f8e8ec",
    "citrus": "#d98c24",
    "citrus_soft": "#fff0da",
    "green": "#5e8d50",
    "green_soft": "#edf5e8",
    "dark": "#181614",
    "blue": "#386d9f",
    "blue_soft": "#e8eefb",
}

FONT_PATH = "/System/Library/Fonts/PingFang.ttc"
FALLBACK = "/System/Library/Fonts/Hiragino Sans GB.ttc"


def font(size, index=0):
    path = FONT_PATH if os.path.exists(FONT_PATH) else FALLBACK
    return ImageFont.truetype(path, size, index=index)


F = {
    "xs": font(11),
    "sm": font(12),
    "body": font(14),
    "body2": font(15),
    "title": font(18),
    "h2": font(22),
    "h1": font(27),
    "hero": font(30),
}


def text_w(draw, text, ft):
    return draw.textbbox((0, 0), text, font=ft)[2]


def wrap(draw, text, ft, max_width):
    lines = []
    line = ""
    for ch in text:
        trial = line + ch
        if text_w(draw, trial, ft) <= max_width or not line:
            line = trial
        else:
            lines.append(line)
            line = ch
    if line:
        lines.append(line)
    return lines


def draw_text(draw, xy, text, ft, fill=None, max_width=None, line_gap=5):
    fill = fill or COLORS["ink"]
    x, y = xy
    if max_width is None:
        draw.text((x, y), text, font=ft, fill=fill)
        return y + draw.textbbox((x, y), text, font=ft)[3] - y
    for line in wrap(draw, text, ft, max_width):
        draw.text((x, y), line, font=ft, fill=fill)
        y += ft.size + line_gap
    return y


def rr(draw, box, r=8, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)


def base(title="调酒助手", left=None, right="≡", nav=True):
    im = Image.new("RGB", (W, H), COLORS["bg"])
    d = ImageDraw.Draw(im)
    d.text((18, 13), "20:26", font=F["xs"], fill=COLORS["ink"])
    d.text((318, 13), "5G 100%", font=F["xs"], fill=COLORS["ink"])
    if left:
        rr(d, (17, 40, 51, 74), 8, COLORS["surface"], COLORS["line"])
        d.text((29, 42), left, font=F["title"], fill=COLORS["ink"])
        d.text((78, 47), title, font=F["title"], fill=COLORS["ink"])
    else:
        d.text((18, 47), title, font=F["title"], fill=COLORS["ink"])
    if right:
        rr(d, (338, 40, 372, 74), 8, COLORS["surface"], COLORS["line"])
        d.text((350, 43), right, font=F["title"], fill=COLORS["ink"])
    d.line((0, 86, W, 86), fill=COLORS["line2"], width=1)
    if nav:
        nav_y = H - 68
        d.line((0, nav_y, W, nav_y), fill=COLORS["line2"], width=1)
        items = [("⌂", "首页"), ("⌕", "搜索"), ("♡", "收藏")]
        for i, (icon, label) in enumerate(items):
            cx = W * (i + 0.5) / 3
            color = COLORS["ink"] if i == 0 else COLORS["muted"]
            d.text((cx - text_w(d, icon, F["title"]) / 2, nav_y + 10), icon, font=F["title"], fill=color)
            d.text((cx - text_w(d, label, F["xs"]) / 2, nav_y + 37), label, font=F["xs"], fill=color)
    return im, d


def pill(d, x, y, text, fill="#ffffff", outline=None, color=None):
    color = color or COLORS["muted"]
    pad_x = 10
    h = 28
    w = text_w(d, text, F["sm"]) + pad_x * 2
    rr(d, (x, y, x + w, y + h), 14, fill, outline or COLORS["line"])
    d.text((x + pad_x, y + 6), text, font=F["sm"], fill=color)
    return x + w + 8


def card(d, box, fill=None, outline=None):
    rr(d, box, 8, fill or COLORS["surface"], outline or COLORS["line"])


def thumb(d, box, fill):
    rr(d, box, 7, fill, "#d8d1c6")
    x1, y1, x2, y2 = box
    mid = (x1 + x2) // 2
    d.polygon([(mid - 20, y1 + 24), (mid + 20, y1 + 24), (mid + 10, y2 - 18), (mid - 10, y2 - 18)], outline="#ffffff", fill=None)
    d.line((mid - 22, y1 + 24, mid + 22, y1 + 24), fill="#ffffff", width=4)
    d.ellipse((mid - 8, y1 + 10, mid + 8, y1 + 17), fill="#ffffff")


def section_title(d, y, title, note=None):
    d.text((18, y), title, font=F["title"], fill=COLORS["ink"])
    if note:
        d.text((W - 18 - text_w(d, note, F["sm"]), y + 4), note, font=F["sm"], fill=COLORS["muted"])
    return y + 30


def stars(value):
    return "★" * value + "☆" * (5 - value)


def score_row(d, x, y, label, value, note, compact=False):
    ft = F["xs"] if compact else F["sm"]
    d.text((x, y), label, font=ft, fill=COLORS["ink"])
    d.text((x + 52, y), stars(value), font=ft, fill=COLORS["citrus"])
    d.text((x + 118, y), note, font=ft, fill=COLORS["muted"])
    return y + (18 if compact else 22)


def flavor_block(d, x, y, rows, compact=False):
    for label, value, note in rows:
        y = score_row(d, x, y, label, value, note, compact)
    return y


def home():
    im, d = base()
    y = 106
    d.text((18, y), "今晚想搞点什么喝？", font=F["h2"], fill=COLORS["ink"])
    d.text((18, y + 34), "先选最方便的开始方式，后面再帮你缩小选择。", font=F["body"], fill=COLORS["muted"])
    y += 72
    actions = [
        ("去便利店买", "下楼5分钟就能搞定", COLORS["citrus_soft"], "#eed6a5", "少买少错"),
        ("家里有什么", "先看看现在能做什么", COLORS["tea_soft"], "#cde4df", "少补货"),
        ("找一杯好喝的", "从甜口、清爽、微醺开始", "#ffffff", COLORS["line"], "先选口味"),
        ("第一次尝试", "几乎喝不出酒味也能喝", COLORS["berry_soft"], "#e4c8d0", "新手友好"),
    ]
    for i, (title, desc, fill, outline, badge) in enumerate(actions):
        x1 = 18 + (i % 2) * 182
        y1 = y + (i // 2) * 112
        card(d, (x1, y1, x1 + 172, y1 + 100), fill, outline)
        d.text((x1 + 14, y1 + 14), title, font=F["body2"], fill=COLORS["ink"])
        draw_text(d, (x1 + 14, y1 + 40), desc, F["sm"], COLORS["muted"], 135, line_gap=2)
        d.text((x1 + 14, y1 + 76), badge, font=F["xs"], fill=COLORS["tea"])
    y += 238
    section_title(d, y, "已经知道想搜什么？")
    y += 34
    card(d, (18, y, 372, y + 48))
    d.text((34, y + 15), "⌕", font=F["body"], fill=COLORS["tea"])
    d.text((62, y + 15), "搜金酒 / 可乐 / 甜口 / 便利店 / 莫吉托", font=F["sm"], fill="#8a8379")
    y += 70
    section_title(d, y, "不用想太多，直接点", "明确收益")
    y += 36
    for title, meta in [("便利店能买齐", "只买 2-3 样，今晚就能做"), ("几乎喝不出酒味", "前半口像冰饮，后面才有感觉"), ("家里现在就能做", "先看不用出门的方案")]:
        card(d, (18, y, 372, y + 58))
        d.text((34, y + 12), title, font=F["body2"], fill=COLORS["ink"])
        d.text((34, y + 36), meta, font=F["sm"], fill=COLORS["muted"])
        d.text((348, y + 14), "›", font=F["h2"], fill="#a49a8e")
        y += 68
    return im


def search():
    im, d = base("搜索", left="‹", nav=False)
    y = 106
    card(d, (18, y, 372, y + 48))
    d.text((34, y + 14), "金酒", font=F["body2"], fill=COLORS["ink"])
    rr(d, (305, y + 8, 358, y + 40), 8, COLORS["dark"])
    d.text((318, y + 15), "搜索", font=F["sm"], fill="#ffffff")
    y += 66
    d.text((18, y), "搜索展开状态", font=F["h2"], fill=COLORS["ink"])
    draw_text(d, (18, y + 34), "从一个简单词出发，先给准确结果，再引导到条件和场景。", F["body"], COLORS["muted"], 330)
    y += 84
    groups = [
        ("精准匹配", [("金汤力", "清爽微苦 · 经典配方"), ("金酒苏打", "更低糖 · 更清爽"), ("金菲士", "酸甜气泡 · 进阶一点")], COLORS["tea_soft"]),
        ("条件搜索", [("便利店能做的金酒", "只看容易买齐的材料"), ("不苦的金酒", "避开重苦味，适合新手"), ("新手金酒", "少步骤、少器具优先")], COLORS["citrus_soft"]),
        ("场景延展", [("下班微醺", "轻松一点，不要太甜"), ("夏天清爽", "有气泡、果香、冰爽"), ("女生聚会", "颜色好看，酒味不冲")], COLORS["blue_soft"]),
    ]
    for group, rows, color in groups:
        d.text((18, y), group, font=F["body2"], fill=COLORS["ink"])
        y += 28
        for title, meta in rows:
            card(d, (18, y, 372, y + 44))
            rr(d, (32, y + 10, 58, y + 36), 7, color)
            d.text((72, y + 7), title, font=F["body"], fill=COLORS["ink"])
            d.text((72, y + 28), meta, font=F["xs"], fill=COLORS["muted"])
            d.text((348, y + 7), "›", font=F["title"], fill="#a49a8e")
            y += 50
        y += 6
    return im


def results():
    im, d = base("搜索结果", left="‹", nav=False)
    y = 106
    d.text((18, y), "甜口 / 便利店", font=F["h2"], fill=COLORS["ink"])
    d.text((18, y + 34), "找到 12 个结果，先帮你判断哪杯更适合现在喝。", font=F["body"], fill=COLORS["muted"])
    y += 70
    x = 18
    for item in ["综合", "少材料", "低酒精", "好买"]:
        fill = COLORS["dark"] if item == "综合" else "#ffffff"
        color = "#ffffff" if item == "综合" else COLORS["muted"]
        x = pill(d, x, y, item, fill, COLORS["line"], color)
    y += 48
    data = [
        ("百利甜牛奶", "像液体巧克力一样，几乎喝不出酒味", "适合：怕酒味 / 饭后甜口", "买 2 样 · 3 分钟 · 可做 2 杯", "#e6b2bd", [("甜度", 5, "像奶茶"), ("酒感", 1, "很轻")]),
        ("朗姆可乐", "聚会最不容易翻车的一杯", "适合：朋友小聚 / 临时招待", "买 2 样 · 5 分钟 · 新手成功率高", "#eccb88", [("甜度", 3, "顺口"), ("微醺", 3, "慢慢来")]),
        ("梅酒苏打", "像夏天夜风一样的清爽感", "适合：不爱烈酒 / 想喝清爽", "买 2 样 · 3 分钟 · 酒感轻", "#b9d7d1", [("清爽", 5, "冰饮感"), ("酒感", 2, "后劲轻")]),
    ]
    for title, desc, fit, meta, color, rows in data:
        card(d, (18, y, 372, y + 142))
        thumb(d, (30, y + 16, 94, y + 92), color)
        d.text((108, y + 12), title, font=F["body2"], fill=COLORS["ink"])
        d.text((108, y + 36), desc, font=F["sm"], fill=COLORS["ink"])
        d.text((108, y + 57), fit, font=F["xs"], fill=COLORS["muted"])
        d.text((108, y + 78), meta, font=F["xs"], fill=COLORS["citrus"])
        flavor_block(d, 108, y + 100, rows, compact=True)
        y += 152
    section_title(d, y, "继续探索", "不用返回首页")
    y += 34
    explore = [
        ("猜你喜欢", "更像奶茶一点"),
        ("类似风味", "甜口但不腻"),
        ("同样少材料", "只买 2 样就能做"),
        ("便利店可替代", "5 分钟买齐"),
    ]
    for i, (title, meta) in enumerate(explore):
        x1 = 18 + (i % 2) * 182
        y1 = y + (i // 2) * 68
        card(d, (x1, y1, x1 + 172, y1 + 58))
        d.text((x1 + 12, y1 + 10), title, font=F["body"], fill=COLORS["ink"])
        d.text((x1 + 12, y1 + 32), meta, font=F["xs"], fill=COLORS["muted"])
    return im


def detail():
    im, d = base("配方详情", left="‹", right="↗", nav=False)
    y = 102
    thumb(d, (18, y, 372, y + 112), "#b9d7d1")
    rr(d, (34, y + 68, 296, y + 100), 7, "#2b2926")
    d.text((46, y + 78), "图片位：后续替换为真实成品图", font=F["xs"], fill="#ffffff")
    y += 130
    d.text((18, y), "金汤力", font=F["h1"], fill=COLORS["ink"])
    rr(d, (334, y, 372, y + 38), 8, COLORS["berry_soft"], "#e4c8d0")
    d.text((347, y + 8), "♡", font=F["title"], fill=COLORS["berry"])
    draw_text(d, (18, y + 42), "前半口像冰饮，后面才慢慢有酒感。适合想喝清爽、不想太甜的人。", F["body"], COLORS["muted"], 305)
    y += 76
    x = 18
    for item in ["清爽微苦", "有气泡", "不甜腻"]:
        x = pill(d, x, y, item, "#f4f1eb")
    y += 38
    card(d, (18, y, 372, y + 124))
    d.text((34, y + 12), "风味评分", font=F["body2"], fill=COLORS["ink"])
    flavor_block(d, 34, y + 39, [
        ("甜度", 2, "不腻"),
        ("酒感", 3, "后面才有"),
        ("清爽", 5, "像冰饮"),
        ("微醺", 3, "会慢慢有感觉"),
        ("难度", 1, "倒一起就行"),
    ], compact=True)
    y += 138
    card(d, (18, y, 372, y + 62))
    d.text((34, y + 12), "适合谁 / 什么场景", font=F["body2"], fill=COLORS["ink"])
    d.text((34, y + 38), "新手、不爱甜、想喝得轻松的人", font=F["sm"], fill=COLORS["muted"])
    y += 76
    card(d, (18, y, 372, y + 56), COLORS["green_soft"], "#d8e8d0")
    d.text((34, y + 10), "现在就能做", font=F["body2"], fill=COLORS["ink"])
    d.text((34, y + 34), "买 2 样 · 3 分钟 · 新手成功率高", font=F["sm"], fill=COLORS["muted"])
    y += 68
    card(d, (18, y, 372, y + 46))
    d.text((34, y + 10), "材料 / 替代版", font=F["body"], fill=COLORS["ink"])
    d.text((154, y + 12), "金酒45ml；雪碧可替汤力", font=F["xs"], fill=COLORS["muted"])
    d.text((348, y + 10), "›", font=F["h2"], fill="#a49a8e")
    y += 60
    section_title(d, y, "看完这杯，还可以继续")
    y += 34
    for i, (title, meta) in enumerate([
        ("更清爽一点", "金酒苏打 / 汤力更少糖"),
        ("不苦版本", "加青柠或换雪碧"),
        ("更像果酒", "梅酒苏打 / 果酒气泡"),
        ("夏夜推荐", "少材料、冰爽、有气泡"),
    ]):
        x1 = 18 + (i % 2) * 182
        y1 = y + (i // 2) * 66
        card(d, (x1, y1, x1 + 172, y1 + 56))
        d.text((x1 + 12, y1 + 9), title, font=F["body"], fill=COLORS["ink"])
        d.text((x1 + 12, y1 + 31), meta, font=F["xs"], fill=COLORS["muted"])
    return im


def pantry():
    im, d = base("家里有什么", left="‹", nav=False)
    y = 106
    d.text((18, y), "输入手边材料", font=F["h2"], fill=COLORS["ink"])
    draw_text(d, (18, y + 34), "先回答“我现在能做什么”，再提示只差哪一两样。", F["body"], COLORS["muted"], 330)
    y += 88
    card(d, (18, y, 372, y + 48))
    d.text((34, y + 15), "+ 添加材料，例如：可乐 / 柠檬 / 金酒", font=F["body"], fill="#8a8379")
    y += 64
    section_title(d, y, "已选择")
    y += 34
    x = 18
    for item in ["威士忌", "可乐", "柠檬", "冰块"]:
        x = pill(d, x, y, item, COLORS["tea_soft"], "#cde4df", COLORS["tea"])
    y += 52
    card(d, (18, y, 372, y + 80), COLORS["green_soft"], "#d8e8d0")
    d.text((34, y + 16), "现在可直接做 3 杯", font=F["h2"], fill=COLORS["ink"])
    d.text((34, y + 50), "另有 2 杯只差 1 样，去便利店补上就能做。", font=F["body"], fill=COLORS["muted"])
    y += 98
    for group, title, meta, tag in [
        ("A. 现在直接能做", "威士忌可乐", "不用补货 · 3 分钟 · 今晚聚会直接能用", "直接做"),
        ("B. 只差 1 样", "古巴自由", "只差：白朗姆 · 补上就能做 3 杯", "补 1 样"),
        ("C. 去便利店补一下", "金酒雪碧", "只差：金酒 · 便利店 5 分钟买齐", "马上补"),
        ("D. 升级版更好喝", "威士忌嗨棒", "补：苏打水 · 会比可乐更清爽不甜", "升级口感"),
    ]:
        card(d, (18, y, 372, y + 92))
        d.text((34, y + 10), group, font=F["xs"], fill=COLORS["tea"])
        d.text((34, y + 30), title, font=F["body2"], fill=COLORS["ink"])
        d.text((34, y + 55), meta, font=F["sm"], fill=COLORS["muted"])
        pill(d, 34, y + 70, tag, "#f4f1eb")
        d.text((348, y + 27), "›", font=F["h2"], fill="#a49a8e")
        y += 102
    return im


def convenience():
    im, d = base("便利店模式", left="‹", nav=False)
    y = 106
    d.text((18, y), "照着买就能做", font=F["h2"], fill=COLORS["ink"])
    draw_text(d, (18, y + 34), "把配方改成购买清单，适合现在就去便利店补货。", F["body"], COLORS["muted"], 330)
    y += 88
    card(d, (18, y, 372, y + 122), COLORS["citrus_soft"], "#eed6a5")
    d.text((34, y + 16), "711 今晚微醺套餐", font=F["body2"], fill=COLORS["ink"])
    d.text((34, y + 44), "材料：可乐500ml / 青柠 / 冰杯 / 白朗姆", font=F["body"], fill=COLORS["muted"])
    d.text((34, y + 68), "预计：35-55 元，可做 3-4 杯", font=F["sm"], fill=COLORS["citrus"])
    d.text((34, y + 92), "成功率高｜适合：下班放松 / 朋友小聚 / 新手", font=F["sm"], fill=COLORS["muted"])
    y += 142
    section_title(d, y, "方案卡")
    y += 34
    x = 18
    for item in ["楼下便利店", "预算 50", "少材料", "新手"]:
        x = pill(d, x, y, item)
    y += 50
    for title, items, price, tags, color in [
        ("全家低酒感套餐", "梅酒 / 苏打水 / 冰杯", "预计 35-50 元，可做 3 杯", "像果汁一样顺口｜成功率高", "#b9d7d1"),
        ("宿舍便宜好喝套餐", "威士忌 / 可乐500ml / 冰杯", "预计 30-45 元，可做 2-3 杯", "只买 2 样｜今晚直接用", "#eccb88"),
        ("聚会不会翻车套餐", "白朗姆 / 可乐 / 青柠 / 冰杯", "预计 35-55 元，可做 3-4 杯", "能做多杯｜新手成功率高", "#e6b2bd"),
    ]:
        card(d, (18, y, 372, y + 124))
        thumb(d, (30, y + 16, 92, y + 100), color)
        d.text((108, y + 14), title, font=F["body2"], fill=COLORS["ink"])
        d.text((108, y + 40), f"材料：{items}", font=F["sm"], fill=COLORS["muted"])
        d.text((108, y + 61), price, font=F["sm"], fill=COLORS["citrus"])
        d.text((108, y + 82), tags, font=F["xs"], fill=COLORS["muted"])
        pill(d, 108, y + 98, "查看购物清单", "#f4f1eb")
        y += 136
    return im


def guide():
    im, d = base("按需求找一杯", left="‹", nav=False)
    y = 106
    d.text((18, y), "按需求进入", font=F["h2"], fill=COLORS["ink"])
    draw_text(d, (18, y + 34), "不做内容流，只把常见需求整理成能直接点的找酒路径。", F["body"], COLORS["muted"], 330)
    y += 88
    card(d, (18, y, 372, y + 46), "#f7f5f0")
    for i, label in enumerate(["需求", "口味", "材料"]):
        x1 = 24 + i * 114
        fill = COLORS["tea"] if i == 0 else "#f7f5f0"
        rr(d, (x1, y + 6, x1 + 106, y + 40), 6, fill)
        color = "#ffffff" if i == 0 else COLORS["muted"]
        d.text((x1 + 53 - text_w(d, label, F["sm"]) / 2, y + 15), label, font=F["sm"], fill=color)
    y += 68
    for title, reason, color, tags in [
        ("下班后不容易踩雷", "3 分钟、少步骤，回家就能直接做。", "#b9d7d1", ["买 2 样", "成功率高", "低糖"]),
        ("聚会最容易被夸好喝", "颜色好看、能做多杯，不容易翻车。", "#e6b2bd", ["可做 4 杯", "好拍照", "不易错"]),
        ("几乎喝不出酒味", "甜口、奶感、果味优先，适合怕酒味的人。", "#eccb88", ["低酒感", "甜口", "饭后"]),
        ("少器具少材料", "没有雪克杯也能做，便利店能买齐。", "#d6d1c6", ["5 分钟买齐", "少材料", "新手"]),
        ("家里现在就能做", "先看不出门方案，再提示缺什么。", "#dcead7", ["不用买", "看缺料", "马上做"]),
    ]:
        card(d, (18, y, 372, y + 98))
        thumb(d, (30, y + 12, 94, y + 86), color)
        d.text((110, y + 12), title, font=F["body2"], fill=COLORS["ink"])
        draw_text(d, (110, y + 36), reason, F["sm"], COLORS["muted"], 226, line_gap=2)
        tx = 110
        for tag in tags:
            tx = pill(d, tx, y + 70, tag, "#f4f1eb")
        y += 108
    return im


PAGES = [
    ("01-home", "首页", home),
    ("02-search-expanded", "搜索展开状态", search),
    ("03-results", "搜索结果页", results),
    ("04-detail", "酒单详情页", detail),
    ("05-pantry", "家里有什么", pantry),
    ("06-convenience", "便利店模式", convenience),
    ("07-guide", "按需求找一杯", guide),
]


def save_all():
    images = []
    for name, label, fn in PAGES:
        im = fn()
        path = OUT / f"{name}.png"
        im.save(path)
        images.append((label, im, path))

    margin = 28
    label_h = 34
    cols = 4
    rows = 2
    tile_w = W
    tile_h = H + label_h
    ow = cols * tile_w + (cols + 1) * margin
    oh = rows * tile_h + (rows + 1) * margin
    overview = Image.new("RGB", (ow, oh), "#f4f2ee")
    od = ImageDraw.Draw(overview)
    for i, (label, im, _) in enumerate(images):
        col = i % cols
        row = i // cols
        x = margin + col * (tile_w + margin)
        y = margin + row * (tile_h + margin)
        od.text((x, y), label, font=F["title"], fill=COLORS["ink"])
        overview.paste(im, (x, y + label_h))
    overview.save(OUT / "00-overview.png")


if __name__ == "__main__":
    save_all()
    print(f"wrote screenshots to {OUT}")
