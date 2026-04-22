with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

# I will find the marker I injected:
# /* 🔥 OFFER LANDING BLOCKS STYLES                */

css_start = text.find("/* 🔥 OFFER LANDING BLOCKS STYLES                */")
if css_start == -1: print("Not found"); exit(1)

# Find the end of the CSS:
css_end = text.find("};", css_start)

css_content = text[css_start:css_end]

# Now remove the block of bad injection
removed_text = text[:css_start] + "document.head.appendChild(style);\n" + text[css_end+3:]

# Now we find where the backtick ` closed BEFORE this:
# Because before `css_start`, there was `;\n` (which I replaced with `;`) or maybe there was `};`?
# In fact, I can just find `@keyframes bounce-subtle { ... }`

idx = removed_text.find("        `;")
if idx != -1:
    fixed_text = removed_text[:idx] + "\n        " + css_content + "\n        `;" + removed_text[idx+10:]
    with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
        f.write(fixed_text)
    print("Fixed!")
else:
    print("`; not found")

