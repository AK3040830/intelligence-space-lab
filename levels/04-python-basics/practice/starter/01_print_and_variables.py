"""
第 04 关 · 练习 1：print 与变量

运行方式（在 starter 目录下）：
  python 01_print_and_variables.py
若 python 不可用，可尝试：python3 或 py（Windows）
"""

# --- 新人请修改下面三个变量 ---
name = "在这里写你的名字"
age = 0
goal = "在这里写一句本关学习目标"

# --- 下面代码一般不用改 ---
print("---- print 输出 ----")
print("你好，", name)

greeting = "我今年 " + str(age) + " 岁（数字转成字符串才能拼接）。"
print(greeting)

# f-string：在字符串前加 f，用 {变量名} 插入值
line = f"我的目标：{goal}"
print(line)
