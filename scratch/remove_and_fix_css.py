with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

css_start = text.find("/* 🔥 OFFER LANDING BLOCKS STYLES                */")
if css_start == -1: print("CSS not found"); exit(1)

# Find the next template string closure after CSS start
# Since I injected it before `\n        `;`, it ends exactly there
end_mark = "`;"
css_end = text.find(end_mark, css_start)

css_content = text[css_start:css_end]

# Remove it from JS
fixed_text = text[:css_start] + text[css_end:]

with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
    f.write(fixed_text)

# Append to view.html instead
with open("src/modules/stage-1-welcome/view.html", "r", encoding="utf-8") as f:
    html = f.read()

# Make sure not to duplicate
if "OFFER LANDING BLOCKS STYLES" not in html:
    new_html = html + f"\n<style>\n{css_content}\n</style>"
    with open("src/modules/stage-1-welcome/view.html", "w", encoding="utf-8") as f:
        f.write(new_html)

print("Moved CSS safely to view.html")
