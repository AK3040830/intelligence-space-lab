"""
第 04 关 · 练习 4：简单函数

运行：python 04_function.py
"""


def build_tip(name, task_name):
    """接收两个字符串，返回一句提示（本关保持简单即可）。"""
    return f"{name}，接下来建议你做：{task_name}"


# --- 请修改传入的参数 ---
student = "你的名字"
next_task = "运行 03_if_and_loop.py 并改 score"

print(build_tip(student, next_task))
