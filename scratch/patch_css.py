import re

with open("src/modules/stage-3-result/view.html", "r", encoding="utf-8") as f:
    s3_content = f.read()

start_idx = s3_content.find("/* 🔥 OFFER LANDING BLOCKS STYLES                */")
if start_idx == -1: print("Cannot find CSS"); exit(1)

# Extract until the end of the script before </style> or next major block
end_idx = s3_content.find("</style>", start_idx)
css_to_add = s3_content[start_idx:end_idx]

# Read stage-1-welcome/index.js
with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    s1_content = f.read()

target = "document.head.appendChild(style);"
idx = s1_content.find(target)
if idx != -1:
    patched = s1_content[:idx] + "\n            " + css_to_add + "\n        };\n        " + target + s1_content[idx+len(target):]
    with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
        f.write(patched)
    print("CSS Added")
else:
    print("Target not found")
