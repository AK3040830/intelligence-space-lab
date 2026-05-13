"""
第 04 关 · 练习 2：list 与 dict

运行：python 02_list_and_dict.py
"""

# --- 列表：一组按顺序排列的值（可改内容、增删项）---
skills = ["Python 基础", "终端 cd", "保存文件"]

# --- 字典：用「键」找「值」，像一张小卡片（可改值，键名先别改）---
task = {
    "title": "完成第 04 关练习",
    "status": "todo",
    "progress": 0.2,
    "message": "先运行一次，再改字段，再运行一次。",
}

print("---- 技能列表 skills ----")
for s in skills:
    print("-", s)

print("\n---- 任务卡片 task ----")
print("status  ：", task["status"])
print("progress：", task["progress"])
print("message ：", task["message"])
