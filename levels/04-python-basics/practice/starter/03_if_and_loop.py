"""
第 04 关 · 练习 3：if 与 for

运行：python 03_if_and_loop.py
"""

# --- 请修改 score（0~100）或 status，看输出如何变化 ---
score = 72
status = "studying"  # 例如 "done" / "studying" / 其它

# --- 学习清单：可改列表里的字符串 ---
items = [
    "打开 starter 文件夹",
    "运行本脚本",
    "对照 checklist 自检",
]

print("---- if 判断 ----")
if score >= 60:
    print("分数角度：已通过（>= 60）。")
else:
    print("分数角度：再加油（< 60）。")

if status == "done":
    print("状态角度：标记为完成。")
else:
    print("状态角度：仍在进行中。")

print("\n---- for 遍历清单 items ----")
for step in items:
    print("·", step)
